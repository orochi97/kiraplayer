import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeState } from '@/redux/store';
import { chooseSong } from '@/utils';
import { PLAY_STATE, SONG_INDEX } from '@/utils/const';
import connect from '@/redux/connect';
import Volume from './volume';
import ProcessBar from './processBar';

import './index.css';

// class Control extends Component {
//   constructor(props){ 
//     super(props)
//     this.state = {}
//   }
//   mousedown(e) {
//     e.target.classList.add('vc-control-active')
//   }
//   mouseup(e) {
//     e.target.classList.remove('vc-control-active')
//   }
//   action(e) {
//     const actionName = e.target.dataset.name
//     this[actionName] && this[actionName]()
//   }
//   play() {
//     let playState = this.props.playState
//     if (playState === 'pause' || playState === 'stop') {
//       playState = 'play'
//     } else {
//       playState = 'pause'
//     }
//     this.props.changeState(playState)
//   }
//   prev() {
//     chooseSong(this.props, null, -1)
//   }
//   next() {
//     chooseSong(this.props, null, +1)
//   }
//   stop() {
//     this.props.changeState('stop')
//   }
//   switch() {
//     console.log('switch')
//   }
//   render() {
//     return (
//       <div className="control"> 
//         <div id="control-btn">
//           <ProcessBar></ProcessBar>
//           <ul className="vc-controls" onClick={(e)=>this.action(e)} onMouseDown={(e)=>this.mousedown(e)} onMouseUp={(e)=>this.mouseup(e)}>
//             <li className={`vc-control-play ${this.props.playState==='play'?'vc-control-active':null}`} data-name="play">Play<span></span></li>
//             <li className="vc-control-prev" data-name="prev">Prev<span></span></li>
//             <li className="vc-control-next" data-name="next">Next<span></span></li>
//             <li className="vc-control-stop" data-name="stop">Stop<span></span></li>
//             <li className="vc-control-switch" data-name="switch">Switch<span></span></li>
//           </ul>
//         </div>
//         <Volume></Volume>
//       </div>
//     )
//   }
// }

function Control() {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const { playState } = state;

  const [actionMap] = useState({
    play(playState) {
      if ([PLAY_STATE.PAUSE, PLAY_STATE.STOP].includes(playState)) {
        playState = PLAY_STATE.PLAY;
      } else {
        playState = PLAY_STATE.PAUSE;
      }
      dispatch(changeState(playState));
    },
    prev() {
      chooseSong(null, SONG_INDEX.BACKWARD);
    },
    next() {
      chooseSong(null, SONG_INDEX.FORWARD);
    },
    stop() {
      dispatch(changeState(PLAY_STATE.STOP));
    },
    switch() {
      console.info('switch');
    },
  });
  const mousedownHandle = useCallback((e) => {
    e.target.classList.add('vc-control-active');
  }, []);

  const mouseupHandle = useCallback((e) => {
    e.target.classList.remove('vc-control-active');
  }, []);

  const clickHandle = useCallback((e) => {
    const actionName = e.target.dataset.name;
    actionMap[actionName] && actionMap[actionName](playState);
  }, [actionMap, playState]);

  return (
    <div className="control"> 
      <div id="control-btn">
        <ProcessBar></ProcessBar>
        <ul className="vc-controls" onClick={(e) => clickHandle(e)} onMouseDown={(e) => mousedownHandle} onMouseUp={(e) => mouseupHandle}>
          <li className={`vc-control-play ${playState==='play'?'vc-control-active':null}`} data-name="play">Play<span></span></li>
          <li className="vc-control-prev" data-name="prev">Prev<span></span></li>
          <li className="vc-control-next" data-name="next">Next<span></span></li>
          <li className="vc-control-stop" data-name="stop">Stop<span></span></li>
          <li className="vc-control-switch" data-name="switch">Switch<span></span></li>
        </ul>
      </div>
      <Volume></Volume>
    </div>
  );
}

export default connect(Control);

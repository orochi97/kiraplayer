import React from 'react';
import { useSelector } from 'react-redux';
import connect from '@/redux/connect';
import { PLAY_STATE } from '@/utils/const';

import './index.css';

// class Tape extends Component {
//   constructor(props){ 
//     super(props)
//     this.state = {}
//   }
//   //组件将要挂载时候触发的生命周期函数
//   componentWillMount(){
//     // console.log('02组件将要挂载')
//   }
//   //组件挂载完成时候触发的生命周期函数
//   componentDidMount() {
//     // console.log('04组件挂载')
//   }
//   componentDidUpdate(prevProps, prevState) {
//     // console.log(prevProps.playState)
//   }
//   getLeftWheelStyle() {
//     const leftLen = Math.ceil((this.props.currentDuration - this.props.currentTime) / 5)
//     return {boxShadow: (`0 0 0 ${leftLen}px #000`)}
//   }
//   getRightWheelStyle() {
//     const rightLen = Math.ceil((this.props.currentTime) / 5)
//     return {boxShadow: (`0 0 0 ${rightLen}px #000`)}
//   }
//   getWheelClass() {
//     return `${this.props.playState==='play'?"isplaying":null}`
//   }
//   render() {
//     return (
//       <div className="vc-tape-wrapper">
//         <div className="vc-tape">
//           <div className="vc-tape-back">
//             <div style={this.getLeftWheelStyle()} className={`vc-tape-wheel vc-tape-wheel-left ${this.getWheelClass()}`}><div></div></div>
//             <div style={this.getRightWheelStyle()} className={`vc-tape-wheel vc-tape-wheel-right ${this.getWheelClass()}`}><div></div></div>
//           </div>
//           <div className="vc-tape-front vc-tape-side-a">
//             <span>A</span>
//           </div>
//           <div className="vc-tape-front vc-tape-side-b">
//             <span>B</span>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }

function Tape() {
  const state = useSelector(state => state);
  const { playState, currentDuration, currentTime } = state;
  
  const wheelClass = `${playState === PLAY_STATE.PLAY ? 'isplaying' : ''}`;

  const leftLen = Math.ceil((currentDuration - currentTime) / 5);
  const leftWheelStyle = { boxShadow: (`0 0 0 ${leftLen}px #000`) };

  const rightLen = Math.ceil((currentTime) / 5);
  const rightWheelStyle = { boxShadow: (`0 0 0 ${rightLen}px #000`) };

  return (
    <div className="vc-tape-wrapper">
      <div className="vc-tape">
        <div className="vc-tape-back">
          <div style={leftWheelStyle} className={`vc-tape-wheel vc-tape-wheel-left ${wheelClass}`}><div></div></div>
          <div style={rightWheelStyle} className={`vc-tape-wheel vc-tape-wheel-right ${wheelClass}`}><div></div></div>
        </div>
        <div className="vc-tape-front vc-tape-side-a">
          <span>A</span>
        </div>
        <div className="vc-tape-front vc-tape-side-b">
          <span>B</span>
        </div>
      </div>
    </div>
  );
}

export default connect(Tape);

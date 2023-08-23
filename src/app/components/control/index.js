import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { storeChangeState, storeChangeCurrentSong } from '@/store';
import { PLAY_STATE, SONG_INDEX } from '@/utils/const';
import Volume from './volume';
import ProcessBar from './processBar';

import './index.css';

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
      dispatch(storeChangeState(playState));
    },
    prev() {
      dispatch(storeChangeCurrentSong(null, SONG_INDEX.BACKWARD));
    },
    next() {
      dispatch(storeChangeCurrentSong(null, SONG_INDEX.FORWARD));
    },
    stop() {
      dispatch(storeChangeState(PLAY_STATE.STOP));
    },
    switch() {
      console.info('switch');
    },
  });
  const mousedownHandle = useCallback((e) => {
    const $dom = e.target;
    $dom.classList.add('vc-control-active');
    const actionName = $dom.dataset.name;
    actionMap[actionName] && actionMap[actionName](playState);
  }, [actionMap, playState]);

  const mouseupHandle = useCallback((e) => {
    e.target.classList.remove('vc-control-active');
  }, []);

  return (
    <div className="control"> 
      <div id="control-btn">
        <ProcessBar></ProcessBar>
        <ul className="vc-controls" onMouseDown={(e) => mousedownHandle(e)} onMouseUp={(e) => mouseupHandle(e)}>
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

export default Control;

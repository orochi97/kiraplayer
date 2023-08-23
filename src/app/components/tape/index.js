import React from 'react';
import { useSelector } from 'react-redux';
import { PLAY_STATE } from '@/utils/const';

import './index.css';

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

export default Tape;

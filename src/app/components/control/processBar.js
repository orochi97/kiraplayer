import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { systemEventBus } from '@/utils/system';
import { formatTime, getPos } from '@/utils';

function ProcessBar() {
  const $processBar = useRef(null);
  const [processBarLen, setProcessBarLen] = useState(0);

  const state = useSelector(state => state);
  const { currentTime, currentDuration } = state;

  const currTime = Math.ceil(currentTime);
  const totalTime = Math.ceil(currentDuration);
  const timeNow = formatTime(currTime);
  const timeTotal = formatTime(totalTime);
  const barLen = processBarLen - Math.ceil(currTime * processBarLen / totalTime);

  const mousedownHandle = useCallback((e) => {
    // 在进度条触发了修改歌曲播放进度，发送至audio组件
    const newcurrentTime = Math.floor((e.pageX - getPos(e.currentTarget).left) * currentDuration / processBarLen);
    systemEventBus.emit('changeCurrentTime', newcurrentTime);
  }, [currentDuration, processBarLen]);

  useEffect(() => {
    setProcessBarLen($processBar.current.clientWidth);
  }, []);

  return (
    <div className="progress">
      <div className="progress-bar" ref={$processBar} onMouseDown={(e) => mousedownHandle(e)}>
        <div className="show-bar" style={{width:`${barLen}px`}}></div>
      </div>
      <div className="show-num">
        <span className="now">{timeNow}</span>
          /
        <span className="total">{timeTotal}</span>
      </div>
    </div>
  );
}

export default ProcessBar;

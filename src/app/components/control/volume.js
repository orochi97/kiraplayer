import React, { useRef, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeVolume } from '@/store';
import connect from '@/store/connect';
import knobInit from './knob';

function Volume() {
  const $knob = useRef(null);
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const { volume } = state;

  const getKnobDeg = useCallback((vol) => {
    return `rotate(${vol * 36}deg)`;
  }, []);

  const turnKnob = useCallback((vol) => {
    // 这个需要实时更新视图，不能等异步渲染
    $knob.current.style.transform = getKnobDeg(vol);
    dispatch(changeVolume(Number(vol)));
  }, [dispatch, getKnobDeg]);

  const volumeClick = useCallback((e) => {
    const vol = e.target.dataset.name;
    if (vol) {
      dispatch(changeVolume(Number(vol)));
    }
  }, [dispatch]);

  useEffect(() => {
    const li = document.getElementById('vol').getElementsByTagName('li');
    for (let i = 0; i < li.length; i++) {
      li[i].style.height = `${10 + i * 4}px`;
    }
  }, []);

  useEffect(() => {
    const initDeg = volume * 36;
    knobInit($knob.current, initDeg, turnKnob);
  }, [volume, turnKnob]);

  return (
    <div className="volume">
      <ul id="vol" className="vol" onClick={(e) => volumeClick(e)}>
        <li data-name="1" className={`${0>=volume?'disabled':''}`}></li>
        <li data-name="2" className={`${1>=volume?'disabled':''}`}></li>
        <li data-name="3" className={`${2>=volume?'disabled':''}`}></li>
        <li data-name="4" className={`${3>=volume?'disabled':''}`}></li>
        <li data-name="5" className={`${4>=volume?'disabled':''}`}></li>
        <li data-name="6" className={`${5>=volume?'disabled':''}`}></li>
        <li data-name="7" className={`${6>=volume?'disabled':''}`} style={{backgroundColor: "orange"}}></li>
        <li data-name="8" className={`${7>=volume?'disabled':''}`} style={{backgroundColor: "orange"}}></li>
        <li data-name="9" className={`${8>=volume?'disabled':''}`} style={{backgroundColor: "red"}}></li>
        <li data-name="10" className={`${9>=volume?'disabled':''}`} style={{backgroundColor: "red"}}></li>
      </ul>
      <div id="knob">   
        <div className="base"></div>
        <div ref={$knob} className="show" style={{transform: getKnobDeg(volume)}}></div>
      </div>
    </div>
  );
}

export default connect(Volume);

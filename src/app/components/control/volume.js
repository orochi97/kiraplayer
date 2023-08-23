import React, { useRef, useEffect, useCallback, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeVolume } from '@/redux/store';
import connect from '@/redux/connect';
import knobInit from './knob';

// class Volume extends Component {
//   constructor(props){ 
//     super(props)
//     this.state = {}
//   }
//   componentDidMount() { 
//     const li = document.getElementById('vol').getElementsByTagName('li')
//     for (let i = 0; i < li.length; i++) {
//       li[i].style.height = `${10 + i * 4}px`
//     }
//     const initDeg = this.props.volume * 36
//     knobInit(this.refs.knob, initDeg, this.turnKnob.bind(this))
//   }
//   turnKnob(vol) {
//     // 这个需要实时更新视图，不能等异步渲染
//     this.refs.knob.style.transform = this.getKnobDeg(vol)
//     this.props.changeVolume(Number(vol))
//   }
//   getKnobDeg (vol) {
//     return `rotate(${vol * 36}deg)`
//   }
//   volumeClick(e) {
//     const vol = e.target.dataset.name
//     if (vol) {
//       this.props.changeVolume(Number(vol))
//     }
//   }
//   render() {
//     const vol = this.props.volume
//     return (
//       <div className="volume">
//         <ul id="vol" className="vol" onClick={(e)=>this.volumeClick(e)}>
//           <li data-name="1" className={`${0>=vol?'disabled':''}`}></li>
//           <li data-name="2" className={`${1>=vol?'disabled':''}`}></li>
//           <li data-name="3" className={`${2>=vol?'disabled':''}`}></li>
//           <li data-name="4" className={`${3>=vol?'disabled':''}`}></li>
//           <li data-name="5" className={`${4>=vol?'disabled':''}`}></li>
//           <li data-name="6" className={`${5>=vol?'disabled':''}`}></li>
//           <li data-name="7" className={`${6>=vol?'disabled':''}`} style={{backgroundColor: "orange"}}></li>
//           <li data-name="8" className={`${7>=vol?'disabled':''}`} style={{backgroundColor: "orange"}}></li>
//           <li data-name="9" className={`${8>=vol?'disabled':''}`} style={{backgroundColor: "red"}}></li>
//           <li data-name="10" className={`${9>=vol?'disabled':''}`} style={{backgroundColor: "red"}}></li>
//         </ul>
//         <div id="knob">   
//           <div className="base"></div>
//           <div ref="knob" className="show" style={{transform: this.getKnobDeg(vol)}}></div>
//         </div>
//       </div>
//     )
//   }
// }

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

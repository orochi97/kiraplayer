import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { getMusicCover } from '@/utils/system';
import connect from '@/redux/connect';
import { formatTime } from '@/utils';
import { PLAY_STATE } from '@/utils/const';
import Led from './led';

import './index.css';

const coverMap = new Map();

async function getCover(file) {
  if (coverMap.has(file)) {
    return coverMap.get(file);
  }
  const cover = await getMusicCover(file);
  coverMap.set(file, cover);
  return cover;
}

function genDisplayNum(currentTime) {
  const timeStr = formatTime(Math.ceil(currentTime));
  const second1 = Number(timeStr.charAt(4));
  const second2 = Number(timeStr.charAt(3));
  const minute1 = Number(timeStr.charAt(1));
  const minute2 = Number(timeStr.charAt(0));
  return { second1, second2, minute1, minute2 };
}

// class Info extends Component {
//   constructor(props) {
//     super(props)
//     this.toggle = true
//     this._currentSong = -1
//     this.animationRule = 0
//     this.state = {
//       cover: '',
//       title: '暂无歌曲'
//     }
//     this.setCoverAndTitle()
//   }
//   componentWillUpdate(nextProps) {
//     this._currentSong = nextProps.currentSong
//   }
//   componentDidUpdate(prevProps) {
//     if (this._currentSong !== prevProps.currentSong || prevProps.playState === 'init') {
//       this.setCoverAndTitle()
//     }
//     const $title = this.refs.title
//     const barWidth = this.refs.titleBar.offsetWidth
//     const titleWidth = $title.offsetWidth
//     if (titleWidth > barWidth) {
//       document.styleSheets.item(0).deleteRule(this.animationRule)
//       let animation = `@-webkit-keyframes moving {100% {transform: translateX(${barWidth - titleWidth}px)}}`
//       this.animationRule = document.styleSheets.item(0).insertRule(animation, 0)
//       $title.style.animationName = 'moving'
//     } else {
//       $title.style.animationName = 'none'
//     }
//   }
//   componentDidMount() { 
    
//   }
//   async setCoverAndTitle() {
//     const { musicList, currentSong } = this.props
//     if (musicList.length) {
//       const music = musicList[currentSong]
//       const cover = await getCover(music.src)
//       this.setState({ cover: cover, title: music.title })
//     }
//   }
//   render() {
//     const timeStr = formatTime(Math.ceil(this.props.currentTime))
//     const second1 = Number(timeStr.charAt(4))
//     const second2 = Number(timeStr.charAt(3))
//     const minute1 = Number(timeStr.charAt(1))
//     const minute2 = Number(timeStr.charAt(0))
//     this.toggle = !this.toggle
//     return (
//       <div className="show-info">
//         <div className="cover"><img src={this.state.cover} alt=""/></div>
//         <div className="show-title" ref="titleBar"><span ref="title" style={{left:0}}>{this.state.title}</span></div>
//         <div className="led-num">
//           <Led num={minute2}></Led>
//           <Led num={minute1}></Led>
//           <div className="led dot">
//             <i className={`${this.toggle?'enable':null}`}></i>
//             <i className={`${this.toggle?'enable':null}`}></i>
//           </div>
//           <Led num={second2}></Led>
//           <Led num={second1}></Led>
//          </div>   
//       </div>
//     )
//   }
// }

// 冒号点的闪烁变量用额外变量处理，否则用 useState 会引起快速反复渲染
const defaultMusicInfo = { cover: '', title: '暂无歌曲' };
let dot = true;

function Info() {
  const $title = useRef(null);
  const $titleBar = useRef(null);

  const [_currentSong, setCurrentSong] = useState(-1); // 用一个本地的当前歌曲变量与系统的当前歌曲作对比来确定是否更新信息
  const [animationRule, setAnimationRule] = useState(0);
  const [titleAnimationName, setAnimationName] = useState('none');
  const [musicInfo, setMusicInfo] = useState(defaultMusicInfo);

  const state = useSelector(state => state);
  const { musicList, currentSong, currentTime, playState } = state;
  const { second1, second2, minute1, minute2 } = genDisplayNum(currentTime);

  const setCoverAndTitle = useCallback(async () => {
    if (musicList.length) {
      const music = musicList[currentSong];
      const cover = await getCover(music.src);
      return setMusicInfo({ cover: cover, title: music.title });
    }
    setMusicInfo(defaultMusicInfo);
  }, [musicList, currentSong]);

  useEffect(() => {
    if (_currentSong !== currentSong || playState === PLAY_STATE.INIT) {
      setCoverAndTitle();
    }
    const barWidth = $titleBar.current.offsetWidth;
    const titleWidth = $title.current.offsetWidth;
    if (titleWidth > barWidth) {
      document.styleSheets.item(0).deleteRule(animationRule);
      let animation = `@-webkit-keyframes moving {100% {transform: translateX(${barWidth - titleWidth}px)}}`;
      setAnimationRule(document.styleSheets.item(0).insertRule(animation, 0));
      setAnimationName('moving');
    } else {
      setAnimationName('none');
    }
    setCurrentSong(currentSong);
  }, [_currentSong, animationRule, currentSong, playState, setCoverAndTitle]);

  useEffect(() => {
    dot = !dot;
  });

  return (
    <div className="show-info">
      <div className="cover"><img src={musicInfo.cover} alt=""/></div>
      <div className="show-title" ref={$titleBar}><span ref={$title} style={{ left: 0, animationName: titleAnimationName }}>{musicInfo.title}</span></div>
      <div className="led-num">
        <Led num={minute2}></Led>
        <Led num={minute1}></Led>
        <div className="led dot">
          <i className={`${dot?'enable':null}`}></i>
          <i className={`${dot?'enable':null}`}></i>
        </div>
        <Led num={second2}></Led>
        <Led num={second1}></Led>
       </div>   
    </div>
  );
}

export default connect(Info);

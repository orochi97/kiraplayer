import React, { Component } from 'react'
import { getMusicCover } from '@/utils/system'
import Led from './led'
import connect from '../../redux/connect'
import { formatTime } from '../../utils'

import './index.css'

const coverMap = new Map();

async function getCover(file) {
  if (coverMap.has(file)) {
    return coverMap.get(file);
  }
  const cover = await getMusicCover(file);
  coverMap.set(file, cover);
  return cover;
}

class Info extends Component {
  constructor(props) {
    super(props)
    this.toggle = true
    this._currentSong = -1
    this._animationRule = 0
    this.state = {
      cover: '',
      title: '暂无歌曲'
    }
    this.setCoverAndTitle()
  }
  componentWillUpdate(nextProps) {
    this._currentSong = nextProps.currentSong
  }
  componentDidUpdate(prevProps) {
    if (this._currentSong !== prevProps.currentSong || prevProps.playState === 'init') {
      this.setCoverAndTitle()
    }
    const $title = this.refs.title
    const barWidth = this.refs.titleBar.offsetWidth
    const titleWidth = $title.offsetWidth
    if (titleWidth > barWidth) {
      document.styleSheets.item(0).deleteRule(this._animationRule)
      let animation = `@-webkit-keyframes moving {100% {transform: translateX(${barWidth - titleWidth}px)}}`
      this._animationRule = document.styleSheets.item(0).insertRule(animation, 0)
      $title.style.animationName = 'moving'
    } else {
      $title.style.animationName = 'none'
    }
  }
  componentDidMount() { 
    
  }
  async setCoverAndTitle() {
    const { musicList, currentSong } = this.props
    if (musicList.length) {
      const music = musicList[currentSong]
      const cover = await getCover(music.src)
      this.setState({ cover: cover, title: music.title })
    }
  }
  render() {
    const timeStr = formatTime(Math.ceil(this.props.currentTime))
    const second1 = Number(timeStr.charAt(4))
    const second2 = Number(timeStr.charAt(3))
    const minute1 = Number(timeStr.charAt(1))
    const minute2 = Number(timeStr.charAt(0))
    this.toggle = !this.toggle
    return (
      <div className="show-info">
        <div className="cover"><img src={this.state.cover} alt=""/></div>
        <div className="show-title" ref="titleBar"><span ref="title" style={{left:0}}>{this.state.title}</span></div>
        <div className="led-num">
          <Led num={minute2}></Led>
          <Led num={minute1}></Led>
          <div className="led dot">
            <i className={`${this.toggle?'enable':null}`}></i>
            <i className={`${this.toggle?'enable':null}`}></i>
          </div>
          <Led num={second2}></Led>
          <Led num={second1}></Led>
         </div>   
      </div>
    )
  }
}

export default connect(Info)

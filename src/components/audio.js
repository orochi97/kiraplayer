import React, { Component } from 'react'
import connect from '../redux/connect'
import EventBus from '../utils/event-bus'
import { chooseSong } from '../utils'

class Audio extends Component {
  constructor(props){
    super(props)
    this.timer = null
    this.currentSong = -1
    this._playState = ''
  }
  componentWillUpdate(nextProps) {
    this._playState = nextProps.playState
  }
  componentDidUpdate(prevProps) {
    if (this._playState === 'init') {
      this.currentSong = -1
    }
    if (this._playState !== prevProps.playState) {
      this.playStateChanged(this._playState)
    }
    this.setVolume()
  }
  componentDidMount() {
    this.setVolume()
    EventBus.on('changeCurrentTime', (newcurrentTime) => {
      this.refs.audio.currentTime = newcurrentTime
      this.props.changeCurrentTime(newcurrentTime)
      this.props.changeState('play')
    })
  }
  playStateChanged(playState) {
    const audio = this.refs.audio
    switch(playState) {
      case 'play': {
        audio.play()
        this.setTimer()
        break
      }
      case 'pause': {
        audio.pause()
        clearInterval(this.timer)
        break
      }
      case 'stop': {
        audio.currentTime = 0
        audio.pause()
        clearInterval(this.timer)
        this.props.changeCurrentTime(0)
        break
      }
      default: break
    }
  }
  setTimer() {
    clearInterval(this.timer)
    const audio = this.refs.audio
    this.timer = setInterval(() => {
      if (audio.currentTime >= audio.duration) {
        chooseSong(this.props, null, +1)
        return
      }
      this.props.changeCurrentTime(audio.currentTime)
    }, 1000)
  }
  canplay() {
    const { currentSong, changeCurrentDuration, changeState } = this.props
    if (this.currentSong !== currentSong) {
      this.currentSong = currentSong
      changeCurrentDuration(this.refs.audio.duration)
      changeState('play')
    } 
  }
  setVolume() {
    this.refs.audio.volume = this.props.volume / 10
  }
  render() {
    const { musicList, currentSong } = this.props
    const music = musicList.length ? musicList[currentSong] : ''

    return (
      <audio src={music.src} ref="audio" onCanPlay={()=>this.canplay()} id="audio"></audio>
    ) 
  }
}

export default connect(Audio)

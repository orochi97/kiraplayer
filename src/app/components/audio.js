import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { systemEventBus } from '@/utils/system';
import { changeCurrentTime, changeCurrentDuration, changeState } from '@/redux/store';
import connect from '@/redux/connect';
import { chooseSong, formatSongSrc } from '@/utils';
import { PLAY_STATE, SONG_INDEX } from '@/utils/const';

// class Audio extends Component {
//   constructor(props){
//     super(props)
//     this.timer = null
//     this.currentSong = -1
//     this._playState = ''
//   }
//   componentWillUpdate(nextProps) {
//     this._playState = nextProps.playState
//   }
//   componentDidUpdate(prevProps) {
//     if (this._playState === 'init') {
//       this.currentSong = -1
//     }
//     if (this._playState !== prevProps.playState) {
//       this.playStateChanged(this._playState)
//     }
//     this.setVolume()
//   }
//   componentDidMount() {
//     this.setVolume()
//     systemEventBus.on('changeCurrentTime', (newcurrentTime) => {
//       this.refs.audio.currentTime = newcurrentTime
//       this.props.changeCurrentTime(newcurrentTime)
//       this.props.changeState('play')
//     })
//   }
//   playStateChanged(playState) {
//     const audio = this.refs.audio
//     switch(playState) {
//       case 'play': {
//         audio.play()
//         this.setTimer()
//         break
//       }
//       case 'pause': {
//         audio.pause()
//         clearInterval(this.timer)
//         break
//       }
//       case 'stop': {
//         audio.currentTime = 0
//         audio.pause()
//         clearInterval(this.timer)
//         this.props.changeCurrentTime(0)
//         break
//       }
//       default: break
//     }
//   }
//   setTimer() {
//     clearInterval(this.timer)
//     const audio = this.refs.audio
//     this.timer = setInterval(() => {
//       if (audio.currentTime >= audio.duration) {
//         chooseSong(this.props, null, +1)
//         return
//       }
//       this.props.changeCurrentTime(audio.currentTime)
//     }, 1000)
//   }
//   canplay() {
//     const { currentSong, changeCurrentDuration, changeState } = this.props
//     if (this.currentSong !== currentSong) {
//       this.currentSong = currentSong
//       changeCurrentDuration(this.refs.audio.duration)
//       changeState('play')
//     } 
//   }
//   setVolume() {
//     this.refs.audio.volume = this.props.volume / 10
//   }
//   render() {
//     const { musicList, currentSong } = this.props
//     const music = musicList.length ? musicList[currentSong] : ''

//     return (
//       <audio src={formatSongSrc(music.src)} ref="audio" onCanPlay={()=>this.canplay()} id="audio"></audio>
//     ) 
//   }
// }

function Audio() {
  const audioRef = useRef(null);
  const $audio = useRef(null);

  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const { musicList, currentSong, volume, playState } = state;

  const music = musicList.length ? musicList[currentSong] : '';
  const [_currentSong, setCurrentSong] = useState(-1);
  const [_playState, setPlayState] = useState('');

  const canplay = useCallback(() => {
    if (_currentSong !== currentSong) {
      setCurrentSong(currentSong);
      // changeCurrentDuration($audio.current.duration)
      dispatch(changeCurrentDuration($audio.current.duration));
      // changeState('play')
      dispatch(changeState(PLAY_STATE.PLAY));
    } 
  }, [dispatch, _currentSong, currentSong, $audio]);

  const setVolume = useCallback(() => {
    $audio.current.volume = volume / 10;
  }, [$audio, volume]);

  const setTimer = useCallback(() => {
    clearInterval(audioRef.current);
    audioRef.current = setInterval(() => {
      if ($audio.current.currentTime >= $audio.current.duration) {
        chooseSong(null, SONG_INDEX.FORWARD);
        return
      }
      // changeCurrentTime($audio.current.currentTime);
      dispatch(changeCurrentTime($audio.current.currentTime));
    }, 1000);
  }, [dispatch]);

  const playStateChanged = useCallback((playState) => {
    switch(playState) {
      case PLAY_STATE.PLAY: {
        $audio.current.play()
        setTimer()
        break
      }
      case PLAY_STATE.PAUSE: {
        $audio.current.pause()
        clearInterval(audioRef.current)
        break
      }
      case PLAY_STATE.STOP: {
        $audio.current.currentTime = 0
        $audio.current.pause()
        clearInterval(audioRef.current)
        // changeCurrentTime(0)
        dispatch(changeCurrentTime(0));
        break
      }
      default: break
    }
  }, [dispatch, $audio, setTimer]);

  useEffect(() => {
    if (_playState === PLAY_STATE.INIT) {
      setCurrentSong(-1);
    }
    if (_playState !== playState) {
      playStateChanged(playState);
    }
    setVolume();
    setPlayState(playState);
  }, [_playState, playState, playStateChanged, setVolume]);

  useEffect(() => {
    setVolume();
    systemEventBus.on('changeCurrentTime', (newcurrentTime) => {
      $audio.current.currentTime = newcurrentTime;
      // changeCurrentTime(newcurrentTime);
      dispatch(changeCurrentTime(newcurrentTime));
      // changeState('play');
      dispatch(changeState(PLAY_STATE.PLAY));
    });
  }, [dispatch, setVolume]);

  return (
    <audio src={formatSongSrc(music.src)} ref={$audio} onCanPlay={canplay}></audio>
  ) 
}

export default connect(Audio)

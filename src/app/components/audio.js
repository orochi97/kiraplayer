import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { systemEventBus } from '@/utils/system';
import { storeChangeCurrentTime, storeChangeCurrentDuration, storeChangeState, storeChangeCurrentSong } from '@/store';
import { formatSongSrc } from '@/utils';
import { PLAY_STATE, SONG_INDEX } from '@/utils/const';

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
      dispatch(storeChangeCurrentDuration($audio.current.duration));
      dispatch(storeChangeState(PLAY_STATE.PLAY));
    } 
  }, [dispatch, _currentSong, currentSong, $audio]);

  const setVolume = useCallback(() => {
    $audio.current.volume = volume / 10;
  }, [$audio, volume]);

  const setTimer = useCallback(() => {
    clearInterval(audioRef.current);
    audioRef.current = setInterval(() => {
      if ($audio.current.currentTime >= $audio.current.duration) {
        dispatch(storeChangeCurrentSong(null, SONG_INDEX.FORWARD));
        return;
      }
      dispatch(storeChangeCurrentTime($audio.current.currentTime));
    }, 1000);
  }, [dispatch]);

  const playStateChanged = useCallback((playState) => {
    switch(playState) {
      case PLAY_STATE.PLAY: {
        $audio.current.play();
        setTimer();
        break;
      }
      case PLAY_STATE.PAUSE: {
        $audio.current.pause();
        clearInterval(audioRef.current);
        break;
      }
      case PLAY_STATE.STOP: {
        $audio.current.currentTime = 0;
        $audio.current.pause();
        clearInterval(audioRef.current);
        dispatch(storeChangeCurrentTime(0));
        break;
      }
      default: break;
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
      dispatch(storeChangeCurrentTime(newcurrentTime));
      dispatch(storeChangeState(PLAY_STATE.PLAY));
    });
  }, [dispatch, setVolume]);

  return (
    <audio src={formatSongSrc(music.src)} ref={$audio} onCanPlay={canplay}></audio>
  ) 
}

export default Audio;

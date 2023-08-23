import { systemEventBus, getSystemInfo } from '@/utils/system';
import {
	CHANGE_STATE,
	CHANGE_VOLUME,
	CHANGE_MUSIC_LIST,
	CHANGE_CURRENT_TIME,
	CHANGE_CURRENT_SONG,
	CHANGE_CURRENT_DURATION,
} from './type';
import { PLAY_STATE } from '@/utils/const'; 

const systemInfo = getSystemInfo();
const initValue = Object.assign({
	playState: 'stop',
	currentTime: 0,
  currentDuration: 0,
}, systemInfo);

// Reducer
function reducer(state = initValue, action) {
  switch (action.type) {
    case CHANGE_MUSIC_LIST:
      return Object.assign({}, state, {
        musicList: action.musicList,
        sort: action.sort,
        playState: PLAY_STATE.INIT,
        currentSong: 0,
        currentTime: 0,
        currentDuration: 0,
      });
    case CHANGE_STATE:
      return Object.assign({}, state, { playState: action.playState });
    case CHANGE_VOLUME:
      systemEventBus.emit('updateConfig', { volume: action.volume });
      return Object.assign({}, state, { volume: action.volume });
    case CHANGE_CURRENT_TIME:
      return Object.assign({}, state, { currentTime: action.currentTime });
    case CHANGE_CURRENT_SONG:
      let { songIndex, next } = action;
      const { currentSong, sort } = state;
      const len = sort.length - 1;
      if (songIndex === null) {
        const currIndex = sort.findIndex((item)=>{return item === currentSong});
        let nextIndex = currIndex + next;
        if (nextIndex < 0) {
          nextIndex = len;
        } else if (nextIndex > len) {
          nextIndex = 0;
        }
        songIndex = sort[nextIndex];
      }
      systemEventBus.emit('updateConfig', { currentSong: songIndex });
      return Object.assign({}, state, { currentSong: songIndex, playState: PLAY_STATE.STOP });
    case CHANGE_CURRENT_DURATION:
      return Object.assign({}, state, { currentDuration: action.currentDuration });
    default:
      return state;
  }
}

export default reducer;
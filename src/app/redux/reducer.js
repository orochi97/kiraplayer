import EventBus from '../utils/event-bus'

const systemInfo = window.getSystemInfo()
const initValue = Object.assign({
	playState: 'stop',
	currentTime: 0,
  currentDuration: 0
}, systemInfo)

// Reducer
function reducer(state = initValue, action) {
  switch (action.type) {
    case 'choose':
      return Object.assign({}, state, { currentSong: action.index })
    case 'updateMusicList':
      return Object.assign({}, state, {
        musicList: action.musicList,
        sort: action.sort,
        playState: 'init',
        currentSong: 0,
        currentTime: 0,
        currentDuration: 0
      })
    case 'changeState':
      return Object.assign({}, state, { playState: action.playState })
    case 'changeVolume':
      EventBus.emit('updateConfig', { volume: action.volume })
      return Object.assign({}, state, { volume: action.volume })
    case 'changeCurrentTime':
      return Object.assign({}, state, { currentTime: action.currentTime })
    case 'changeCurrentSong':
      EventBus.emit('updateConfig', { currentSong: action.currentSong })
      return Object.assign({}, state, { currentSong: action.currentSong })
    case 'changeCurrentDuration':
      return Object.assign({}, state, { currentDuration: action.currentDuration })
    default:
      return state
  }
}

export default reducer
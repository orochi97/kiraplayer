const systemInfo = window.getSystemInfo()
const initValue = Object.assign({
	playState: 'stop'
}, systemInfo)

// Reducer
function reducer(state = initValue, action) {
  switch (action.type) {
    case 'choose':
      return Object.assign({}, state, { currentSong: action.index })
    case 'updateMusicList':
      return Object.assign({}, state, { musicList: action.musicList })
    default:
      return state
  }
}

export default reducer
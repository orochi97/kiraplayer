const { musicList, currentSong } = window.getSystemInfo()

const initValue = {
	musicList,
	currentSong,
	playState: 'stop'
}

// Reducer
function reducer(state = initValue, action) {
  switch (action.type) {
    case 'choose':
      return Object.assign({}, state, { currentSong: action.index })
    default:
      return state
  }
}

export default reducer
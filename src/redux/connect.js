import { connect } from 'react-redux'
import {
	choose,
	changeState,
  changeVolume,
	changeCurrentTime,
	changeCurrentSong,
	changeCurrentDuration
} from './action'

// Map Redux state to component props
function mapStateToProps(state) {
  return state
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    choose: (index) => dispatch(choose(index)),
    changeState: (playState) => dispatch(changeState(playState)),
    changeVolume: (volume) => dispatch(changeVolume(volume)),
    changeCurrentTime: (currentTime) => dispatch(changeCurrentTime(currentTime)),
    changeCurrentSong: (currentSong) => dispatch(changeCurrentSong(currentSong)),
    changeCurrentDuration: (currentDuration) => dispatch(changeCurrentDuration(currentDuration))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)
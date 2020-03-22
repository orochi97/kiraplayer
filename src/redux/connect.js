import { connect } from 'react-redux'
import { choose } from './action'

// Map Redux state to component props
function mapStateToProps(state) {
  return state
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    choose: (index) => dispatch(choose(index))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)
import { createStore } from 'redux'
import reducer from './reducer'
import EventBus from '../utils/event-bus'
import { updateMusicList } from './action'
// Store
const store = createStore(reducer)

EventBus.on('updateMusicList', (config) => {
	store.dispatch(updateMusicList(config))
})

export default store
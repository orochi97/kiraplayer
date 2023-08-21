import { createStore } from 'redux'
import { systemEventBus } from '@/utils/system'
import reducer from './reducer'
import { updateMusicList } from './action'

// Store
const store = createStore(reducer)

// systemEventBus.on('updateMusicList', (config) => {
// 	store.dispatch(updateMusicList(config))
// })

export default store
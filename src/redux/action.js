import EventBus from '../utils/event-bus'

// Action
export const choose = (index) => {
	return {
		type: 'choose',
		index
	}
}

export const updateMusicList = (config) => {
	return {
		type: 'updateMusicList',
		musicList: config.musicList
	}
}

// EventBus.on('musicList', (data) => {
// 	console.log(111)
// 	setMusicList(data)
// })
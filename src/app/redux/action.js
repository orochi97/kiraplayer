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
		musicList: config.musicList,
		sort: config.sort
	}
}

export const changeState = (playState) => {
	return {
		type: 'changeState',
		playState
	}
}

export const changeCurrentTime = (currentTime) => {
	return {
		type: 'changeCurrentTime',
		currentTime
	}
}

export const changeCurrentSong = (currentSong) => {
	return {
		type: 'changeCurrentSong',
		currentSong
	}
}

export const changeCurrentDuration = (currentDuration) => {
	return {
		type: 'changeCurrentDuration',
		currentDuration
	}
}

export const changeVolume = (volume) => {
	return {
		type: 'changeVolume',
		volume
	}
}

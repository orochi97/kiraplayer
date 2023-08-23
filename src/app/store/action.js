// Action
import {
	CHANGE_STATE,
	CHANGE_VOLUME,
	CHANGE_MUSIC_LIST,
	CHANGE_CURRENT_TIME,
	CHANGE_CURRENT_SONG,
	CHANGE_CURRENT_DURATION,
} from './type';

export const storeChangeMusicList = (config) => {
	return {
		type: CHANGE_MUSIC_LIST,
		musicList: config.musicList,
		sort: config.sort,
	}
};

export const storeChangeState = (playState) => {
	return {
		type: CHANGE_STATE,
		playState,
	}
};

export const storeChangeCurrentTime = (currentTime) => {
	return {
		type: CHANGE_CURRENT_TIME,
		currentTime,
	}
};

export const storeChangeCurrentSong = (songIndex, next) => {
	return {
		type: CHANGE_CURRENT_SONG,
		songIndex,
		next,
	}
};

export const storeChangeCurrentDuration = (currentDuration) => {
	return {
		type: CHANGE_CURRENT_DURATION,
		currentDuration,
	}
};

export const storeChangeVolume = (volume) => {
	return {
		type: CHANGE_VOLUME,
		volume,
	}
};

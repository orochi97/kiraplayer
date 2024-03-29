export const isDev = NODE_ENV === 'development';

export function formatSongSrc(src) {
	if (!src) return '';
	if (isDev) {
		return DEV_SONG_PREFIX + src;
	}
	return src;
}

export function formatTime(time) {
	if (!time) {
		return '00:00';
	}
	const num = Math.floor(time);
	const iMinute = Math.floor(num / 60) + '';
	const iSecond = num - 60 * iMinute + '';
	return iMinute.padStart(2, 0) + ':' + iSecond.padStart(2, 0);
}

export function getPos(obj) {
	const pos = { left: 0, top: 0 }	;
	while (obj) { //从目标元素开始一级级往上找直达到document
		pos.left += obj.offsetLeft;
		pos.top += obj.offsetTop;
		obj = obj.offsetParent;
	}
	return pos;
}

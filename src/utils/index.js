export function formatTime(time) {
	if (!time) {
		return '00:00';
	}
	const num = Math.floor(time);
	const iMinute = Math.floor(num / 60) + ''
	const iSecond = num - 60 * iMinute + ''
	return iMinute.padStart(2, 0) + ':' + iSecond.padStart(2, 0)
}

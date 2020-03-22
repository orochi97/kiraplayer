// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
// console.log('electron', require('fs'))
const fs = require('fs')
const path = require('path')

const musicList = [
    {
        title: '苦瓜-陈奕迅',
        src: 'file:///E:/music/苦瓜-陈奕迅.mp3'
    },
    {
        title: '千千阙歌',
        src: 'file:///E:/music/千千阙歌.mp3'
    },
    {
        title: '林忆莲-听说爱情回来过',
        src: 'file:///E:/music/林忆莲-听说爱情回来过.mp3'
    },
    {
        title: '牡丹江',
        src: 'file:///E:/music/牡丹江.mp3'
    },
    {
        title: '农民',
        src: 'file:///E:/music/农民.mp3'
    }
]

let currentSong = 3

window.getSystemInfo = function() {
	return {
		musicList,
		currentSong
	}
}
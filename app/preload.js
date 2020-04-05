// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const fs = require('fs')
const path = require('path')
const glob = require('glob')
const EventBus = require('./event-bus.js')
const { setConfig, getConfig, getMusicList } = require('./file.js')

const config = getConfig()

async function importMusic(dir) {
	const musicList = await getMusicList(dir)
	config.musicList = musicList
	EventBus.emit('updateMusicList', config)
	setConfig(config)
}

EventBus.on('chooseDir', (dir) => {
	importMusic(dir)
})

window.EventBus = EventBus
window.require = require
window.getSystemInfo = function () {
	return config
}

// const ipcMain = require('electron').remote.ipcMain;
// ipcMain.on('asynchronous-message', function(event, arg) {
//   console.log(arg); // prints "ping"
//   event.sender.send('asynchronous-reply', 'pong');
// });
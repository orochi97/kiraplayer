// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const fs = require('fs')
const path = require('path')
const glob = require('glob')
const EventBus = require('./event-bus.js')
const { setConfig, getConfig, getMusicList } = require('./file.js')

const config = getConfig()

async function importMusic(dir) {
	const { musicList, sort } = await getMusicList(dir)
	config.musicList = musicList
	config.sort = sort
	EventBus.emit('updateMusicList', config)
	setConfig(config)
}

window.EventBus = EventBus
window.require = require
window.getSystemInfo = function () {
	return config
}

EventBus.on('chooseDir', (dir) => {
	importMusic(dir)
})

// const ipcMain = require('electron').remote.ipcMain;
// ipcMain.on('asynchronous-message', function(event, arg) {
//   console.log(arg); // prints "ping"
//   event.sender.send('asynchronous-reply', 'pong');
// });
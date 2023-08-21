// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
// const fs = require('fs');
// const path = require('path');
// const glob = require('glob');
const { contextBridge } = require('electron');
const { dialog } = require('@electron/remote')
const musicMetadata = require('music-metadata');

const systemEventBus = require('./event-bus.js');
const { setConfig, getConfig, getMusicList } = require('./file.js');

const config = getConfig();

const getSystemInfo = () => {
  return config;
}

async function importMusic(dir) {
  const { musicList, sort } = await getMusicList(dir);
  config.musicList = musicList;
  config.sort = sort;
  config.currentSong = 0;
  systemEventBus.emit('updateMusicList', config);
  setConfig(config);
}

systemEventBus.on('chooseDir', (dir) => {
  importMusic(dir);
});

systemEventBus.on('updateConfig', (conf) => {
  Object.assign(config, conf)
  setConfig(config);
});

// const ipcMain = require('electron').remote.ipcMain;
// ipcMain.on('asynchronous-message', function(event, arg) {
//   console.log(arg); // prints "ping"
//   event.sender.send('asynchronous-reply', 'pong');
// });

contextBridge.exposeInMainWorld(
  'electron',
  {
    fileDialog: dialog,
    musicMetadata,
    getSystemInfo,
    systemEventBus,
  }
)

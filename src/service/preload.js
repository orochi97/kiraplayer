// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { contextBridge } = require('electron');
const { dialog } = require('@electron/remote');

const systemEventBus = require('./event-bus.js');
const { setConfig, getConfig, getMusicList, getMusicCover } = require('./file.js');

const config = getConfig();

const getSystemInfo = () => {
  return config;
}

async function importMusic(dir) {
  const { musicList, sort } = await getMusicList(dir);
  config.musicList = musicList;
  config.sort = sort;
  config.currentSong = 0;
  systemEventBus.emit('storeChangeMusicList', config);
  setConfig(config);
}

// 选择文件夹，解析文件夹里的音乐
systemEventBus.on('chooseDir', (dir) => {
  importMusic(dir);
});

// 更新配置信息，存储在本地
systemEventBus.on('updateConfig', (conf) => {
  Object.assign(config, conf)
  setConfig(config);
});

contextBridge.exposeInMainWorld(
  'electron',
  {
    fileDialog: dialog,
    getSystemInfo,
    systemEventBus,
    getMusicCover,
  }
)

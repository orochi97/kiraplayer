const fs = require('fs');
const path = require('path');
const os = require('os');
const glob = require('glob');
const fse = require('fs-extra');
const mm = require('music-metadata');
const defaultConf = require('./default.js');

const configJson = getConfigJsonPath();

function getConfigJsonPath() {
  if (['win32'].includes(process.platform)) {
    return path.join(process.cwd(), 'config.json');
  }
  return path.join(os.homedir(), 'config.json');
};

function getMusicFile(dir) {
  let files = glob.sync('*.mp3', {
    cwd: dir,
  });
  files = files.sort((a, b) => {
    return b.localeCompare(a);
  }).map((f) => {
    return {
      file: f,
      src: path.join(dir, f),
    };
  });
  return files;
}

async function parseMusic(music) {
  const metaData = await mm.parseFile(music.src, { native: true });
  music.duration = Math.ceil(metaData.format.duration);
  const { title, album, artist } = metaData.common;
  Object.assign(music, { title, album, artist });
}

async function getMusicList(dir) {
  const musicList = getMusicFile(dir);
  const sort = [];
  for (let i = 0, l = musicList.length; i < l; i++) {
    const music = musicList[i];
    try {
      await parseMusic(music);
      sort.push(i)
    } catch (e) {
      console.error(`歌曲 ${music.src} 解析错误`, e);
    }
  }
  return { musicList, sort };
}

async function getMusicCover(file) {
  try {
    const {common} = await mm.parseFile(file);
    const cover = mm.selectCover(common.picture); // pick the cover image
    return`data:${cover.format};base64,${cover.data.toString('base64')}`;
  } catch (error) {
    console.error('get music cover fail: ', error.message);
    return '';
  }
}

function getConfig() {
  let config = Object.assign({}, defaultConf);
  if (fs.existsSync(configJson)) {
    config = fse.readJsonSync(configJson);
  }
  return config;
}

function setConfig(config) {
  fse.writeJsonSync(configJson, config);
}

module.exports = {
  getConfig,
  setConfig,
  getMusicList,
  getMusicCover,
}
const fs = require('fs')
const path = require('path')
const glob = require('glob')
const fse = require('fs-extra')
const mm = require('music-metadata')
const defaultConf = require('./default.js')

const configJson = path.join(process.cwd(), 'config.json')

function getMusicFile(dir) {
  let files = glob.sync('*.mp3', {
    cwd: dir
  })
  files = files.sort((a, b) => {
    return b.localeCompare(a)
  }).map((f) => {
    return {
      file: f,
      src: path.join(dir, f)
    }
  })
  return files
}

async function parseMusic(music) {
  const metaData = await mm.parseFile(music.src, { native: true })
  music.duration = Math.ceil(metaData.format.duration)
  const { title, album, artist } = metaData.common
  Object.assign(music, { title, album, artist })
}

async function getMusicList(dir) {
  const musicList = getMusicFile(dir)
  const sort = []
  for (let i = 0, l = musicList.length; i < l; i++) {
    const music = musicList[i]
    try {
      await parseMusic(music)
      sort.push(i)
    } catch (e) {
      console.error(`歌曲 ${music.src} 解析错误`, e)
    }
  }
  return { musicList, sort }
}

function getConfig() {
  let config = Object.assign({}, defaultConf)
  if (fs.existsSync(configJson)) {
    config = fse.readJsonSync(configJson)
  }
  return config
}

function setConfig(config) {
  fse.writeJsonSync(configJson, config)
}

module.exports = {
  getConfig,
  setConfig,
  getMusicList
}
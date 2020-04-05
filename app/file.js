const fs = require('fs')
const fse = require('fs-extra')
const path = require('path')
const glob = require('glob')
const mm = require('music-metadata')
const defaultConf = require('./default.js')

const configJson = path.join(process.cwd(), 'config.json')

async function parseSong(file) {
  const metaData = await mm.parseFile(file, { native: true })
  console.log(metaData)
}

function getMusicFile (dir) {
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
mm.parseFile('E:/music/test/123.mp3', { native: true }).then((a)=> {console.log(a)})

async function parseMusic (music) {
  const metaData = await mm.parseFile(music.src, { native: true })
  music.duration = Math.ceil(metaData.format.duration)
  const { title, album, artist } = metaData.common
  Object.assign(music, { title, album, artist })
}

async function getMusicList (dir) {
  const files = getMusicFile(dir)
  for (let i = 0, l = files.length; i < l; i++) {
    try {
      await parseMusic(files[i])
    } catch (e) {
      console.error(`歌曲 ${files[i].src} 解析错误`, e)
    }
  }
  return files
}

function getConfig() {
  let config
  if (fs.existsSync(configJson)) {
    config = fse.readJsonSync(configJson)
    return config
  }
  config = Object.assign({}, defaultConf)
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
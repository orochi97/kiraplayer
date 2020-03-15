const path = require('path')
const fse = require('fs-extra')

console.info('=== 确认 build文件夹 及清空 dist文件夹 ===>')
const buildPath = path.join(process.cwd(), 'build')
const distPath = path.join(process.cwd(), 'dist')
fse.ensureDirSync(buildPath)
fse.emptyDirSync(distPath)

console.info('=== 拷贝文件 到 build文件夹 ===>')
const mainSrcPath = path.join(process.cwd(), 'main')
const mainDestPath = path.join(buildPath, 'main')
fse.copySync(mainSrcPath, mainDestPath)

console.info('=== 拷贝 electron.js 到 build文件夹 ===>')
const electronSrc = path.join(process.cwd(), 'electron.js')
const electronDest = path.join(buildPath, 'electron.js')
fse.copySync(electronSrc, electronDest)

console.info('=== 预处理完毕 ===>')
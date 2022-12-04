const { resolve } = require('path');
const fse = require('fs-extra');

const cwd = process.cwd();

console.info('=== 确认 build文件夹 及清空 dist文件夹 ===>');
const buildPath = resolve(cwd, 'build');
const distPath = resolve(cwd, 'dist');
fse.ensureDirSync(buildPath);
fse.emptyDirSync(distPath);

console.info('=== 拷贝文件 到 build文件夹 ===>');
const mainSrcPath = resolve(cwd, 'src/service');
const mainDestPath = resolve(buildPath, 'service');
fse.copySync(mainSrcPath, mainDestPath);

console.info('=== 拷贝 electron.js 到 build文件夹 ===>');
const electronSrc = resolve(cwd, 'src/electron.js');
const electronDest = resolve(buildPath, 'electron.js');
fse.copySync(electronSrc, electronDest);

console.info('=== 预处理完毕 ===>');
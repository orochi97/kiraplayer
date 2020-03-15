// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
// console.log('electron', require('fs'))
window.require = require
window.nodeVersion = process.versions.node
console.log('----', process.cwd(), __dirname)
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})

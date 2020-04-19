import React, { Component } from 'react'
import './index.css'
import connect from '../../redux/connect'
import EventBus from '../../utils/event-bus'
import { formatTime, chooseSong } from '../../utils'

const listItems = (musicList, currentSong, choose) => {
  return musicList.map((item, index) =>
    <div className="one-song" title={item.file} key={index} onDoubleClick={(e) => choose(index)}>
      <span className="index">{index + 1}</span>
      <span className={`title ${(index)===currentSong?"active":null}`}>{item.file}</span>
      <span className="total">{formatTime(item.duration)}</span>
    </div>
  )
}

function chooseDir() {
  const require = window.require
  const dialog = require('electron').remote.dialog
  dialog.showOpenDialog({
    title: '请选择歌曲文件夹',
    buttonLabel : '确定',
    properties: ['openDirectory']
  }).then((files) => {
    if (files && !files.canceled){
      const filePath = files.filePaths[0]
      EventBus.emit('chooseDir', filePath)
    }
  })
}

class List extends Component {
  constructor(props, context) {
    super(props)
    this.state = {}
  }
  choose(index) {
    chooseSong(this.props, index)
  }
  render() {
    const { musicList, currentSong } = this.props
    return (
      <div className="song-list">
        <input type="button" className="button" onClick={(e) => chooseDir()} value="选择歌曲"/>
        <div className="list"></div>
        <div className="song">
          {listItems(musicList, currentSong, this.choose.bind(this))}
        </div>
      </div>
    )
  }
}

export default connect(List)

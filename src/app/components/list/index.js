import React, { Component } from 'react'
import { systemEventBus, fileDialog } from '@/utils/system'
import connect from '../../redux/connect'
import { formatTime, chooseSong } from '../../utils'

import './index.css'

const listItems = (musicList, currentSong, choose) => {
  return musicList.map((item, index) =>
    <div className="one-song" title={item.file} key={index} onDoubleClick={(e) => choose(index)}>
      <span className="index">{index + 1}</span>
      <span className={`title ${(index)===currentSong?"active":null}`}>{item.file}</span>
      <span className="total">{formatTime(item.duration)}</span>
    </div>
  )
}

function chooseDir(changeState) {
  fileDialog.showOpenDialog({
    title: '请选择歌曲文件夹',
    buttonLabel : '确定',
    properties: ['openDirectory']
  }).then((files) => {
    if (files && !files.canceled){
      const filePath = files.filePaths[0]
      console.log(11111, filePath)
      systemEventBus.emit('chooseDir', filePath)
      changeState('stop')
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
    const { musicList, currentSong, changeState } = this.props
    return (
      <div className="song-list">
        <input type="button" className="button" onClick={(e) => chooseDir(changeState)} value="选择歌曲"/>
        <div className="list"></div>
        <div className="song">
          {listItems(musicList, currentSong, this.choose.bind(this))}
        </div>
      </div>
    )
  }
}

export default connect(List)

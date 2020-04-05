import React from 'react'
import connect from '../redux/connect'
import EventBus from '../utils/event-bus'
import { formatTime } from '../utils'

const listItems = (musicList, currentSong, choose) => {
  return musicList.map((item, index) =>
    <div className="one-song" title={item.file} key={index} onDoubleClick={(e) => choose(index)}>
      <span className="index">{index + 1}</span>
      <span className={`title ${(index+1)===currentSong?"active":null}`}>{item.file}</span>
      <span className="total">{formatTime(item.duration)}</span>
    </div>
  )
}

function chooseDir(e) {
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

function List(props) {
  const { musicList, currentSong, choose } = props
  return (
    <div className="song-list">
      <input type="button" className="button" onClick={(e) => chooseDir()} value="选择歌曲"/>
      <div className="list"></div>
      <div className="song">
        {listItems(musicList, currentSong, choose)}
      </div>
    </div>
  )
}
// class List extends Component {
//   constructor(props, context) {
//     super(props, context)
//     this.store = props.store
//     debugger
//   }
//   static contextType = ReactReduxContext
//   render() {
//     const { value, onIncreaseClick } = this.props
//     return (
// <div className="song-list">
//      <button onClick={onIncreaseClick}>{value}+11111</button>
//      <label id="fileDialog" className="button white"><input type="file" nwdirectory="true" />打开</label> 
//      <div className="list"></div>
//      <div className="song">
//        {listItems}
//      </div>
//  </div>
//     )
//   }
// }

export default connect(List)

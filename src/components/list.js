import React from 'react'
import connect from '../redux/connect'

const listItems = (musicList, currentSong, choose) => {
  return musicList.map((item, index) =>
    <div className="one-song" key={index} onDoubleClick={(e) => choose(index)}>
      <span className="index">{index + 1}</span>
      <span className={`title ${index===currentSong?"active":null}`}>{item.title}</span>
      <span className="total">4:38</span>
    </div>
  )
}

function List(props) {
  const { musicList, currentSong, choose } = props
  return (
    <div className="song-list">
      <label id="fileDialog" className="button white"><input type="file" nwdirectory="true" />打开</label> 
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

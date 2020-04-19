import React, { Component } from 'react'
import './index.css'
import Tape from '../tape/index'
import Info from '../info/index'
import Control from '../control/index'
import List from '../list/index'
import Audio from '../audio'
import connect from '../../redux/connect'
import EventBus from '../../utils/event-bus'

function loading(flag) {
  const dom = document.getElementById('loading')
  dom.style.display = flag ? 'block' : 'none'
}

class App extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }
  componentDidMount() {
    loading(false)
    EventBus.on('chooseDir', () => {
      loading(true)
    })
    EventBus.on('updateMusicList', () => {
      loading(false)
    })
  }
  render() {
    return (
      <div className="App">
        <div className="player">
          <Audio></Audio>
          <Tape></Tape>
          <Info></Info>
          <Control></Control>
        </div>
        <List></List>
      </div>
    ) 
  }
}

export default connect(App)

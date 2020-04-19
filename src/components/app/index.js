import React, { Component } from 'react'
import './index.css'
import Tape from '../tape/index'
import Info from '../info/index'
import Control from '../control/index'
import List from '../list/index'
import Audio from '../audio'
import connect from '../../redux/connect'
import EventBus from '../../utils/event-bus'

class App extends Component {
  constructor(props){
    super(props)
    this._loading = true
    this.state = {
      done: false
    }
  }
  componentDidMount() {
    this._loading = false
    this.setState({ done: true })
    EventBus.on('chooseDir', () => {
      this._loading = true
    })
    EventBus.on('updateMusicList', () => {
      this._loading = false
    })
  }
  render() {
    return (
      <div className="App">
        <div className="alert" style={{display:`${this._loading?'block':'none'}`}}></div>
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

import React, { Component } from 'react'
import './index.css'
import Tape from '../tape/index'
import Info from '../info/index'
import Control from '../control/index'
import List from '../list/index'
import Audio from '../audio'
import connect from '../../redux/connect'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      loading: true
    }
  }
  componentDidMount() {
    this.setState({ loading: false })
  }
  render() {
    return (
      <div className="App">
        <div className="alert" style={{display:`${this.state.loading?'block':'none'}`}}></div>
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

import React from 'react'
import './App.css'
import Tape from './components/tape'
import Info from './components/info'
import Control from './components/control'
import List from './components/list'
import connect from './redux/connect'

function App(props, context) {
  return (
    <div className="App">
      <div className="player">
        <Tape></Tape>
        <Info></Info>
        <Control></Control>
      </div>
      <List></List>
    </div>
  )
}

export default connect(App)

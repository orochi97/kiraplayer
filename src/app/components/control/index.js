import React, { Component } from 'react'
import connect from '../../redux/connect'
import Volume from './volume'
import ProcessBar from './processBar'
import { chooseSong } from '../../utils'

import './index.css'

class Control extends Component {
  constructor(props){ 
    super(props)
    this.state = {}
  }
  mousedown(e) {
    e.target.classList.add('vc-control-active')
  }
  mouseup(e) {
    e.target.classList.remove('vc-control-active')
  }
  action(e) {
    const actionName = e.target.dataset.name
    this[actionName] && this[actionName]()
  }
  play() {
    let playState = this.props.playState
    if (playState === 'pause' || playState === 'stop') {
      playState = 'play'
    } else {
      playState = 'pause'
    }
    this.props.changeState(playState)
  }
  prev() {
    chooseSong(this.props, null, -1)
  }
  next() {
    chooseSong(this.props, null, +1)
  }
  stop() {
    this.props.changeState('stop')
  }
  switch() {
    console.log('switch')
  }
  render() {
    return (
      <div className="control"> 
        <div id="control-btn">
          <ProcessBar></ProcessBar>
          <ul className="vc-controls" onClick={(e)=>this.action(e)} onMouseDown={(e)=>this.mousedown(e)} onMouseUp={(e)=>this.mouseup(e)}>
            <li className={`vc-control-play ${this.props.playState==='play'?'vc-control-active':null}`} data-name="play">Play<span></span></li>
            <li className="vc-control-prev" data-name="prev">Prev<span></span></li>
            <li className="vc-control-next" data-name="next">Next<span></span></li>
            <li className="vc-control-stop" data-name="stop">Stop<span></span></li>
            <li className="vc-control-switch" data-name="switch">Switch<span></span></li>
          </ul>
        </div>
        <Volume></Volume>
      </div>
    )
  }
}

export default connect(Control)

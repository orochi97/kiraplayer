import React, { Component } from 'react'
import connect from '../../redux/connect'
import { formatTime, getPos } from '../../utils'
import EventBus from '../../utils/event-bus'

class ProcessBar extends Component {
  constructor(props){ 
    super(props)
    this.processBarLen = 0
  }
  componentDidMount() { 
    this.processBarLen = this.refs.processBar.clientWidth
  }
  mousedown(e) {
    // 发送至audio组件
    const newcurrentTime = Math.floor((e.pageX - getPos(e.currentTarget).left) *  this.props.currentDuration / this.processBarLen)
    EventBus.emit('changeCurrentTime', newcurrentTime)
  }
  render() {
    const { currentTime, currentDuration } = this.props
    const currTime = Math.ceil(currentTime)
    const totalTime = Math.ceil(currentDuration)
    const timeNow = formatTime(currTime)
    const timeTotal = formatTime(totalTime)
    const barLen = this.processBarLen - Math.ceil(currTime * this.processBarLen / totalTime)
    return (
      <div className="progress">
        <div className="progress-bar" ref="processBar" onMouseDown={(e)=>this.mousedown(e)}>
          <div className="show-bar" style={{width:`${barLen}px`}}></div>
        </div>
        <div className="show-num">
          <span className="now">{timeNow}</span>
            /
          <span className="total">{timeTotal}</span>
        </div>
      </div>
    )
  }
}

export default connect(ProcessBar)

import React from 'react'

function action(e, type) {
  console.log(e.target.dataset.name)
}

function Control() {
  return (
    <div className="control"> 
      <div id="control-btn">
        <div className="progress">
          <div className="progress-bar">
            <div className="show-bar"></div>
          </div>
          <div className="show-num">
            <span className="now"></span>
              /
            <span className="total"></span>
          </div>
        </div>
        <ul className="vc-controls" onClick={action}>
          <li className="vc-control-play" data-name="play">Play<span></span></li>
          <li className="vc-control-prev" data-name="prev">Prev<span></span></li>
          <li className="vc-control-next" data-name="next">Next<span></span></li>
          <li className="vc-control-stop" data-name="stop">Stop<span></span></li>
          <li className="vc-control-switch" data-name="switch">Switch<span></span></li>
        </ul>
      </div>
      <div className="volume">
        <ul id="vol" className="vol">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li style={{backgroundColor: "orange"}}></li>
          <li style={{backgroundColor: "orange"}}></li>
          <li style={{backgroundColor: "red"}}></li>
          <li style={{backgroundColor: "red"}}></li>
        </ul>
        <div id="knob">   
          <div className="base"></div>
          <div className="show"></div>
        </div>
      </div>
    </div>
  )
}

export default Control

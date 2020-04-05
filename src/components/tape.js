import React from 'react'
import connect from '../redux/connect'

function Tape(props) {
  const { musicList, currentSong } = props
  const src = musicList.length ? musicList[currentSong] : ''
  return (
    <div className="vc-tape-wrapper">
      <div className="vc-tape">
        <audio src={src} id="audio"></audio>
        <div className="vc-tape-back">
          <div className="vc-tape-wheel vc-tape-wheel-left"><div></div></div>
          <div className="vc-tape-wheel vc-tape-wheel-right"><div></div></div>
        </div>
        <div className="vc-tape-front vc-tape-side-a">
          <span>A</span>
        </div>
        <div className="vc-tape-front vc-tape-side-b">
          <span>B</span>
        </div>
      </div>
    </div>
  )
}

export default connect(Tape)

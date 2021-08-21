import React from 'react'
import './Song.css'

const Song = (props) => {
  return (
    <div className='song-parent'>
      <p>{props.song}</p>
    </div>
  )
}

export default Song

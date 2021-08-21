import React, { useEffect } from 'react'
import Song from './Song/Song'

const Songs = (props) => {
  useEffect(() => {}, [props.songsList])
  return (
    <div>
      {props.songsList.map((element, index) => (
        <Song key={index} song={element} />
      ))}
    </div>
  )
}

export default Songs

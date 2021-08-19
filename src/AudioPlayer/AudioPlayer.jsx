import React, { useState, useEffect, useRef } from 'react'

import './AudioPlayer.css'

const AudioPlayer = () => {
  const tracks = [
    {
      title: 'Havana',
      artist: 'Camila Cabello ',
      audioSrc: '',
      image:
        'https://upload.wikimedia.org/wikipedia/en/9/98/Havana_%28featuring_Young_Thug%29_%28Official_Single_Cover%29_by_Camila_Cabello.png',
      color: 'yellow',
    },
  ]

  //state

  const [trackIndex, settrackIndex] = useState(0)
  const [trackProgress, settrackProgress] = useState(0)
  const [isPlaying, setisPlaying] = useState(false)

  //ref

  //Destructure for tracks
  const { title, artist, color, image, audioSrc } = tracks[trackIndex]

  // Refs
  const audioRef = useRef(new Audio(audioSrc))
  const intervalRef = useRef()
  const isReady = useRef(false)

  // Destructure for conciseness
  const { duration } = audioRef.current

  //this will move the track to previous track

  const toPrevTrack = () => {
    console.log('move to previous track')
  }

  const toNextTrack = () => {
    console.log('move to next track')
  }

  return (
    <>
      <div className='audio-player'>
        <div className='track-info'>
          <img
            className='artwork'
            src={image}
            alt={`track artwork for ${title} by ${artist}`}
          />
          <h2 className='title'>{title}</h2>
          <h3 className='artist'>{artist}</h3>
        </div>
      </div>
    </>
  )
}

export default AudioPlayer

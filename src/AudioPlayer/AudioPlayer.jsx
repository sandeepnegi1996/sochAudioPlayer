import React, { useState, useEffect, useRef } from 'react'

import AudioControls from './AudioControls/AudioControls'
import './AudioPlayer.css'

const AudioPlayer = () => {
  const tracks = [
    {
      title: 'Senorita',
      artist: 'Shawn Mendes, Camila Cabello',
      audioSrc: '',
      image: 'https://i.ytimg.com/vi/OmHa0bnZs9o/hqdefault.jpg',
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

  const setIsPlaying = () => {
    console.log('is playing')
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
          <AudioControls
            isPlaying={isPlaying}
            onPrevClick={toPrevTrack}
            onNextClick={toNextTrack}
            onPlayPauseClick={setIsPlaying}
          />
        </div>
      </div>
    </>
  )
}

export default AudioPlayer

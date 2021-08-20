import React, { useState, useEffect, useRef } from 'react'

import AudioControls from './AudioControls/AudioControls'
import './AudioPlayer.css'

const AudioPlayer = () => {
  const tracks = [
    {
      title: 'Senorita',
      artist: 'Shawn Mendes, Camila Cabello',
      audioSrc:
        'https://www.mboxdrive.com/Shawn%20Mendes,%20Camila%20Cabello%20-%20Se%C3%B1orita.mp3',
      image: 'https://i.ytimg.com/vi/OmHa0bnZs9o/hqdefault.jpg',
      color: 'yellow',
    },

    {
      title: 'Blank Space',
      artist: 'Taylor Swift',
      audioSrc:
        'https://www.mboxdrive.com/Taylor%20Swift%20-%20Blank%20Space.mp3',
      image: 'https://wallpapercave.com/wp/wp7261524.jpg',
      color: 'yellow',
    },
    {
      title: 'Never Be Alone',
      artist: 'Shawn Mendes',
      audioSrc:
        'https://www.mboxdrive.com/Shawn%20Mendes%20-%20Never%20Be%20Alone%20(Tradu%C3%A7%C3%A3o).mp3',
      image:
        'https://c-cl.cdn.smule.com/rs-s26/arr/fd/5f/4b9bfdc3-49b1-49bf-9a18-ce45da448876_1024.jpg',
      color: 'yellow',
    },
    {
      title: 'In My Blood',
      artist: 'Shawn Mendes',
      audioSrc:
        'https://m.media-amazon.com/images/M/MV5BYzZlOTVlODctZmFiNC00NTg4LTkwNTAtYmNhNDBiMTViNzRjXkEyXkFqcGdeQXVyNDQ5MDYzMTk@._V1_.jpg',
      image:
        'data:image/jpeg;base64,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',
      color: 'yellow',
    },
    {
      title: 'Trickster',
      artist: 'Trickster',
      audioSrc: 'https://www.mboxdrive.com/trickster2.mp3',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJBLXkN0vGTrclWJeoNiVr-VR_Qj4bOEgwFQ&usqp=CAU',
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

  // This si teh API Audio api that we will be using
  // it has controls for play pause
  const audioRef = useRef(new Audio(audioSrc))
  const intervalRef = useRef()
  const isReady = useRef(false)

  // Destructure for conciseness
  const { duration } = audioRef.current

  //this will move the track to previous track

  const toPrevTrack = () => {
    if (trackIndex - 1 < 0) {
      settrackIndex(tracks.length - 1)
    } else {
      settrackIndex(trackIndex - 1)
    }

    console.log(trackIndex)
  }

  const toNextTrack = () => {
    if (trackIndex < tracks.length - 1) {
      settrackIndex(trackIndex + 1)
    } else {
      settrackIndex(0)
    }

    console.log(trackIndex)
  }

  const setIsPlaying = () => {
    setisPlaying(!isPlaying)
  }

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying])

  useEffect(() => {
    // Pause and clean up on unmount
    return () => {
      audioRef.current.pause()
      clearInterval(intervalRef.current)
    }
  }, [])

  useEffect(() => {
    audioRef.current.pause()

    audioRef.current = new Audio(audioSrc)
    settrackProgress(audioRef.current.currentTime)

    if (isReady.current) {
      audioRef.current.play()

      setIsPlaying(true)

      // startTimer()
    } else {
      isReady.current = true
    }
  }, [trackIndex])

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

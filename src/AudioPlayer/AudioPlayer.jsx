import React, { useState, useEffect, useRef } from 'react'
import { VolumeDownFill } from 'react-bootstrap-icons'

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
    },

    {
      title: 'Blank Space',
      artist: 'Taylor Swift',
      audioSrc:
        'https://www.mboxdrive.com/Taylor%20Swift%20-%20Blank%20Space.mp3',
      image: 'https://wallpapercave.com/wp/wp7261524.jpg',
    },
    {
      title: 'Never Be Alone',
      artist: 'Shawn Mendes',
      audioSrc:
        'https://www.mboxdrive.com/Shawn%20Mendes%20-%20Never%20Be%20Alone%20(Tradu%C3%A7%C3%A3o).mp3',
      image:
        'https://c-cl.cdn.smule.com/rs-s26/arr/fd/5f/4b9bfdc3-49b1-49bf-9a18-ce45da448876_1024.jpg',
    },
    {
      title: 'No Roots',
      artist: 'Alice Merton',
      audioSrc: 'https://www.mboxdrive.com/noRoots_Alice_Merton.mp3',
      image:
        'https://girlsareawesome.com/wp-content/uploads/2019/02/Copy-of-AliceMerton_2018-06_PaperPlaneRecordsInt.jpg',
    },
    {
      title: 'Trickster',
      artist: 'Trickster',
      audioSrc: 'https://www.mboxdrive.com/trickster2.mp3',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJBLXkN0vGTrclWJeoNiVr-VR_Qj4bOEgwFQ&usqp=CAU',
    },
  ]

  //state

  const [trackIndex, settrackIndex] = useState(0)
  const [trackProgress, settrackProgress] = useState(0)
  const [isPlaying, setisPlaying] = useState(false)

  //this will track the sound bar progress
  const [trackSoundProgress, setTrackSoundProgress] = useState(0)

  //ref

  //Destructure for tracks
  const { title, artist, image, audioSrc } = tracks[trackIndex]

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

      //once the track is played we will start the timer
      startTimer()
    } else {
      //once the track is stopeed we will clear the timer
      clearInterval(intervalRef.current)
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

      //track index changed start the timer
      startTimer()
    } else {
      isReady.current = true
    }
  }, [trackIndex])

  //here every second we are checking wether the trrack ended or not
  //if not ended than changed the track progerss teh current time of the src
  const startTimer = () => {
    clearInterval(intervalRef.current)

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        toNextTrack()
      } else {
        settrackProgress(audioRef.current.currentTime)
      }
    }, [1000])
  }

  const onScrub = (value) => {
    clearInterval(intervalRef.current)
    audioRef.current.currentTime = value
    settrackProgress(audioRef.current.currentTime)
  }

  const onScrubEnd = () => {
    //if it is not playing set the playing to true
    if (!isPlaying) {
      setIsPlaying(true)
    }

    startTimer()
  }

  const onSoundChange = (value) => {
    clearInterval(intervalRef.current)
    let newValue = value / 100
    console.log(newValue)
    audioRef.current.volume = newValue
    setTrackSoundProgress(value)
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

          <div className='progressBarParent'>
            <div className='progressBarInput'>
              <input
                type='range'
                value={trackProgress}
                step='1'
                min='0'
                max={duration ? duration : `${duration}`}
                className='progress'
                onChange={(e) => onScrub(e.target.value)}
                onMouseUp={onScrubEnd}
                onKeyUp={onScrubEnd}
              />
            </div>

            <div className='sound-control'>
              <button className='volumeControl' aria-label='volume'>
                <VolumeDownFill size={30} />
              </button>
            </div>

            <div>
              <input
                type='range'
                value={trackSoundProgress}
                onChange={(e) => onSoundChange(e.target.value)}
                className='soundProgress'
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AudioPlayer

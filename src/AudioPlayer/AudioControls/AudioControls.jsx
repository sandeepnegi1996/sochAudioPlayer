import React from 'react'

import { PlayFill } from 'react-bootstrap-icons'
import { PauseFill } from 'react-bootstrap-icons'
import { ArrowLeftCircleFill } from 'react-bootstrap-icons'
import { ArrowRightCircleFill } from 'react-bootstrap-icons'
import './AudioControl.css'

const AudioControls = ({
  isPlaying,
  onPlayPauseClick,
  onPrevClick,
  onNextClick,
}) => {
  return (
    <div className='audio-controls'>
      <button
        type='button'
        className='prev'
        aria-label='Previous'
        onClick={onPrevClick}
      >
        <ArrowLeftCircleFill size={40} />
      </button>

      {isPlaying ? (
        <button
          type='button'
          className='pause'
          aria-label='Pause'
          onClick={() => {
            onPlayPauseClick(false)
          }}
        >
          <PauseFill size={40} />
        </button>
      ) : (
        <button
          type='button'
          className='play'
          onClick={() => onPlayPauseClick(true)}
          aria-label='Play'
        >
          <PlayFill size={40} />
        </button>
      )}

      <button
        type='button'
        className='next'
        aria-label='Next'
        onClick={onNextClick}
      >
        <ArrowRightCircleFill size={40} />
      </button>
    </div>
  )
}

export default AudioControls

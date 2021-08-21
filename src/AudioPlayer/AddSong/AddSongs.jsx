import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import './AddSongs.css'
import Songs from './Songs/Songs'

const AddSongs = () => {
  const [songUrl, setsongUrl] = useState('')
  const [songsList, setSongsList] = useState([])

  const songUrlUpdated = (value) => {
    setsongUrl(value)
  }
  const addSongsToPlayList = () => {
    setSongsList((prevArray) => [...prevArray, songUrl])
    console.log(songsList)
  }

  return (
    <div className='add-songs-parent'>
      <input
        type='text'
        placeholder='add Song Url '
        className='addUrlBar'
        onChange={(e) => songUrlUpdated(e.target.value)}
      />

      <button className='addSongBtn' onClick={() => addSongsToPlayList()}>
        Add Song
      </button>

      <Songs songsList={songsList} />
    </div>
  )
}

export default AddSongs

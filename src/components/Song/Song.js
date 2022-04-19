import React, { useEffect } from 'react'
import SongLibrary from './SongLibary/SongLibrary'
import './Song.scss'
import SongSearch from './SongSearch/SongSearch'
import SongMV from './SongMV/SongMV'
import SongChart from './SongChart/SongChart'
import SongFollow from './SongFollow/SongFollow'
import { useDispatch } from 'react-redux'
import userSlice from '../../redux/slices/userSlice'
import songSlice from '../../redux/slices/songSlice'

function Song({props}) {
  const dispatch = useDispatch()
  let songCurrent;
  switch(props) {
    case "search":
      songCurrent = <SongSearch/>
      break;         
    case "chart":
      songCurrent = <SongChart/>
      break;    
    case "mv":
      songCurrent = <SongMV/>
      break;  
    case "follow":
      songCurrent = <SongFollow/>
      break;  
    default:
      songCurrent = <SongLibrary/>
  }

  useEffect(() => {
    dispatch(userSlice.actions.handleAccess(true))
    dispatch(songSlice.actions.activeHeaderVirtual(true))
  },[])
  return (
    <div id='song'>
        <div className="song-body">
          {songCurrent} 
        </div>
    </div>
  )
}

export default Song
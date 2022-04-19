import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import songSlice from '../../redux/slices/songSlice'
import { getRequestAccess } from '../../redux/slices/userSlice'
import Book from '../Book/Book'
import Chart from '../Chart/Chart'
import Contact from '../Contact/Contact'
import Control from '../Control/Control'
import PhotoBackground from '../PhotoBackground/PhotoBackground'
import SelectTheme from '../SelectTheme/SelectTheme'
import Singer from '../Singer/Singer'
import Slider from '../Slider/Slider'
import Song from '../Song/Song'
import SongNav from '../Song/SongNav/SongNav'

function Content() {
  const dispatch = useDispatch()
  const handleAcceptAccess = useSelector(getRequestAccess)
  setTimeout(() => {
    handleAcceptAccess && dispatch(songSlice.actions.activeHeaderVirtual(true))
  },100)
  return (
    <div id="content">
      {handleAcceptAccess ? <>
        <SongNav/>
        <Song/>
      </> : 
      <>
        <Slider/>
        <Book/>
        <PhotoBackground/>
        <Contact/>
      </>
      }
      
    </div>
  )
}

export default Content
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import songSlice from '../../../redux/slices/songSlice'
import './SongMV.scss'

function SongMV() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(songSlice.actions.changeNavActive(4))
  },[])
  return (
    <div>SongMV</div>
  )
}

export default SongMV
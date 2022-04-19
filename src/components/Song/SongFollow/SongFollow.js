import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import songSlice from '../../../redux/slices/songSlice'
import Singer from '../../Singer/Singer'
import './SongFollow.scss'

function SongFollow() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(songSlice.actions.changeNavActive(5))
  },[])
  return (
    <Singer/>
  )
}

export default SongFollow
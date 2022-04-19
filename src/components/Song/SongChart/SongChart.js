import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import songSlice from '../../../redux/slices/songSlice'
import Chart from '../../Chart/Chart'
import './SongChart.scss'

function SongChart() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(songSlice.actions.changeNavActive(3))
  },[])
  return (
    <Chart/>
  )
}

export default SongChart
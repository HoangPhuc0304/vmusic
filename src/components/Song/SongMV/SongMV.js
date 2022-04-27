import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import songSlice from '../../../redux/slices/songSlice'
import { getMusicVideoList } from '../../../redux/slices/videoSlice'
import ThumbnailVideo from '../../ThumbnailVideo/ThumbnailVideo'
import './SongMV.scss'

function SongMV() {
  const listMV = useSelector(getMusicVideoList)
  console.log(listMV)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(songSlice.actions.changeNavActive(4))
  }, [])
  return (
    <div className="song-mv">
      <div className="song-mv-box">
        <div className="song-mv-heading">Popular Music Videos in Vietnam</div>
        <div className="song-mv-container">
          <div className="song-mv-list">
            {listMV.map((item) => (
              <Link 
                to={`/mv/${item.id}`}
                style={{textDecoration: 'none'}}
                key={item.id}
              >
                <ThumbnailVideo content={item}/>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SongMV
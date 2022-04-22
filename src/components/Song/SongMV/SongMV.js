import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import vPopList from '../../../fakeAPI/api/vpop'
import { changeTimeFromSecondToString } from '../../../others/features'
import { randomTrending } from '../../../others/randomChart'
import songSlice from '../../../redux/slices/songSlice'
import { getMusicVideoList } from '../../../redux/slices/videoSlice'
import './SongMV.scss'

function SongMV() {
  const listMV = useSelector(getMusicVideoList)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(songSlice.actions.changeNavActive(4))
  },[])
  return (
    <div className="song-mv">
      <div className="song-mv-box">
        <div className="song-mv-heading">Popular Music Videos in Vietnam</div>
        <div className="song-mv-container">
          <div className="song-mv-list">
            {listMV.map((item,index) => (
              <div className="song-mv-item" key={index}>
                <div className="song-mv-thumbnail">
                  <img src={item.img} alt={item.song} />
                  <span className="song-mv-time">{changeTimeFromSecondToString(item.length)}</span>
                  <p className={`song-mv-highlight ${listMV[index].status.color}`}>{listMV[index].status.kind}</p>
                  <i className="bi bi-play-circle"></i>
                </div>
                <div className="song-mv-body">
                  <img src={item.avatar} alt={item.name} />
                  <div className="song-mv-decoration">
                    <h3>{item.song}</h3>
                    <p>{item.name}</p>
                  </div>
                </div>
              </div>
            )) }
          </div>
        </div>
      </div>
    </div>
  )
}

export default SongMV
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import songSlice, { getCurrentSong, getInformationStopBroadcast, getListFavoriteSong, getRequestHideSetting, getSongListBroadcast } from '../../../redux/slices/songSlice'
import './SongLibrary.scss'
import { changeTimeFromSecondToString } from '../../../others/features'
import SongSetting from '../SongSetting/SongSetting'
import { iconWaveGif } from '../../../fakeAPI/api/songAPI'

function SongLibrary() {
  console.log("trtrtr")
  const currentSong = useSelector(getCurrentSong)
  const songBroadcast = useSelector(getSongListBroadcast)
  const receiveRequestFromSetting = useSelector(getRequestHideSetting)
  const isStopBroadcast = useSelector(getInformationStopBroadcast)
  const listFavoriteSong = useSelector(getListFavoriteSong)
  const [indexSelect, setIndexSelect] = useState(-1)
  const songList = useRef()
  const songItem = useRef([])
  const heartIcons = useRef([])
  const selectIcons = useRef([])
  const dispatch = useDispatch()

  const handleClickHeart = (item,index) => {
    heartIcons.current[index].classList.toggle('active')
    dispatch(songSlice.actions.clickHeartIcon(item))
  }
  const handleClickSelect = (index) => {
    selectIcons.current[index].classList.toggle('active')
    if (selectIcons.current[index].getAttribute('class').includes('active')) {
      setIndexSelect(index)
    } else {
      setIndexSelect(-1)
    }
  }
  const handleHideSelect = (index) => {
    // selectIcons.current[index].classList.remove('active')
    console.log("Blur")
  }
  const handleSongBroadcast = (item, index) => {
    dispatch(songSlice.actions.requestSongBroadcast(item))
    dispatch(songSlice.actions.preventSongPlaylist(-1))
    if (isStopBroadcast) {
      dispatch(songSlice.actions.finishSong(false))
    }
  }
  const scrollToActiveSong = () => {
    setTimeout(() => {
      songList.current.scrollTo(0, 
        songList.current.querySelector('.song-library-item.active').offsetTop 
        - songList.current.offsetHeight / 2)
    },500) 
  }
  useEffect(() => {
    if (receiveRequestFromSetting == true) {
      setIndexSelect(-1)
      dispatch(songSlice.actions.requestHideSetting(false))
    }
  }, [receiveRequestFromSetting])
  useEffect(() => {
    dispatch(songSlice.actions.changeNavActive(1))
    scrollToActiveSong()
  }, [])
  return (
    <div className="song-library">
      <div className="song-library-head">
        <div className="song-library-frame">
          <div className="song-library-photo">
            <img src={currentSong.avatar} alt={currentSong.song} />
            <h3>Your Library</h3>
          </div>
        </div>
      </div>
      <div className="song-library-body">
        <div className="song-library-list" ref={songList}>
          {songBroadcast.map((item, index) => (
            <div
              className={`song-library-item ${JSON.stringify(item)
                === JSON.stringify(currentSong) ? 'active' : ''}`}
              key={index}
              ref={(element) => { songItem.current[index] = element }}
              onClick={() => handleSongBroadcast(item, index)}

            >
              <div className="song-item-head">
                <div className="song-item-head-img">
                  <img src={item.img} alt={item.song} className="song-item-thumb" />
                  {JSON.stringify(item) === JSON.stringify(currentSong)
                    && <img src={iconWaveGif} alt="wave" className="song-item-wave"></img>}
                </div>
                <div className="song-item-decoration">
                  <h3>{item.song}</h3>
                  <p>{item.name}</p>
                </div>
              </div>
              <div className="song-item-time">{changeTimeFromSecondToString(item.length)}</div>
              <div className="song-item-tail" onClick={(e) => { e.stopPropagation() }}>
                <i
                  className={`bi bi-heart-fill song-item-heart ${
                    listFavoriteSong.find((itemSong) => (JSON.stringify({...itemSong,id: ''}) 
                    === JSON.stringify({...item,id: ''}))) && 'active'}`}
                  ref={(element) => { heartIcons.current[index] = element }}
                  onClick={() => handleClickHeart(item,index)}>
                </i>
                <i
                  className="bi bi-three-dots song-item-select"
                  ref={(element) => { selectIcons.current[index] = element }}
                  onClick={() => handleClickSelect(index)}
                >
                  {indexSelect === index && <SongSetting songSelect={item} />}
                </i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SongLibrary
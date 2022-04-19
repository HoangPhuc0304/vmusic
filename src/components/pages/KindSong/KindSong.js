import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import cPopList from '../../../fakeAPI/api/cpop'
import lunarNewYear from '../../../fakeAPI/api/Playlist/lunarNewYear'
import usukList from '../../../fakeAPI/api/Playlist/usuk'
import { iconWaveGif, songSearchList, songSearchTop } from '../../../fakeAPI/api/songAPI'
import vPopList from '../../../fakeAPI/api/vpop'
import { changeTimeFromSecondToString } from '../../../others/features'
import songSlice, { getAllSong, getInformationStopBroadcast, getRequestHideSetting } from '../../../redux/slices/songSlice'
import SongSetting from '../../Song/SongSetting/SongSetting'
import './KindSong.scss'

function KindSong() {
  const { kind } = useParams()
  const currentSong = useSelector(getAllSong)
  const isStopBroadcast = useSelector(getInformationStopBroadcast)
  const receiveRequestFromSetting = useSelector(getRequestHideSetting)
  const heartIcons = useRef([])
  const selectIcons = useRef([])
  const kindSong = useRef()
  const songList = useRef([])
  const songItem = useRef([])
  const songPageList = useRef()
  const isTheFirstTime = useRef(true)
  const [indexSelect, setIndexSelect] = useState(-1)
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
  const handleClickSong = (item) => {
    if (isTheFirstTime.current) {
      dispatch(songSlice.actions.getSongListFromPlaylist(songList.current))
      isTheFirstTime.current = false
    }
    if (isStopBroadcast) {
      dispatch(songSlice.actions.finishSong(false))
    }
    dispatch(songSlice.actions.requestSongPlaylist(item))
  }

  useEffect(() => {
    scrollToActiveSong() || window.scrollTo(0, 0)
  }, [])
  useEffect(() => {
    if (receiveRequestFromSetting == true) {
      setIndexSelect(-1)
      dispatch(songSlice.actions.requestHideSetting(false))
    }
  }, [receiveRequestFromSetting])
  const scrollToActiveSong = () => {
    setTimeout(function(){
        document.querySelector('.song-page-item.active').scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        })
    },300)
}



  for (var i = 0; i < songSearchTop.length; i++) {
    if (songSearchTop[i].kind === kind) {
      kindSong.current = songSearchTop[i]
    }
  }
  for (var i = 0; i < songSearchList.length; i++) {
    if (songSearchList[i].kind === kind) {
      kindSong.current = songSearchList[i]
    }
  }
  switch (kindSong.current) {
    case songSearchTop[0]:
      songList.current = vPopList
      break
    case songSearchTop[1]:
      songList.current = vPopList
      break
    case songSearchList[0]:
      songList.current = vPopList
      break
    case songSearchList[1]:
      songList.current = vPopList
      break
    case songSearchList[2]:
      songList.current = vPopList
      break
    case songSearchList[3]:
      songList.current = vPopList
      break
    case songSearchList[4]:
      songList.current = vPopList
      break
    case songSearchList[5]:
      songList.current = cPopList
      break
    case songSearchList[6]:
      songList.current = usukList
      break
    case songSearchList[7]:
      songList.current = vPopList
      break
    case songSearchList[8]:
      songList.current = lunarNewYear
      break
    case songSearchList[9]:
      songList.current = vPopList
      break
    case songSearchList[10]:
      songList.current = vPopList
      break
    case songSearchList[11]:
      songList.current = vPopList
      break
    case songSearchList[12]:
      songList.current = vPopList
      break
    case songSearchList[13]:
      songList.current = vPopList
      break
    case songSearchList[14]:
      songList.current = vPopList
      break
    case songSearchList[15]:
      songList.current = vPopList
      break
    case songSearchList[16]:
      songList.current = vPopList
      break
    case songSearchList[17]:
      songList.current = vPopList
      break
    default:
      songList.current = vPopList
  }
  return (
    <div className='song-page'>
      <div className="song-page-box" ref={songPageList}>
        <div className="song-page-header" style={{ backgroundColor: `${kindSong.current.color || songSearchTop[0].color}` }}>
          <Link to="/search" className="song-page-icon" style={{ textDecoration: "none" }}>
            <i className="bi bi-arrow-left-circle-fill"></i>
          </Link>
          <h3 className="song-header-title">{kindSong.current.kind || songSearchTop[0].kind}</h3>
          <img src={kindSong.current.img || songSearchTop[0].img} alt="Photo" />
        </div>
        <div className="song-page-body">
          <div className="song-page-list">
            {songList.current.map((item, index) => (
              <div
                className={`song-page-item ${currentSong
                  && JSON.stringify(currentSong) === JSON.stringify(item)
                  ? 'active' : ''
                  }`}
                key={index}
                ref={songItem}
                onClick={() => handleClickSong(item)}
              >
                <div className="song-item-head">
                  <div className="song-item-number">
                    <h3>{index + 1}</h3>
                  </div>
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
                    className="bi bi-heart-fill song-item-heart"
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
    </div>
  )
}

export default KindSong
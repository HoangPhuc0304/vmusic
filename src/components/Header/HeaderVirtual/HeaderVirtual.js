import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import songSearchAll, { iconForWeather } from '../../../fakeAPI/api/songAPI'
import { searchResultSelector } from '../../../redux/selector'
import songSlice from '../../../redux/slices/songSlice'
import './HeaderVirtual.scss'

function HeaderVirtual() {
  const searchResult = useSelector(searchResultSelector)
  const [weatherIcon, setWeatherIcon] = useState(iconForWeather[0])
  const [textSearch, setTextSearch] = useState("")
  const [checkBlur, setCheckBlur] = useState(false)
  const dispatch = useDispatch()
  let kindSongActive = 0;

  const handleSearch = (e) => {
    setTextSearch(e.target.value)
    dispatch(songSlice.actions.searchSong(e.target.value))
  }
  const handleSearchBlur = (e) => {
    setTimeout(() => {
      setCheckBlur(true)
    },200)
    // setCheckBlur(true)
  }
  const handleSearchClick = () => {
    setCheckBlur(false)
  }
  const handleClickSong = (item) => {
    dispatch(songSlice.actions.playSongFromSearch(item))
  }

  useEffect(() => {
    const timeDate = new Date().getHours()
    if (timeDate >= 6 && timeDate < 11) {
      setWeatherIcon(iconForWeather[0])
    } else if (timeDate >= 11 && timeDate < 15) {
      setWeatherIcon(iconForWeather[1])
    } else if (timeDate >= 15 && timeDate < 18) {
      setWeatherIcon(iconForWeather[2])
    } else {
      setWeatherIcon(iconForWeather[3])
    }
  }, [])

  return (
    <div className="header-virtual">
      <div className="song-header-nav">
        <div className="song-header-weather">
          <i className={weatherIcon.mainIcon}></i>
          <i className={weatherIcon.supportIcon}></i>
        </div>
      </div>
      <div className="song-header-search">
        <i className="bi bi-search song-search-icon"></i>
        <input
          value={textSearch}
          type="text"
          placeholder="Artist, songs, or podcasts"
          onChange={handleSearch}
          onBlur = {handleSearchBlur}
          onClick={handleSearchClick}
        />
        <i 
          className="bi bi-x-circle-fill song-delete-icon" 
          onClick={() => {
            setTextSearch("")
          }}>
        </i>
      </div>
      {textSearch && !checkBlur && <div className="search-song-box">
        {Array.from(searchResult).map((itemKind,indexList) => {
          if (itemKind.length > 0) {
            kindSongActive++
            let kind;
            switch (indexList) {
              case 0: {
                kind = "POP"
                break
              }
              case 1: {
                kind = "Rap"
                break
              }
              case 2: {
                kind = "Chill"
                break
              }
              case 3: {
                kind = "Mood"
                break
              }
              case 4: {
                kind = "Romance"
                break
              }
              case 5: {
                kind = "R&B"
                break
              }
              case 6: {
                kind = "V-POP"
                break
              }
              case 7: {
                kind = "C-POP"
                break
              }
              case 8: {
                kind = "US&UK"
                break
              }
              case 9: {
                kind = "K-POP"
                break
              }
              case 10: {
                kind = "Lunar New Year"
                break
              }
              case 11: {
                kind = "Summer"
                break
              }
              case 12: {
                kind = "Autumn"
                break
              }
              case 13: {
                kind = "Christmas"
                break
              }
              case 14: {
                kind = "Sleep"
                break
              }
              case 15: {
                kind = "Gaming"
                break
              }
              case 16: {
                kind = "Instrumental"
                break
              }
              case 17: {
                kind = "Dance / Electronic"
                break
              }
              default: {
                kind = "No results match with your search"
              }
            }
            return <div key={indexList} className="search-song-list">
              <h3>{kind}</h3>
              {itemKind.map((item,indexItem) => (
                <div key={indexItem} className="search-song-item" onClick={() => handleClickSong(item)}>
                  <img src={item.img} alt={item.song} className="search-song-photo"/>
                  <div className="search-song-decoration">
                    <h3>{item.song}</h3>
                    <p>{item.name}</p>
                  </div>
                </div>
              ))}
            </div>
          }
        })}
        {kindSongActive === 0 && <p className="search-song-no-result">
            <i className="bi bi-search"></i>
            No results for "{textSearch}"
          </p>}
      </div>}
    </div>
  )
}

export default HeaderVirtual
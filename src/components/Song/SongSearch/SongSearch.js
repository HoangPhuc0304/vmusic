import React, {useEffect, useRef} from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {songSearchList, songSearchTop } from '../../../fakeAPI/api/songAPI'
import songSlice from '../../../redux/slices/songSlice';
import HeaderVirtual from '../../Header/HeaderVirtual/HeaderVirtual';
import './SongSearch.scss'

function SongSearch() {
  
  const photoTop = useRef([]);
  const photoTheme = useRef([]);
  const dispatch = useDispatch()
  const handleHoverItem = (index) => {
    photoTop.current[index].classList.add("disable");
    photoTheme.current[index].classList.add("active");
  }
  const handleLeaveItem = (index) => {
    photoTop.current[index].classList.remove("disable");
    photoTheme.current[index].classList.remove("active");
  }
  useEffect(() => {
    dispatch(songSlice.actions.changeNavActive(2))
  },[])
  return (
    <div className="song-search">
      <div className="song-search-body">
        <div className="song-kind-top">
          <h3 className="song-kind-heading">Your top genres</h3>
          <div className="song-kind-top-list">
            {songSearchTop.map((item,index) => (
              <Link 
                to={`/search/${item.kind}`} 
                style={{textDecoration: 'none'}}
                key={item.id}
              >
                <div  
                  className="song-kind-top-item"
                  style={{
                    backgroundColor: item.color
                  }}
                  onMouseOver={() => handleHoverItem(index)}
                  onMouseOut={() => handleLeaveItem(index)}
                >
                  <h4>{item.kind}</h4>
                  <img src={item.img} alt={item.img} className="song-kind-photo-top" ref={(element) => {photoTop.current[index] = element}}/>
                  <img src={item.img} alt={item.img} className="song-kind-photo-theme" ref={(element) => {photoTheme.current[index] = element}}/>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="song-kind-body">
          <h3 className="song-kind-heading">Browse all</h3>
          <div className="song-kind-body-list">
            {songSearchList.map((item) => (
              <Link to={`/search/${item.kind}`} style={{textDecoration: 'none'}} key={item.id}>
                <div  
                  className="song-kind-body-item"
                  style={{
                    backgroundColor: item.color
                  }}
                >
                  <h4>{item.kind}</h4>
                  <img src={item.img} alt={item.img} className="song-kind-photo-body"/>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SongSearch
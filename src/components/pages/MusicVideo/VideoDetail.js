import React, { useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'
import "./VideoDetail.scss"
import { useDispatch, useSelector } from 'react-redux'
import ThumbnailVideo from '../../ThumbnailVideo/ThumbnailVideo'
import videoSlice, { getListVideoDislike, getListVideoLike, getMusicVideoList } from '../../../redux/slices/videoSlice'
import { changeScoreToRating } from '../../../others/features'

function VideoDetail() {
  const { link } = useParams()
  const dispatch = useDispatch()
  const mvList = useSelector(getMusicVideoList)
  const listLike = useSelector(getListVideoLike)
  const listDislike = useSelector(getListVideoDislike)
  let starRating

  const handleLikeClick = (item) => {
    dispatch(videoSlice.actions.clickLike(item))
  }
  const handleDislikeClick = (item) => {
    dispatch(videoSlice.actions.clickDislike(item))
  }

  useEffect(() => {
    dispatch(videoSlice.actions.requestVideoDisplay(link))
  },[link])

  useEffect(() =>{
    return () => {
      console.log("Finish Detail")
    }
  },[])
  return (
    <div className="video-page">
      <div className="video-page-background">
        <div className="video-page-watch">
          <div className="video-page-main">
            <ReactPlayer
              className="video-display"
              url={mvList[0].link}
              controls = {true}
              width = '100%'
              height = '100%'
            />
          </div>
          <div className="video-information">
            <div className="video-information-header">
              <div className="video-information-decoration">{`${mvList[0].name.toUpperCase()} | ${mvList[0].song.toUpperCase()} | OFFICIAL MUSIC VIDEO`}</div>
              <div className="video-information-behavior">
                <span className="video-behavior-like">
                  <i 
                    className={listLike.find((item) => (JSON.stringify(item) === JSON.stringify(mvList[0]))) 
                    ? 'bi bi-hand-thumbs-up-fill active' 
                    : 'bi bi-hand-thumbs-up'}
                    onClick={() => handleLikeClick(mvList[0])}
                  ></i>
                  Like
                </span>
                <span className="video-behavior-dislike">
                  <i 
                    className={listDislike.find((item) => (JSON.stringify(item) === JSON.stringify(mvList[0]))) 
                      ? 'bi bi-hand-thumbs-down-fill active' 
                      : 'bi bi-hand-thumbs-down'}
                    onClick={() => handleDislikeClick(mvList[0])}
                  ></i>
                  Dislike
                </span>
              </div>
            </div>
            <div className="video-information-channel">
              <div className="video-information-review">  
                <img src={mvList[0].avatar} alt={mvList[0].name}/>
                <ul className="video-information-list">
                  <li className="video-information-item">
                    <h3>Rating:</h3>
                    <span>{mvList[0].rating}</span>
                    {Array(5).fill("").map((item,index) => {
                      if (starRating >= 1) {
                        starRating--
                        return <i className="bi bi-star-fill fill" key={index}></i>
                      } else if (starRating > 0 && starRating < 1) {
                        starRating = 0
                        return <i className="bi bi-star-half half" key={index}></i>
                      }
                      return <i className="bi bi-star-fill" key={index}></i>
                    },starRating = changeScoreToRating(mvList[0].rating))}
                  </li>
                  <li className="video-information-item">
                    <h3>Name:</h3>
                    <span>{mvList[0].name}</span>
                  </li>
                  <li className="video-information-item">
                    <h3>Type:</h3>
                    <span>V-POP</span>
                  </li>
                </ul>
              </div>
              <button className="video-information-subscribe">Subscribe</button>
            </div>
          </div>
        </div>
        <div className="video-page-list">
          {mvList.map((item,index) => (
            <Link
              to={`/mv/${item.id}`}
              style={{textDecoration: 'none'}}
              key={item.id}
            >
              <ThumbnailVideo content={item} isBroadcast={index ===0 ? true : false}/>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default VideoDetail
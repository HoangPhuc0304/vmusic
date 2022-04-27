import React from 'react'
import { changeTimeFromSecondToString } from '../../others/features'
import './ThumbnailVideo.scss'

function ThumbnailVideo(props) {
    return (
        <div className="song-mv-item">
            <div className={`song-mv-thumbnail ${props.isBroadcast ? 'broadcast' : ''}`}>
                <img src={props.content.img} alt={props.content.song} />
                <span className="song-mv-time">{changeTimeFromSecondToString(props.content.length)}</span>
                <p className={`song-mv-highlight ${props.content.status.color}`}>{props.content.status.kind}</p>
                {props.isBroadcast ? <i className="bi bi-broadcast"></i> : <i className="bi bi-play-circle"></i>}
            </div>
            <div className="song-mv-body">
                <img src={props.content.avatar} alt={props.content.name} />
                <div className="song-mv-decoration">
                    <h3>{props.content.song}</h3>
                    <p>{props.content.name}</p>
                </div>
            </div>
        </div>
    )
}

export default ThumbnailVideo
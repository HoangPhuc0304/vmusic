import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import songSlice from '../../../redux/slices/songSlice'

function SongSetting(props) {
    const [message,setMessage] = useState('')
    const [icon,setIcon] = useState('bi bi-files')
    const dispatch = useDispatch()

    const changeCopyIcon = (e) => {
        const textCopy = document.querySelector('#linkVideo')
        textCopy.select()
        textCopy.setSelectionRange(0, 99999)
        navigator.clipboard.writeText(textCopy.value)
        setIcon('bi bi-check-lg active')
    }
    const handleHoverShare = () => {
        document.querySelector('.song-clipboard').classList.add('active')
    } 
    const handleFinishShare = () => {
        document.querySelector('.song-clipboard').classList.remove('active')
    } 
    const handleNextBroadcast = (item) => {
        dispatch(songSlice.actions.addNextBroadcast(item))
    }
    const handleRemoveSongAtBroadcast = (item) => {
        dispatch(songSlice.actions.removeSongAtBroadcast(item))
    }
    const handleAddSongAtBroadcast = (item) => {
        dispatch(songSlice.actions.addSongAtBroadcast(item))
    }


    useEffect(() => {
        const event = setTimeout(()=>{
            setIcon('bi bi-files')
        },5000)

        return () => {
            clearTimeout(event)
        }
    },[icon])

    useEffect(()=> {
        const HideSetting = () => {
            dispatch(songSlice.actions.requestHideSetting(true))
        }
        window.addEventListener('click',HideSetting)
        return () => {
            window.removeEventListener('click',HideSetting)
            console.log('Clean up')
        }
    },[])
    return (
        <div className="song-setting">
            <div className="song-broadcast" onClick={() => handleNextBroadcast(props.songSelect)}>
                <i className="bi bi-broadcast-pin"></i>
                Next broadcast
            </div>
            {props.songSelect.link === "https://www.youtube.com" 
            ? <div className="song-add" onClick={() => handleAddSongAtBroadcast(props.songSelect)}>
                <i className="bi bi-plus-circle-fill"></i>
                Add from your library
            </div>
            : <div className="song-remove" onClick={() => handleRemoveSongAtBroadcast(props.songSelect)}>
                <i className="bi bi-trash-fill"></i>
                Remove from your library
            </div>}
            <div className="song-share" onMouseOver={handleHoverShare} onMouseOut={handleFinishShare} onClick={(e) => {e.stopPropagation()}}>
                <i className="bi bi-share-fill"></i>
                Share
                <div className="song-clipboard">
                    <div className="song-clipboard-header">
                        <i className="bi bi-send-fill song-clipboard-icon"></i>
                        <span>Share to your platforms</span>
                    </div>
                    <div className="song-clipboard-body">
                        <input type="text" value={props.songSelect.link} id="linkVideo" onChange={(e) => setMessage(e.target.value)}/>
                        <button className={icon} onClick={changeCopyIcon}></button>
                    </div>
                    <div className="song-clipboard-tail">
                        <a href="" className="social-size social-fb social-background" target="_blank"></a>
                        <a href="" className="social-size social-google social-background" target="_blank"></a>
                        <a href="" className="social-size social-apple social-background" target="_blank"></a>
                    </div>
                </div>
            </div>
            <a href={props.songSelect.audio} download className="song-download" onClick={(e) => {e.stopPropagation()}}>
                <i className="bi bi-download"></i>
                Download
            </a>
        </div>
    )
}

export default SongSetting
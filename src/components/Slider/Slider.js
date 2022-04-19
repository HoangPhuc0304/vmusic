import React, { useEffect, useState } from 'react'
import imageSlider from '../../fakeAPI/images/imageSlider'
import './Slider.scss'

function Slider() {
    const [indexDisplay,setIndexDisplay] = useState(1)

    const CurrentSlide = (page) => {
        page !== indexDisplay && setIndexDisplay(page)
    }
    const PlusSlide = (control) => {
        if (indexDisplay+control < 1) {
            setIndexDisplay(imageSlider.length)
        } else if (indexDisplay+control > 15) {
            setIndexDisplay(1)
        } else {
            setIndexDisplay(indexDisplay+control)
        }
    }

    useEffect(() => {
        const timeOut = setTimeout(() => {
            indexDisplay >= imageSlider.length 
            ? setIndexDisplay(1) 
            : setIndexDisplay((preIndex) => preIndex+1)
        },5000)

        return () => {
            clearTimeout(timeOut)
            console.log('clear function')
        }
    },[indexDisplay])
  return (
    <div id="slider">
        <div className="slider-container">
            {imageSlider.map((photo)=>(
                <div key={photo.id} >
                    <img 
                        src={photo.link} 
                        alt="Slider Photo" 
                        className={indexDisplay === photo.id ? "slider-photo active" : "slider-photo"}
                    />
                    <p className={indexDisplay === photo.id 
                        ? "slider-page active" : "slider-page"}
                    >{`${photo.id} / ${imageSlider.length}`}</p>
                </div>
            ))}   
            <ul className="slider-frame">
                {imageSlider.map((photo) => (
                    <li 
                        key={photo.id}
                        className={photo.id===indexDisplay ? "slider-btn active"  :"slider-btn"} 
                        onClick={() => {CurrentSlide(photo.id)}}
                    ></li>)
                )}
            </ul> 
            <div className="slider-change-left" onClick={() => {PlusSlide(-1)}}>
                <i className="ti-angle-left"></i>
            </div>
            <div className="slider-change-right" onClick={() => {PlusSlide(1)}}>
                <i className="ti-angle-right"></i>
            </div>        
        </div>
    </div>
  )
}

export default Slider
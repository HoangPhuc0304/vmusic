import React, { useMemo, useState } from 'react'
import imageChart, { imageCloud } from '../../fakeAPI/images/imageChart'
import vpopList from '../../fakeAPI/api/vpop'
import {randomChart,randomStatus} from '../../others/randomChart'

const listChart = randomChart(vpopList)
function Chart() {
    const [photoTheme,setPhotoTheme] = useState(imageChart[0])
    const [date,setDate] = useState(new Date().toDateString())
    // const listChart = useMemo(() => randomChart(vpopList),[date])

    const handleChangeTheme = (photo) => {
        setPhotoTheme(photo)
    }
    const PlusChart = (number) => {
        const indexCurrent = photoTheme.id + number
        if (indexCurrent > imageChart.length) {
            setPhotoTheme(imageChart[0])
        } else if (indexCurrent < 1) {
            setPhotoTheme(imageChart[imageChart.length - 1])
        } else {
            setPhotoTheme(imageChart[indexCurrent - 1])
        }
    }
  return (
    <div className="chart" style={{background: `linear-gradient(var(--primary-color),rgb(62, 126, 223)`}}>
        <div className="chart-body">
            <h3 className="chart-heading">Daily Top Songs Vietnam</h3>
            <div className="chart-container">
                <div className="chart-background">
                    <div className="chart-background-top">
                        <img src={photoTheme.link} alt="" className="chart-background-photo" />
                        <p className="chart-background-page">{`${photoTheme.id} / ${imageChart.length}`}</p>
                        <i className="ti-angle-left chart-background-left" onClick={() => PlusChart(-1)}></i>
                        <i className="ti-angle-right chart-background-right" onClick={() => PlusChart(1)}></i>
                    </div>
                    <div className="chart-background-bottom">
                        {imageChart.map((photo) => (
                            <div 
                                key={photo.id}
                                className="chart-background-box"
                                onClick={() => handleChangeTheme(photo)}
                            >
                                <img src={photo.link} alt="" />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chart-song">
                    <div className="chart-title">
                        <h3 className="chart-title-heading">Top 10 Songs</h3>
                        <h3 className="chart-title-time">{date}</h3>
                    </div>
                    <div className="chart-list">
                        {listChart.map((item,index) => (
                            <div className="chart-item" key={index}>
                                <span 
                                    className={index==0 ? 'chart-number green' : (
                                        index==1 ? 'chart-number blue' : (
                                            index ==2 ? 'chart-number red' : 'chart-number'
                                        )
                                    )}
                                >{`#${index+1}`}</span>
                                <a href={item.link} className="chart-btn" target="_blank">
                                    <img src={item.img} alt="Singer Photo" />
                                    <div className="chart-decoration">
                                        <h3>{item.song}</h3>
                                        <p>{item.name}</p>
                                    </div>
                                </a>
                                <span 
                                    className={`chart-status ${item.status}`}
                                ></span>
                            </div>
                        ))}
                    </div>
                    <div className="chart-footer">
                        <a href="" className="chart-more" target="_blank">See all
                            <i className='ti-angle-right'></i>
                        </a>
                    </div>
                </div>
            </div>
            
        </div>
        <div className="chart-clouds">
                {imageCloud.map((image) => (
                    <img key={image.id} src={image.link} alt="" className="chart-cloud-item"/>
                ))}
            </div>
    </div>
  )
}

export default Chart
import React from 'react'
import './Singer.scss'
import singerInfo from '../../fakeAPI/api/singerInfo'

function Singer() {
  return (
    <div className="singer">
      <div className="singer-body">
        <h3 className="singer-heading">Vietnam's top singers in 2022</h3>
        <div className="singer-container">
          <ul className="singer-list">
            {singerInfo.map((info) => (
              <li className="singer-item" key={info.id}>
                <img src={info.photo} alt="" className="singer-photo" />
                <div className="singer-info">
                    <h3 className="singer-name">{info.name}</h3>
                    <span className="singer-sub">{info.subscribe}</span>
                    <div className="singer-social">
                      <a href="" className="singer-fb bi bi-facebook" target="_blank"></a>
                      <a href="" className="singer-youtube bi bi-youtube" target="_blank"></a>
                      <a href="" className="singer-instagram bi bi-instagram" target="_blank"></a>
                      <a href="" className="singer-spotify bi bi-spotify" target="_blank"></a>
                    </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Singer
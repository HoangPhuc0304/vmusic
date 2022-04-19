import React, { useEffect, useState } from 'react'
import { themeColor } from '../../fakeAPI/api/setting'
import './SelectTheme.scss'
function SelectTheme() {
  const [active,setActive] = useState(1);
  const handleChangeActive = (id,mainColor,darkColor,musicColor,textColor,textChangeColor) => {
    document.querySelector(':root').style.setProperty('--primary-color',mainColor)
    document.querySelector(':root').style.setProperty('--dark-color',darkColor)
    document.querySelector(':root').style.setProperty('--music-color',musicColor)
    document.querySelector(':root').style.setProperty('--text-color',textColor)
    document.querySelector(':root').style.setProperty('--text-change',textChangeColor)
    setActive((preId) => {
      preId !== id && setActive(id)
    })
  }
  const hideModal = () => {
    document.querySelector('.theme-modal').classList.remove('active')
  }
  useEffect(() => {
    return () => {
      document.querySelector(':root').style.setProperty('--primary-color','#3d054e')
      document.querySelector(':root').style.setProperty('--dark-color','#290335')
      document.querySelector(':root').style.setProperty('--music-color','linear-gradient(117deg,#31033e,#470e88 102%)')
      document.querySelector(':root').style.setProperty('--text-color','#fff')
      document.querySelector(':root').style.setProperty('--text-change','#000')
    }
  },[])
  return (
    <div className="theme-modal" onClick={hideModal}>
      <div className="theme-box" onClick={(e) => {e.stopPropagation()}}>
          <div className="theme-header">
              <div className="theme-heading">Theme</div>
              <div className="theme-close" onClick={hideModal}>
                  <i className="ti-close"></i>
              </div>
          </div>
          <div className="theme-body">
              <div className="theme-list">
                  {themeColor.map((item) => (
                    <div className="theme-item" key={item.id}>
                      <div 
                        className="theme-item-box"
                        style={{
                          background: `linear-gradient( 45deg, ${item.mainColor}, ${item.mainColor} 49%, white 49%, white 51%, ${item.darkColor} 51% )`,
                          border: `2px solid ${item.id === active ? 'green': '#fff'}`
                        }}
                        onClick={() => handleChangeActive(item.id,item.mainColor,item.darkColor,item.styleColor,item.textColor,item.textChangeColor)}
                      >
                        {item.id === active && <i className="bi bi-check-circle"></i>}
                      </div>
                    </div>
                  ))}
              </div>
          </div>
      </div>
    </div>
  )
}

export default SelectTheme
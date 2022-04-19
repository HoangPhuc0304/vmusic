import React from 'react'
function PhotoBackground() {
  return (
    <div id="photo_background" style={{
        width: '100%',
        height: '100vh',
        backgroundImage: `url(${require('./photo_winter.jpg')})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }}>
    </div>
  )
}

export default PhotoBackground
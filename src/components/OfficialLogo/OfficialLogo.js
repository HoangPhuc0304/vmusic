import React from 'react'
import { Link } from 'react-router-dom'
import './OfficialLogo.scss'

function OfficialLogo() {
    return (
        <div>
            <Link to="/" style={{textDecoration: 'none'}}>
                <div className="official-logo">
                    <img src={require('../../common/header_icon.png')} alt="logo" />
                    <h3>V-Music</h3>
                </div>
            </Link>
        </div>
    )
}

export default OfficialLogo
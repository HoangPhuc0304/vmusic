import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getRequestHeaderVirtual } from '../../redux/slices/songSlice'
import { getRequestAccess } from '../../redux/slices/userSlice'
import OfficialLogo from '../OfficialLogo/OfficialLogo'
import HeaderVirtual from './HeaderVirtual/HeaderVirtual'

function Header() {
    const [accountTable,setAccountTable] = useState(false)
    const isActiveHeaderVirtual = useSelector(getRequestHeaderVirtual)
    const handleAcceptAccess = useSelector(getRequestAccess)
    const handleClickAccount = () => {
        setAccountTable((isOpen) => setAccountTable(!isOpen))
    }
    const handleOpenTheme = () => {
        document.querySelector('.theme-modal').classList.add('active')
    }
    return (
        <div id="header">
            <OfficialLogo/>
            {isActiveHeaderVirtual
            ?   <HeaderVirtual/>
            :<ul className="nav">
                <a href="#" className='nav-link'>
                    <li className="nav-item">
                        Home
                    </li>
                </a>
                <a href="#book" className='nav-link'>
                    <li className="nav-item">
                        Book
                    </li>
                </a>
                <a href="#photo_background" className='nav-link'>
                    <li className="nav-item">
                        Photo
                    </li>
                </a>
                <a href="#contact" className='nav-link'>
                    <li className="nav-item">
                        Contact
                    </li>
                </a>
            </ul>
            }

            <ul className="user">
                {handleAcceptAccess ?  <div className="user-box">
                    <i className="bi bi-gear-fill" onClick={handleOpenTheme}>
                    </i>
                    <div className="user-account" onClick={handleClickAccount}>
                        <i className="bi bi-person-circle"></i>
                        Lê Hoàng Phúc
                        <i className={`${accountTable ? 'bi bi-caret-up-fill':'bi bi-caret-down-fill'} user-setting`}></i>
                        {accountTable 
                        && <div className="header-account">
                            <ul className="header-account-list">
                                <li className="header-account-item">
                                    <i className="bi bi-person-fill icon-account"></i>
                                    Account
                                </li>
                                <li className="header-account-item">
                                    <i className="bi bi-pencil-fill icon-account"></i>
                                    Edit profile
                                </li>
                                <li className="header-account-item icon-account">
                                    <i className="bi bi-gem"></i>
                                    Upgrade to Premium
                                </li>
                                <Link to="/sign-in" style={{textDecoration: 'none'}}>
                                    <li className="header-account-item icon-account">
                                        <i className="bi bi-box-arrow-up-right"></i>
                                        Log out
                                    </li>
                                </Link>
                            </ul>
                        </div>}
                    </div>
                </div>
                : <>
                    <Link to="/sign-in">
                        <li><button className="user-item">Sign in</button></li>
                    </Link>
                        <p>|</p>
                    <Link to="/sign-up">
                        <li><button className="user-item">Sign up</button></li>
                    </Link>
                </>
                }
            </ul>
        </div>
    )
}

export default Header
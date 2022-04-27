import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import songSlice from '../../../redux/slices/songSlice'
import userSlice, { getRequestAccess } from '../../../redux/slices/userSlice'
import './SignIn.scss'
function SignIn() {
    const acceptAccess = useSelector(getRequestAccess)
    const [emailText,setEmailText] = useState('')
    const [password,setPassword] = useState('')
    const messageEmail = useRef()
    const emailGroup = useRef()
    const messagePassword = useRef()
    const passwordGroup = useRef()
    const closeModal = useRef()
    const dispatch = useDispatch()
    window.scrollTo(0, 0)

    const handleEmailChange = (e) => {
        setEmailText(e.target.value)
        messageEmail.current.innerHTML = ''
        emailGroup.current.classList.remove('invalid')
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
        messagePassword.current.innerHTML = ''
        passwordGroup.current.classList.remove('invalid')
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const checkMail = handleCheckEmail(emailText)
        const checkPassword = handleCheckInput(password)
        if (checkMail && checkPassword) {
            dispatch(userSlice.actions.handleSignIn({
                email: emailText,
                password: password
            }))
        }
    }
    
    const handleCheckEmail = (text) => {
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!regex.test(text)) {
            const message = "This input must be an email"
            messageEmail.current.innerHTML = message
            emailGroup.current.classList.add('invalid')
            return false
        } 
        return true
    }
    const handleCheckInput = (text) => {
        if(!text) {
            const message = "Please fill this input"
            messagePassword.current.innerHTML = message
            passwordGroup.current.classList.add('invalid')
            return false
        }
        return true
    }
    const handleClickModal = (e) => {
        closeModal.current.click()
    }
    const handleClickForm = (e) => {
        e.stopPropagation()
    }
    useEffect(() => {
        dispatch(userSlice.actions.handleAccess(false))
    },[])
    useEffect(() => {
        dispatch(songSlice.actions.activeHeaderVirtual(true))
        return () => {
            dispatch(songSlice.actions.activeHeaderVirtual(false))
        }
    },[])
    useEffect(() => {
        acceptAccess && setTimeout(() => {
            closeModal.current.click()
        },300)
    },[acceptAccess])

  return (
    <div className="modal-sign-in" onClick={handleClickModal}>
        <form action="" method="POST" className="form" id="form-signIn" onSubmit={handleSubmit} onClick={handleClickForm}>
            <div className="form-header">
                <Link to="/" className="form-close" ref={closeModal}>
                    <i className="ti-close"></i>
                </Link>
                <div className="form-heading">Sign In</div>
            </div>
            
            <div className="form-body">
                <div className="form-group" ref={emailGroup}>
                    <i className="bi bi-person-fill form-user-icon"></i>
                    <label htmlFor="email" className="form-label">Email</label>
                    <input 
                        id="form-email" 
                        value={emailText}
                        name="email" 
                        type="text" 
                        placeholder="Type your email" 
                        className="form-control-input"
                        onChange={handleEmailChange}
                        onBlur={(e) => handleCheckEmail(e.target.value)}
                    />
                    <div className="form-message" ref={messageEmail}></div>
                </div>
            
                <div className="form-group" ref={passwordGroup}>
                    <i className="bi bi-key-fill form-user-icon"></i>
                    <label htmlFor="password" className="form-label">Password</label>
                    <input 
                        id="form-password" 
                        value={password}
                        name="password" 
                        type="password" 
                        placeholder="Type your password" 
                        className="form-control-input"
                        onChange={handlePasswordChange}
                        onBlur={(e) => handleCheckInput(e.target.value)}
                    />
                    <div className="form-message" ref={messagePassword}></div>
                    <div className="forget-password-box">
                        <a href="" className="forget-password" target="_blank">Forgot password?</a>
                    </div>
                </div>
                <button className="form-submit">Sign In</button>
            </div>
            <div className="form-footer">
                <div className="form-social">
                    <p className="form-suggest">Or sign in using</p>
                    <div className="form-social-icon">
                        <a href="" className="social-size social-fb social-background" target="_blank"></a>
                        <a href="" className="social-size social-google social-background" target="_blank"></a>
                        <a href="" className="social-size social-apple social-background" target="_blank"></a>
                    </div>
                    <p className="change-text">New member?<Link to="/sign-up"><span className="change-signIn"> Sign up </span></Link> here.</p>
                </div>
            </div>
        </form>
    </div>
  )
}

export default SignIn
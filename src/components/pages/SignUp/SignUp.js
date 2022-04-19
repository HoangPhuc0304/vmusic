import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import songSlice from '../../../redux/slices/songSlice'
import userSlice from '../../../redux/slices/userSlice'
import './SignUp.scss'
function SignUp() {
    const [emailText,setEmailText] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const messageEmail = useRef()
    const emailGroup = useRef()
    const messagePassword = useRef()
    const passwordGroup = useRef()
    const messageConfirmPassword = useRef()
    const confirmPasswordGroup = useRef()
    const closeModal =useRef()
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
    const handleChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value)
        messageConfirmPassword.current.innerHTML = ''
        confirmPasswordGroup.current.classList.remove('invalid')
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const checkMail = handleCheckEmail(emailText)
        const checkPassword = handleCheckPassword(password)
        const checkConfirmPassword = handleCheckConfirmPassword(confirmPassword)
        if (checkMail && checkPassword && checkConfirmPassword ) {
            dispatch(userSlice.actions.handleSignUp({
                email: emailText,
                password: password,
            }))
            setTimeout(() => {
                closeModal.current.click()
            },1000)
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
    const handleCheckPassword = (text) => {
        if(text.length < 8) {
            const message = text ? "This input must be at least 8 characters" : "Please fill this input"
            messagePassword.current.innerHTML = message
            passwordGroup.current.classList.add('invalid')
            return false
        }
        return true
    }
    const handleCheckConfirmPassword = (text) => {
      let message
        if (!text) {
            message = "Please fill this input"
            messageConfirmPassword.current.innerHTML = message
            confirmPasswordGroup.current.classList.add('invalid')
            return false
        } else if (text !== password) {
            message = "Confirm password doesn't exact"
            messageConfirmPassword.current.innerHTML = message
            confirmPasswordGroup.current.classList.add('invalid')
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
        dispatch(songSlice.actions.activeHeaderVirtual(true))
        return () => {
            dispatch(songSlice.actions.activeHeaderVirtual(false))
        }
    },[])
  return (
    <div className="modal-sign-up" onClick={handleClickModal}>
        <form action="" method="POST" className="form" id="form-signUp" onSubmit={handleSubmit} onClick={handleClickForm}>
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
                        onBlur={(e) => handleCheckPassword(e.target.value)}
                    />
                    <div className="form-message" ref={messagePassword}></div>
                    <div className="forget-password-box">
                        <a href="" className="forget-password" target="_blank">Forgot password?</a>
                    </div>
                </div>
                <div className="form-group" ref={confirmPasswordGroup}>
                    <i className="bi bi-check-lg form-user-icon"></i>
                    <label htmlFor="confirm-password" className="form-label">Confirm password</label>
                    <input 
                        id="form-confirm-password-signUp" 
                        value={confirmPassword}
                        name="confirm-password" 
                        type="password" 
                        placeholder="Confirm your password" 
                        className="form-control-input"
                        onChange={handleChangeConfirmPassword}
                        onBlur={(e) => handleCheckConfirmPassword(e.target.value)}
                    />
                    <div className="form-message" ref={messageConfirmPassword}></div>
                </div>
                <button className="form-submit">Sign Up</button>
            </div>
            <div className="form-footer">
                <div className="form-social">
                    <p className="form-suggest">Or sign in using</p>
                    <div className="form-social-icon">
                        <a href="" className="social-size social-fb social-background" target="_blank"></a>
                        <a href="" className="social-size social-google social-background" target="_blank"></a>
                        <a href="" className="social-size social-apple social-background" target="_blank"></a>
                    </div>
                    <p className="change-text">Already have an account?<Link to="/sign-in"><span className="change-signUp"> Sign in </span></Link> here.</p>
                </div>
            </div>
        </form>
    </div>
  )
}

export default SignUp
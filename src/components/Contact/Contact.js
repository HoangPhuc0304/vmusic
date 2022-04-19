import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import userSlice from '../../redux/slices/userSlice'

function Contact() {
    const [emailText,setEmailText] = useState('')
    const [name,setName] = useState('')
    const [message,setMessage] = useState('')
    const messageEmail = useRef()
    const emailGroup = useRef()
    const messageName = useRef()
    const nameGroup = useRef()
    const dispatch = useDispatch()
    const handleEmailChange = (e) => {
        setEmailText(e.target.value)
        messageEmail.current.innerHTML = ''
        emailGroup.current.classList.remove('invalid')
    }
    const handleNameChange = (e) => {
        setName(e.target.value)
        messageName.current.innerHTML = ''
        nameGroup.current.classList.remove('invalid')
    }
    const handleMessageChange = (e) => {
        setMessage(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const checkMail = handleCheckEmail(emailText)
        const checkName = handleCheckInput(name)
        if (checkMail && checkName && message) {
            dispatch(userSlice.actions.handleSendMessage({
                email: emailText,
                name: name,
                message: message,
            }))
            setEmailText('')
            setName('')
            setMessage('')
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
            messageName.current.innerHTML = message
            nameGroup.current.classList.add('invalid')
            return false
        }
        return true
    }
    return (
        <div id="contact">
            <h3 className="contact-heading">Contact</h3>
            <div className="contact-box">
                <div className="contact-information">
                    <div className="contact-information-item">
                        <i className="contact-icon red-color ti-location-pin"></i>
                        <span className="contact-text">Ho Chi Minh City, Vietnam</span>
                    </div>
                    <div className="contact-information-item">
                        <i className="contact-icon black-color ti-email"></i>
                        <span className="contact-text">lephuc0304@gmail.com</span>
                    </div>
                    <div className="contact-information-item">
                        <i className="contact-icon green-color ti-timer"></i>
                        <span className="contact-text">6:00-22:00 (GMT+7)</span>
                    </div>
                </div>
                <form action="" method="POST" id="form-contact" onSubmit={handleSubmit}>
                    <div className="form-contact-list">
                        <div className="form-contact-item" ref={emailGroup}>
                            <i className="bi bi-envelope-open-fill form-contact-icon"></i>
                            <input 
                                id="contact-email"  
                                value={emailText}
                                name="email" 
                                type="email" 
                                className="contact-input"
                                onChange={handleEmailChange}
                                onBlur={(e) => handleCheckEmail(e.target.value)}
                            />
                                <span className="contact-title">Email</span>
                                <div className="form-message" ref={messageEmail}></div>
                        </div>
                        <div className="form-contact-item" ref={nameGroup}>
                            <i className="bi bi-person-circle form-contact-icon"></i>
                            <input 
                                id="contact-name"  
                                value={name}
                                name="name" 
                                type="text" 
                                className="contact-input"
                                onChange={handleNameChange}
                                onBlur={(e) => handleCheckInput(e.target.value)}
                            />
                                <span className="contact-title">Your name</span>
                                <div className="form-message" ref={messageName}></div>
                        </div>
                    </div>
                    <div className="form-contact-list">
                        <div className="form-contact-item">
                            <i className="bi bi-chat-right-dots-fill form-contact-icon"></i>
                            <input 
                                id="contact-message" 
                                value={message}
                                name="message" 
                                type="text" 
                                className="contact-input-message"
                                onChange={handleMessageChange}
                            />
                                <span className="contact-title-message">Type your message</span>
                        </div>
                    </div>
                    <button className="contact-btn">Send</button>
                </form>
            </div>

        </div>
    )
}

export default Contact
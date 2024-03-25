import React, { useRef } from 'react'
import './ContactForm.scss'
import { useSelector } from 'react-redux'
import emailjs from '@emailjs/browser';

const ContactForm = () => {

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_7ocg5ng', 'template_t4tkobo', form.current, 'WTJd8eCZYGJyVwxql')
            .then((result) => {
                console.log(result.text);
                form.current.reset();
                alert("Send Email Successfully");
            }, (error) => {
                console.log(error.text);
            });
    };

    return (
        <div className='contactform'>
            <h1>Contact Us</h1>
            <hr />

            <form onSubmit={sendEmail} ref={form} >
                <div className="input-userinfo">
                    <div className="input-name">
                        <label>Name <span>*</span></label>
                        <input type="text" placeholder='Name' name='user_name' value={userInfo ? userInfo.name : ''} required />
                    </div>

                    <div className="input-email">
                        <label>Email <span>*</span></label>
                        <input type="email" placeholder='Email' name='user_email' value={userInfo ? userInfo.email : ''} required />
                    </div>
                </div>

                <div className="input-mesg">
                    <label>Message <span>*</span></label>
                    <textarea name="message" id="message" rows="7" placeholder='Message' required></textarea>
                </div>
                <button>Send</button>
            </form>
        </div>
    )
}

export default ContactForm

import React, { useEffect, useState } from 'react'
import './Footer.scss'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { subscribeUser } from '../../../actions/userActions'
import { USER_SUBSCRIBE_RESET } from '../../../constants/userConstants'

const Footer = () => {

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');

    const dispatch = useDispatch();

    const userSubscribe = useSelector(state => state.userSubscribe);
    const { success, error } = userSubscribe;

    const submitHandler = () => {
        const userData = {
            user: {
                firstname,
                lastname,
                email,
            }
        };
        dispatch(subscribeUser(userData));
    };

    useEffect(() => {
        if (success) {
            alert(success);
            setFirstname('');
            setLastname('');
            setEmail('');
            dispatch({ type: USER_SUBSCRIBE_RESET });
        } else if (error) {
            alert(error);
        };
    }, [success, error]);

    return (
        <div className="footer-bg">
            <div className='footer'>
                <div className="footer-items">
                    <div className="quick-links">
                        <h4>Quick Links</h4>

                        <Link to='/products'>All Products</Link>
                        <Link to='/about'>About Us</Link>
                        <Link to='/faq'>FAQ</Link>
                        <Link to='/contact'>Contact Us</Link>
                    </div>

                    <div className="newsletter">
                        <h4>Sign up for our newsletter</h4>

                        <small>Sign up to get the latest on sales, new releases and more…</small>

                        <div className="input-name">
                            <input type="text" placeholder='First name' value={firstname} onChange={e => setFirstname(e.target.value)} required />
                            <input type="text" placeholder='Last name' value={lastname} onChange={e => setLastname(e.target.value)} required />
                        </div>

                        <div className="input-email">
                            <input type="email" placeholder='Email address' value={email} onChange={e => setEmail(e.target.value)} required />
                            <button type='submit' onClick={submitHandler}>Sign Up</button>
                        </div>
                    </div>

                    <div className="catalog">
                        <h4>Catalog</h4>

                        <Link to='/products/makeup'>Makeup</Link>
                        <Link to='/products/bath+body'>Bath + Body</Link>
                        <Link to='/products/skincare'>Skincare</Link>
                        <Link to='/products/hair+nails'>Hair + Nails</Link>
                        <Link to='/products/wellness'>Wellness</Link>
                    </div>
                </div>

                <div className="sns-icons">
                    <Link to='/'><i className="fa-brands fa-twitter"></i></Link>
                    <Link to='/'><i className="fa-brands fa-facebook-f"></i></Link>
                    <Link to='/'><i className="fa-brands fa-youtube"></i></Link>
                    <Link to='/'><i className="fa-brands fa-pinterest-p"></i></Link>
                    <Link to='/'><i className="fa-brands fa-instagram"></i></Link>
                </div>

                <hr />

                <small className="copyright">
                    © 2024 Leah
                </small>
            </div>
        </div >
    )
}

export default Footer

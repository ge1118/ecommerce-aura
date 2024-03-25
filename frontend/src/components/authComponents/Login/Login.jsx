import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../sharedComponents/Loader/Loader'
import Message from '../../sharedComponents/Message/Message'
import { login } from '../../../actions/userActions'
import './Login.scss'

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const redirect = location.search ? location.search.split('=')[1] : '/';
    const userLogin = useSelector(state => state.userLogin);
    const { error, loading, userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, userInfo, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    }

    return (
        <div className='login'>
            <h1>Customer Login</h1>
            <hr />

            {error && <Message bgcolor='#ca7e7e' txtcolor='#fff'>{error}</Message>}
            {loading && <Loader />}

            <form className="login-form" onSubmit={submitHandler}>
                <label>Email</label>
                <input
                    type="email"
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label>Password</label>
                <input
                    type="password"
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <div>
                    <button type="submit">Sign In</button>
                    <p>New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Sign Up</Link></p>
                </div>
            </form>
        </div>
    )
}

export default Login

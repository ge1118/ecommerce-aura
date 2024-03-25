import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../sharedComponents/Loader/Loader'
import Message from '../../sharedComponents/Message/Message'
import { register } from '../../../actions/userActions'
import './Register.scss'

const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const redirect = location.search ? location.search.split('=')[1] : '/';
    const userRegister = useSelector(state => state.userRegister);
    const { error, loading, userInfo } = userRegister;

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, userInfo, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();

        if (password != confirmPassword) {
            setMessage('Password Do Not Match');
        } else {
            dispatch(register(name, email, password));
        };
    };

    return (
        <div className='register'>
            <h1>Create Account</h1>
            <hr />

            {message && <Message bgcolor='#ca7e7e' txtcolor='#fff'>{message}</Message>}
            {error && <Message bgcolor='#ca7e7e' txtcolor='#fff'>{error}</Message>}
            {loading && <Loader></Loader>}

            <form className="register-form" onSubmit={submitHandler}>
                <label>Name</label>
                <input
                    type="text"
                    name='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

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

                <label>Confirm Password</label>
                <input
                    type="password"
                    name='passwordconfirm'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <div>
                    <button type="submit">Sign Up</button>
                    <p>Already Have an Account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Sign In</Link></p>
                </div>
            </form>
        </div>
    )
}

export default Register

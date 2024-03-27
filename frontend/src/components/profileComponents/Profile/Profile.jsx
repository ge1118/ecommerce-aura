import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../sharedComponents/Loader/Loader'
import Message from '../../sharedComponents/Message/Message'
import { getUserDetails, updateUserProfile } from '../../../actions/userActions'
import { listMyOrders } from '../../../actions/orderActions'
import { USER_UPDATE_PROFILE_RESET } from '../../../constants/userConstants'
import './Profile.scss'
import Paginate from '../../sharedComponents/Paginate/Paginate'

const Profile = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const pageQuery = searchParams.get('page');

    const userDetails = useSelector(state => state.userDetails);
    const { error, loading, user } = userDetails;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const { success } = userUpdateProfile;

    const orderListMy = useSelector(state => state.orderListMy);
    const { orders, loading: loadingOrders, error: errorOrders, page, pages } = orderListMy;

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        } else {
            if (!user || !user.name || success || userInfo._id !== user._id) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET });
                dispatch(getUserDetails('profile'));
                dispatch(listMyOrders(pageQuery));
            } else {
                setName(user.name);
                setEmail(user.email);
            };
        };
    }, [navigate, dispatch, userInfo, user, success,]);

    useEffect(() => {
        if (userInfo) {
            dispatch(listMyOrders(pageQuery));
        };
    }, [dispatch, pageQuery, userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();

        if (password != confirmPassword) {
            setMessage('Password Do Not Match');
        } else {
            dispatch(updateUserProfile({
                'id': user._id,
                'name': name,
                'email': email,
                'password': password,
            }));
            setMessage('');
        };
    };

    return (
        <div className='profile'>
            <h1>Account Details</h1>
            <hr />

            {message && <Message bgcolor='#ca7e7e' txtcolor='#fff'>{message}</Message>}
            {error && <Message bgcolor='#ca7e7e' txtcolor='#fff'>{error}</Message>}
            {loading && <Loader></Loader>}

            <div className="user-profile">
                <div className="user-info">
                    <h3>User Info</h3>
                    <hr />

                    <form className="update-form" onSubmit={submitHandler}>
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

                        <button type="submit" >Update</button>
                    </form>
                </div>

                <div className="order-history">
                    <h3>Order History</h3>
                    <hr />

                    {
                        loadingOrders ? (
                            <Loader />
                        ) : errorOrders ? (
                            <Message bgcolor='#ca7e7e' txtcolor='#fff'>{errorOrders}</Message>
                        ) : (
                            <>
                                <div className='order-table-container'>
                                    <table className="order-table">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>DATE</th>
                                                <th>TOTAL</th>
                                                <th>PAID</th>
                                                <th>DELIVERED</th>
                                                <th></th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                orders?.map((order) => (
                                                    <tr key={order._id}>
                                                        <td>{order._id}</td>
                                                        <td>{order.createdAt.substring(0, 10)}</td>
                                                        <td>${order.totalPrice}</td>
                                                        <td>{order.isPaid ? order.paidAt.substring(0, 10) : <i className='fas fa-times' style={{ color: 'red' }} />}</td>
                                                        <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : <i className='fas fa-times' style={{ color: 'red' }} />}</td>
                                                        <td>
                                                            <button onClick={() => navigate(`/order/${order._id}`)}>DETAILS</button>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <Paginate pages={pages} page={page} isAuth={true} />
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Profile

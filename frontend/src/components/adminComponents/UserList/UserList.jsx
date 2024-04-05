import React, { useEffect, useState } from 'react'
import './UserList.scss'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listUsers, deleteUser } from '../../../actions/userActions'
import Loader from '../../sharedComponents/Loader/Loader'
import Message from '../../sharedComponents/Message/Message'
import Paginate from '../../sharedComponents/Paginate/Paginate'

const UserList = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const [userKeyword, setUserKeyword] = useState('');
    const [order, setOrder] = useState('');

    const keyword = searchParams.get('keyword');
    const pageQuery = searchParams.get('page');

    const userList = useSelector(state => state.userList);
    const { loading, error, users, page, pages, message } = userList;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const userDelete = useSelector(state => state.userDelete);
    const { success: successDelete } = userDelete;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers(userKeyword, pageQuery, order));
        } else {
            navigate('/login');
        }
    }, [dispatch, navigate, successDelete, userInfo, pageQuery, keyword, order]);

    const deleteHandler = (id) => {
        if (window.confirm('Delete this user?')) {
            dispatch(deleteUser(id));
        };
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (userKeyword) {
            navigate(`${location.pathname}?keyword=${userKeyword}&page=1`);
        } else {
            navigate(location.pathname);
        };
    };

    const orderHandler = (newOrder) => {
        setOrder(prevOrder =>
            prevOrder === newOrder ? `-${newOrder}` : newOrder
        );
    };

    return (
        <div className='userlist'>
            <h1>Users</h1>
            <hr />

            {loading ?
                <Loader /> :
                error ? <Message bgcolor='#ca7e7e' txtcolor='#fff'>{error}</Message> :
                    users.length !== 0 ?
                        (
                            <>
                                <form onSubmit={submitHandler}>
                                    <input type="text" placeholder="Search.." onChange={(e) => setUserKeyword(e.target.value)}></input>
                                </form>

                                <div className='users-table-container'>
                                    <table className="users-table">
                                        <thead>
                                            <tr>
                                                <th onClick={() => orderHandler('id')}>ID</th>
                                                <th onClick={() => orderHandler('first_name')}>NAME</th>
                                                <th onClick={() => orderHandler('email')}>EMAIL</th>
                                                <th onClick={() => orderHandler('is_staff')}>ADMIN</th>
                                                <th></th>
                                                <th></th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                users.map(user => (
                                                    <tr key={user._id}>
                                                        <td>{user._id}</td>
                                                        <td>{user.name}</td>
                                                        <td>{user.email}</td>
                                                        <td>
                                                            {user.isAdmin ?
                                                                <i className='fas fa-check' style={{ color: 'green' }}></i> :
                                                                <i className='fas fa-times' style={{ color: 'red' }}></i>
                                                            }
                                                        </td>
                                                        <td>
                                                            <button className='edit' onClick={() => navigate(`/admin/user/${user._id}/edit`)}>
                                                                <i className='fas fa-edit'></i>
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <button className='delete' onClick={() => deleteHandler(user._id)}>
                                                                <i className='fas fa-trash'></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <Paginate pages={pages} page={page} isAdmin={true} adminmenu={'user'} />
                            </>
                        ) : (
                            <Message bgcolor='#ca7e7e' txtcolor='#fff'>{message}</Message>
                        )
            }
        </div>
    )
}

export default UserList

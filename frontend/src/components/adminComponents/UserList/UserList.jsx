import React, { useEffect } from 'react'
import './UserList.scss'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listUsers, deleteUser } from '../../../actions/userActions'
import Loader from '../../sharedComponents/Loader/Loader'
import Message from '../../sharedComponents/Message/Message'
import Paginate from '../../sharedComponents/Paginate/Paginate'

const UserList = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const pageQuery = searchParams.get('page');

    const userList = useSelector(state => state.userList);
    const { loading, error, users, page, pages } = userList;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const userDelete = useSelector(state => state.userDelete);
    const { success: successDelete } = userDelete;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers(pageQuery));
        } else {
            navigate('/login');
        }
    }, [dispatch, navigate, successDelete, userInfo, pageQuery]);

    const deleteHandler = (id) => {
        if (window.confirm('Delete this user?')) {
            dispatch(deleteUser(id));
        };
    };

    return (
        <div className='userlist'>
            <h1>Users</h1>
            <hr />

            {loading ?
                <Loader /> :
                error ? <Message bgcolor='#ca7e7e' txtcolor='#fff'>{error}</Message> :
                    (
                        <>
                            <div className='users-table-container'>
                                <table className="users-table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>NAME</th>
                                            <th>EMAIL</th>
                                            <th>ADMIN</th>
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
                    )
            }
        </div>
    )
}

export default UserList

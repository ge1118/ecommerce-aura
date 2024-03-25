import React, { useEffect, useState } from 'react'
import './UserEdit.scss'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../sharedComponents/Loader/Loader'
import Message from '../../sharedComponents/Message/Message'
import { getUserDetails, updateUser } from '../../../actions/userActions'
import { USER_UPDATE_RESET } from '../../../constants/userConstants'


const UserEdit = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userDetails = useSelector(state => state.userDetails);
    const { error, loading, user } = userDetails;

    const userUpdate = useSelector(state => state.userUpdate);
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = userUpdate;

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET });
            navigate('/admin/userlist');
        } else {
            if (!user.name || user._id !== Number(id)) {
                dispatch(getUserDetails(id));
            } else {
                setName(user.name);
                setEmail(user.email);
                setIsAdmin(user.isAdmin);
            };
        };
    }, [navigate, successUpdate, user, id]);

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(updateUser({
            _id: user._id,
            name,
            email,
            isAdmin,
        }));
    };

    return (
        <div className='useredit'>
            <h1>User Edit</h1>
            <hr />

            <Link to='/admin/userlist'>Go Back</Link>

            {loadingUpdate && <Loader />}
            {errorUpdate && <Message bgcolor='#ca7e7e' txtcolor='#fff'>{error}</Message>}

            {
                loading ? <Loader />
                    : error ? (
                        <Message bgcolor='#ca7e7e' txtcolor='#fff'>{error}</Message>
                    ) : (
                        <form className="user-edit-form" onSubmit={submitHandler}>
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

                            <div className="isAdmin">
                                <input
                                    type="checkbox"
                                    name="isAdmin"
                                    id="isAdmin"
                                    checked={isAdmin}
                                    onChange={(e) => setIsAdmin(e.target.checked)}
                                    className='checkbox'
                                />
                                <label htmlFor="isAdmin">Admin User</label>
                            </div>

                            <button type="submit">Update</button>
                        </form>
                    )
            }
        </div>
    )
}

export default UserEdit

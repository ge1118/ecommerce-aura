import React, { useEffect, useState } from 'react'
import './UserEdit.scss'
import { Link, useNavigate, useParams, useBlocker } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../sharedComponents/Loader/Loader'
import Message from '../../sharedComponents/Message/Message'
import { getUserDetails, updateUser } from '../../../actions/userActions'
import { USER_DETAILS_RESET, USER_UPDATE_RESET } from '../../../constants/userConstants'


const UserEdit = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [prevPath, setPrevPath] = useState('');

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userDetails = useSelector(state => state.userDetails);
    const { error, loading, user } = userDetails;

    const userUpdate = useSelector(state => state.userUpdate);
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = userUpdate;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const blocker = useBlocker(
        ({ currentLocation, nextLocation }) =>
            !isUpdating &&
            currentLocation.pathname !== nextLocation.pathname
    );


    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/login');
        }

        if (error) {
            if (blocker.state === "blocked") {
                blocker.proceed();
            }
        }

        const handleBeforeUnload = e => {
            e.preventDefault();
            e.returnValue = '';
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        if (!error) {
            if (blocker.state === "blocked") {
                if (window.confirm('Changes you made may not be saved.')) {
                    blocker.proceed();
                } else {
                    blocker.state = 'blocked'
                };
            };

            if (blocker.state === 'proceeding') {
                setTimeout(() => {
                    navigate('/admin/userlist')
                }, 150);
            };

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
        };

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            if (error) {
                dispatch({ type: USER_DETAILS_RESET })
            }
        };
    }, [navigate, successUpdate, user, id, error, blocker]);

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
            {errorUpdate && <Message bgcolor='#ca7e7e' txtcolor='#fff'>{errorUpdate}</Message>}

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

                            <button type="submit" onClick={() => setIsUpdating(true)}> Update</button>
                        </form>
                    )
            }
        </div >
    )
}

export default UserEdit

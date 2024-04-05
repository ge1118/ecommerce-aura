import React, { useEffect, useState } from 'react'
import './OrderList.scss'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../sharedComponents/Loader/Loader'
import Message from '../../sharedComponents/Message/Message'
import { listOrders } from '../../../actions/orderActions'
import Paginate from '../../sharedComponents/Paginate/Paginate'

const OrderList = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const [userKeyword, setUserKeyword] = useState('');
    const [order, setOrder] = useState('');

    const keyword = searchParams.get('keyword');
    const pageQuery = searchParams.get('page');

    const orderList = useSelector(state => state.orderList);
    const { loading, error, orders, page, pages, message } = orderList;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders(userKeyword, pageQuery, order));
        } else {
            navigate('/login');
        }
    }, [dispatch, navigate, userInfo, pageQuery, keyword, order]);

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
        <div className='orderlist'>
            <h1>Orders</h1>
            <hr />

            <form onSubmit={submitHandler}>
                <input type="text" placeholder="Search.." onChange={(e) => setUserKeyword(e.target.value)}></input>
            </form>

            {loading ?
                <Loader /> :
                error ? <Message bgcolor='#ca7e7e' txtcolor='#fff'>{error}</Message> :
                    orders.length !== 0 ?
                        (
                            <>
                                <div className='orders-table-container'>
                                    <table className="orders-table">
                                        <thead>
                                            <tr>
                                                <th onClick={() => orderHandler('_id')}>ID</th>
                                                <th onClick={() => orderHandler('user')}>USER</th>
                                                <th onClick={() => orderHandler('createdAt')}>DATE</th>
                                                <th onClick={() => orderHandler('totalPrice')}>TOTAL</th>
                                                <th onClick={() => orderHandler('paidAt')}>PAID</th>
                                                <th onClick={() => orderHandler('deliveredAt')}>DELIVERED</th>
                                                <th></th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                orders.map(order => (
                                                    <tr key={order._id}>
                                                        <td>{order._id}</td>
                                                        <td>{order.user && order.user.name}</td>
                                                        <td>{order.createdAt.substring(0, 10)}</td>
                                                        <td>${order.totalPrice}</td>
                                                        <td>
                                                            {order.isPaid ?
                                                                order.paidAt.substring(0, 10) :
                                                                <i className='fas fa-times' style={{ color: 'red' }}></i>
                                                            }
                                                        </td>
                                                        <td>
                                                            {order.isDelivered ?
                                                                order.deliveredAt.substring(0, 10) :
                                                                <i className='fas fa-times' style={{ color: 'red' }}></i>
                                                            }
                                                        </td>
                                                        <td>
                                                            <button onClick={() => navigate(`/order/${order._id}`)}>Detail</button>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <Paginate pages={pages} page={page} isAdmin={true} adminmenu={'order'} />
                            </>
                        ) : (
                            <Message bgcolor='#ca7e7e' txtcolor='#fff'>{message}</Message>
                        )
            }
        </div>
    )
}

export default OrderList

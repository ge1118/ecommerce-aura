import React, { useEffect } from 'react'
import './OrderList.scss'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../sharedComponents/Loader/Loader'
import Message from '../../sharedComponents/Message/Message'
import { listOrders } from '../../../actions/orderActions'
import Paginate from '../../sharedComponents/Paginate/Paginate'

const OrderList = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const pageQuery = searchParams.get('page');

    const orderList = useSelector(state => state.orderList);
    const { loading, error, orders, page, pages } = orderList;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders(pageQuery));
        } else {
            navigate('/login');
        }
    }, [dispatch, navigate, userInfo, pageQuery]);

    return (
        <div className='orderlist'>
            <h1>Orders</h1>
            <hr />

            {loading ?
                <Loader /> :
                error ? <Message bgcolor='#ca7e7e' txtcolor='#fff'>{error}</Message> :
                    (
                        <>
                            <table className="orders-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>USER</th>
                                        <th>DATE</th>
                                        <th>TOTAL</th>
                                        <th>PAID</th>
                                        <th>DELIVERED</th>
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
                            <Paginate pages={pages} page={page} isAdmin={true} adminmenu={'order'} />
                        </>
                    )
            }
        </div>
    )
}

export default OrderList

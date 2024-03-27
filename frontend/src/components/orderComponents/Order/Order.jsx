import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { PayPalButton } from 'react-paypal-button-v2'
import { getOrderDetails, payOrder, deliverOrder } from '../../../actions/orderActions'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../../../constants/orderConstants'
import './Order.scss'
import Loader from '../../sharedComponents/Loader/Loader'
import Message from '../../sharedComponents/Message/Message'

const Order = () => {

    let { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [sdkReady, setSdkReady] = useState(false);
    const [itemsPrice, setItemsPrice] = useState(0);

    const orderDetails = useSelector(state => state.orderDetails);
    const { order, error, loading } = orderDetails;

    const orderPay = useSelector(state => state.orderPay);
    const { loading: loadingPay, success: successPay } = orderPay;

    const orderDeliver = useSelector(state => state.orderDeliver);
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const addPayPalScript = () => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://www.paypal.com/sdk/js?client-id=${import.meta.env.VITE_PAYPAL_CLIENT_ID}&components=buttons`;
        script.async = true;
        script.onload = () => {
            setSdkReady(true);
        };
        document.body.appendChild(script);
    };

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        };
        if (!loading && !error) {
            setItemsPrice(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2));
        };
        if (!order || successPay || successDeliver || order._id !== Number(id)) {
            dispatch({ type: ORDER_PAY_RESET });
            dispatch({ type: ORDER_DELIVER_RESET });
            dispatch(getOrderDetails(id));
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript();
            } else {
                setSdkReady(true);
            };
        };
    }, [dispatch, order, id, successPay, successDeliver])

    const successPaymentHandler = (paymentMethod) => {
        dispatch(payOrder(id, paymentMethod));
    };

    const DeliverHandler = () => {
        dispatch(deliverOrder(order));
    };

    return loading ? (
        <Loader />
    ) : error ? (
        <Message bgcolor='#ca7e7e' txtcolor='#fff'>{error}</Message>
    ) : (
        <div className='order'>
            <h1>Order Details</h1>
            <hr />

            <div className="order-info">
                <div className="order-details">
                    <div className="shipping">
                        <h2>Shipping</h2>
                        <hr />

                        <p>Name: {order.user.name}</p>
                        <p>Email: <a href={`mailto:${order.user.email}`}> {order.user.email} </a></p>
                        <p>Address: {order.shippingAddress.address}, {order.shippingAddress.city}
                            {' '}
                            {order.shippingAddress.postalCode},
                            {' '}
                            {order.shippingAddress.country}</p>

                        {
                            order.isDelivered ? (
                                <Message bgcolor='#70a873' txtcolor='#fff'>Delivered on {order.deliveredAt.substring(0, 10)}</Message>
                            ) : (
                                <Message bgcolor='#ca7e7e' txtcolor='#fff'>Not Delivered</Message>
                            )
                        }
                    </div>

                    <div className="payment">
                        <h2>Payment</h2>
                        <hr />

                        <p>Method: {order.paymentMethod}</p>


                        {
                            order.isPaid ? (
                                <Message bgcolor='#70a873' txtcolor='#fff'>Paid on {order.paidAt.substring(0, 10)}</Message>
                            ) : (
                                <Message bgcolor='#ca7e7e' txtcolor='#fff'>Not Paid</Message>
                            )
                        }
                    </div>

                    <div className="orderitems">
                        <h2>Order Items</h2>
                        <hr />

                        {order.orderItems.length === 0 ?
                            <Message bgcolor='#ca7e7e' txtcolor='#fff'>
                                Order Is Empty
                            </Message> : (
                                <div className="items">
                                    {order.orderItems.map((item, i) => (
                                        <div className="item" key={i}>
                                            <div>
                                                <img src={item.image} alt={item.name}></img>
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </div>

                                            <p>{item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                    </div>
                </div>

                <div className="order-summary">
                    <h2>Order Summary</h2>
                    <hr />

                    <div>
                        <h3>Items:</h3>
                        <p>${itemsPrice}</p>
                    </div>

                    <div>
                        <h3>Shipping:</h3>
                        <p>${order.shippingPrice}</p>
                    </div>

                    <div>
                        <h3>Tax:</h3>
                        <p>${order.taxPrice}</p>
                    </div>

                    <div>
                        <h3>Total:</h3>
                        <p>${order.totalPrice}</p>
                    </div>

                    <hr />

                    {
                        !order.isPaid && (
                            <div className='paypal'>
                                {
                                    loadingPay && <Loader />
                                }
                                {
                                    !sdkReady ? <Loader /> : (
                                        <PayPalButton
                                            amount={order.totalPrice}
                                            onSuccess={successPaymentHandler}
                                        />
                                    )
                                }
                            </div>
                        )
                    }

                    {loadingDeliver && <Loader />}

                    {
                        userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                            <button onClick={DeliverHandler} >
                                Mark As Delivered
                            </button>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Order

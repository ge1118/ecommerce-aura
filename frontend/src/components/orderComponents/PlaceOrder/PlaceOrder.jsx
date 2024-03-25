import React, { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../sharedComponents/Message/Message'
import { createOrder } from '../../../actions/orderActions'
import { ORDER_CREATE_RESET } from '../../../constants/orderConstants'
import './PlaceOrder.scss'
import CheckoutSteps from '../../sharedComponents/CheckoutSteps/CheckoutSteps'

const PlaceOrder = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector(state => state.cart);
    const orderCreate = useSelector(state => state.orderCreate);
    const { order, error, success } = orderCreate;

    const itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);
    const shippingPrice = (itemsPrice > 100 ? 0 : 25).toFixed(2);
    const taxPrice = ((0.13) * itemsPrice).toFixed(2);
    const totalPrice = (Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2);

    useEffect(() => {
        if (!cart.paymentMethod) {
            navigate('/payment');
        };
        if (success) {
            navigate(`/order/${order._id}`);
            dispatch({ type: ORDER_CREATE_RESET });
        };
    }, [success, navigate])

    const placeOrder = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: itemsPrice,
            shippingPrice: shippingPrice,
            taxPrice: taxPrice,
            totalPrice: totalPrice,
        }));
    };

    return (
        <div className='placeorder'>
            <h1>Checkout</h1>
            <hr />

            <CheckoutSteps step1 step2 step3 step4 />

            <div className="order-info">
                <div className="order-details">
                    <div className="shipping">
                        <h2>Shipping</h2>
                        <hr />

                        <p>Address: {cart.shippingAddress.address}, {cart.shippingAddress.city}
                            {' '}
                            {cart.shippingAddress.postalCode},
                            {' '}
                            {cart.shippingAddress.country}</p>
                    </div>

                    <div className="payment">
                        <h2>Payment</h2>
                        <hr />

                        <p>Method: {cart.paymentMethod}</p>
                    </div>

                    <div className="orderitems">
                        <h2>Review Items</h2>
                        <hr />

                        {cart.cartItems.length === 0 ?
                            <Message bgcolor='#ca7e7e' txtcolor='#fff'>
                                Your Cart Is Empty
                            </Message> : (
                                cart.cartItems.map((item, i) => (
                                    <div className="item" key={i}>
                                        <img src={item.image} alt={item.name}></img>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>

                                        <p>{item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}</p>
                                    </div>
                                ))
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
                        <p>${shippingPrice}</p>
                    </div>

                    <div>
                        <h3>Tax:</h3>
                        <p>${taxPrice}</p>
                    </div>

                    <div>
                        <h3>Total:</h3>
                        <p>${totalPrice}</p>
                    </div>

                    <hr />

                    <button disabled={cart.cartItems === 0} onClick={placeOrder}>Place Your Order</button>
                </div>
            </div>
        </div>
    )
}

export default PlaceOrder

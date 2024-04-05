import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../../../actions/cartActions'
import './Payment.scss'
import CheckoutSteps from '../../sharedComponents/CheckoutSteps/CheckoutSteps'

const Payment = () => {

    const cart = useSelector(state => state.cart);
    const { cartItems, shippingAddress } = cart;

    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    if (!shippingAddress.address) {
        navigate('/shipping');
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder');
    };

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        }
        if (cartItems.length === 0) {
            navigate('/cart')
        }
    })

    return (
        <div className='payment'>
            <h1>Payment Method</h1>
            <hr />

            <CheckoutSteps step1 step2 step3 />

            <form className="options" onSubmit={submitHandler}>
                <div className="option">
                    <input
                        type="radio"
                        value='Credit or Debit Card'
                        id='creditdebit'
                        name='payment'
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        disabled
                    />
                    <label htmlFor="creditdebit">Credit or Debit Card</label>
                </div>

                <div className="option">
                    <input
                        type="radio"
                        value='PayPal'
                        id='paypal'
                        name='payment'
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        checked />
                    <label htmlFor="paypal">PayPal</label>
                </div>

                <button>Continue</button>
            </form>
        </div>
    )
}

export default Payment

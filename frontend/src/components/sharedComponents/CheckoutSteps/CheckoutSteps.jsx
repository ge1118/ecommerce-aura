import React from 'react'
import './CheckoutSteps.scss'
import { Link } from 'react-router-dom'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <div className='checkoutsteps'>
            {
                step1 ? (
                    <Link to="/login">Login</Link>
                ) : (
                    <p>Login</p>
                )
            }
            &gt;
            {
                step2 ? (
                    <Link to="/shipping">Shipping</Link>
                ) : (
                    <p>Shipping</p>
                )
            }
            &gt;
            {
                step3 ? (
                    <Link to="/payment">Payment</Link>
                ) : (
                    <p>Payment</p>
                )
            }
            &gt;
            {
                step4 ? (
                    <Link to="/placeorder">Place Order</Link>
                ) : (
                    <p>Place Order</p>
                )
            }
        </div>
    )
}

export default CheckoutSteps

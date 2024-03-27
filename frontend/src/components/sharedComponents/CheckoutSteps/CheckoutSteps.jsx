import React, { useEffect, useState } from 'react'
import './CheckoutSteps.scss'
import { Link } from 'react-router-dom'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {

    const [isNarrow, setIsNarrow] = useState();

    useEffect(() => {
        const handleResize = () => {
            setIsNarrow(window.innerWidth <= 600);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className='checkoutsteps'>
            {
                step1 ? (
                    <Link to="/login">Login</Link>
                ) : (
                    <p>Login</p>
                )
            }
            {
                isNarrow ?
                    <i className="fa-solid fa-angle-down" /> :
                    <i className="fa-solid fa-angle-right" />
            }
            {
                step2 ? (
                    <Link to="/shipping">Shipping</Link>
                ) : (
                    <p>Shipping</p>
                )
            }
            {
                isNarrow ?
                    <i className="fa-solid fa-angle-down" /> :
                    <i className="fa-solid fa-angle-right" />
            }
            {
                step3 ? (
                    <Link to="/payment">Payment</Link>
                ) : (
                    <p>Payment</p>
                )
            }
            {
                isNarrow ?
                    <i className="fa-solid fa-angle-down" /> :
                    <i className="fa-solid fa-angle-right" />
            }
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

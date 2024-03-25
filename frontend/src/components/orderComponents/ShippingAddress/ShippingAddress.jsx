import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../../../actions/cartActions'
import './ShippingAddress.scss'
import CheckoutSteps from '../../sharedComponents/CheckoutSteps/CheckoutSteps'

const ShippingAddress = () => {

    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        navigate('/payment');
    };

    return (
        <div className='shippingaddress'>
            <h1>Shipping Address</h1>
            <hr />

            <CheckoutSteps step1 step2 />

            <form className="register-form" onSubmit={submitHandler}>
                <label>Address</label>
                <input
                    type="text"
                    name='address'
                    value={address ? address : ''}
                    onChange={(e) => setAddress(e.target.value)}
                />

                <label>City</label>
                <input
                    type="text"
                    name='city'
                    value={city ? city : ''}
                    onChange={(e) => setCity(e.target.value)}
                />

                <label>Postal Code</label>
                <input
                    type="text"
                    name='postalcode'
                    value={postalCode ? postalCode : ''}
                    onChange={(e) => setPostalCode(e.target.value)}
                />

                <label>Country</label>
                <input
                    type="text"
                    name='country'
                    value={country ? country : ''}
                    onChange={(e) => setCountry(e.target.value)} />

                <button type="submit">Continue</button>
            </form>
        </div>
    )
}

export default ShippingAddress

import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../sharedComponents/Message/Message'
import { addToCart, removeFromCart, showCartItems } from '../../../actions/cartActions'
import './Cart.scss'

const Cart = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const saveCartItemId = useSelector(state => state.saveCartItemId);
    const { itemId } = saveCartItemId;

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    useEffect(() => {
        if (itemId) {
            itemId.map(item => {
                dispatch(showCartItems(item.product, item.qty));
            });
        };
    }, [itemId, dispatch]);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
        navigate('/login?redirect=/shipping');
    };

    return (
        <div className='cart'>
            <h1>Shopping cart</h1>
            <hr />

            <table>
                <thead>
                    <tr>
                        <th width='70%'>Item</th>
                        <th width='10%'>Price</th>
                        <th width='10%'>Qty</th>
                        <th width='10%'></th>
                    </tr>
                </thead>

                <tbody>
                    {
                        itemId.length === 0
                            ? (
                                <tr>
                                    <td>
                                        Your Cart Is Empty
                                    </td>
                                </tr>
                            )
                            : (
                                cartItems.map(item => (
                                    <tr key={item.product} className='item'>
                                        <td>
                                            <div className='item-name'>
                                                <img src={item.image} alt={item.name} />
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </div>
                                        </td>

                                        <td>${(item.price * item.qty).toFixed(2)}</td>

                                        <td>
                                            <div className="btn-group">
                                                <button
                                                    onClick={(e) =>
                                                        item.qty !== 1 ?
                                                            dispatch(addToCart(item.product, Number(item.qty - 1))) :
                                                            () => { }}>
                                                    <i className="fa-solid fa-minus"></i>
                                                </button>
                                                <input type="text" value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))} />
                                                <button onClick={(e) =>
                                                    item.qty !== item.countInStock ?
                                                        dispatch(addToCart(item.product, Number(item.qty + 1))) :
                                                        () => { }}>
                                                    <i className="fa-solid fa-plus"></i>
                                                </button>
                                            </div>
                                        </td>

                                        <td className='delete' onClick={() => removeFromCartHandler(item.product)}>
                                            <i className="fa-solid fa-x"></i>
                                        </td>
                                    </tr>
                                )))
                    }

                    <tr className='subtotal'>
                        <td>Subtotal:</td>
                        <td>${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</td>
                        <td>
                            <button onClick={checkoutHandler} disabled={cartItems.length === 0}>Checkout</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Cart

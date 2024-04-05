import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../sharedComponents/Message/Message'
import { addToCart, removeFromCart, showCartItems, mergeCartItems } from '../../../actions/cartActions'
import './Cart.scss'

const Cart = () => {

    const [isItemSoldOut, setIsItemSoldOut] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const saveCartItemId = useSelector(state => state.saveCartItemId);
    const { itemId } = saveCartItemId;

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) {
            dispatch(mergeCartItems(userInfo))
        }
    }, [dispatch, userInfo]);

    useEffect(() => {
        itemId.forEach(item => {
            dispatch(showCartItems(item.product, item.qty));
        });
    }, [dispatch, itemId]);

    useEffect(() => {
        const soldOut = cartItems && cartItems.some(cartItem =>
            typeof cartItem.countInStock !== 'number'
        );
        setIsItemSoldOut(soldOut);
        console.log(isItemSoldOut);
    }, [cartItems]);

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

            <div className='cart-items'>
                {
                    itemId.length === 0
                        ? (
                            <p>
                                Your Cart Is Empty
                            </p>
                        )
                        : (
                            cartItems.map(item => (
                                <div className='cart-item' key={item._id}>
                                    <div className='item-name'>
                                        <img src={item.image} alt={item.name} />
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </div>

                                    <div className='item-info'>
                                        <div>${(item.price * item.qty).toFixed(2)}</div>

                                        {
                                            (typeof item.countInStock !== 'number') ? (
                                                <p>This item is sold out</p>
                                            ) : (
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
                                            )
                                        }

                                        <button className='delete' onClick={() => removeFromCartHandler(item.product)}>
                                            <i className="fa-solid fa-x"></i>
                                        </button>
                                    </div>
                                </div>
                            ))
                        )
                }

                <div className='subtotal'>
                    <div>
                        <p>Subtotal:</p>
                        <p>${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</p>
                    </div>
                    <button onClick={checkoutHandler} disabled={cartItems.length === 0 || isItemSoldOut} >Checkout</button>
                </div>
            </div>
        </div>
    )
}

export default Cart

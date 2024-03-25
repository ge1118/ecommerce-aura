import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Rating from '../../sharedComponents/Rating/Rating'
import Loader from '../../sharedComponents/Loader/Loader'
import Message from '../../sharedComponents/Message/Message'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../../../actions/productActions.js'
import './Details.scss'
import { addToCart } from '../../../actions/cartActions.js'

const Details = () => {

    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const addToCartHandler = () => {
        dispatch(addToCart(id, qty));
        navigate(`/cart`);
    };

    return (
        <div className='details'>
            <div className="details-left">
                <img src={product.image} alt={product.name} />
            </div>

            <div className="details-right">
                <p className="title">{product.name}</p>
                <hr />

                <div className="right-body">
                    <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'black'} />

                    {
                        product.countInStock === 0 ?
                            <p className='price' style={{ fontWeight: 500 }}><strike style={{ color: 'grey' }}>${product.price}</strike> Sold Out</p> :
                            product.onSale ?
                                <p className='price' style={{ fontWeight: 500 }}><strike style={{ color: 'grey' }}>${product.price}</strike> ${product.salePrice}</p> :
                                <p className='price'>${product.price}</p>
                    }

                    <p style={{ whiteSpace: 'pre-wrap' }}>{product.description}</p>

                    <div className="btn-group">
                        <button
                            onClick={(e) => setQty(prevQty => Math.max(prevQty - 1, 1))}
                            disabled={product.countInStock === 0}
                        ><i className="fa-solid fa-minus"></i>
                        </button>
                        <input
                            type="number"
                            value={product.countInStock === 0 ? 0 : qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                            disabled={product.countInStock === 0}
                        />
                        <button
                            onClick={(e) => setQty(prevQty => Math.min(prevQty + 1, product.countInStock))}
                            disabled={product.countInStock === 0}
                        ><i className="fa-solid fa-plus"></i>
                        </button>
                    </div>

                    <button
                        className='addToCart'
                        onClick={addToCartHandler}
                        disabled={product.countInStock === 0}
                    >Add to cart</button>
                </div>
            </div>
        </div>
    )
}

export default Details

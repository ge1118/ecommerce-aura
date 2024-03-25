import React from 'react'
import './Product.scss'
import Rating from '../Rating/Rating'
import { useNavigate } from 'react-router-dom'

const Product = ({ status, color, product }) => {

    const navigate = useNavigate();

    return (
        <div className='product' onClick={() => navigate(`/product/${product._id}`)}>
            {
                status && (
                    <div className='status' style={{ background: `${color}` }}>
                        <p>{status}</p>
                    </div>
                )
            }

            <img src={product.image} alt="lipstick" />
            <p>{product.name}</p>
            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
            {
                status == 'Sale' ?
                    <p><strike>$ {product.price}</strike>  $ {product.salePrice}</p> :
                    <p>$ {product.price}</p>
            }
        </div >
    )
}

export default Product

import React, { useEffect } from 'react'
import Loader from '../../sharedComponents/Loader/Loader'
import Message from '../../sharedComponents/Message/Message'
import { useDispatch, useSelector } from 'react-redux'
import { listTopProducts } from '../../../actions/productActions.js'
import './HomeProducts.scss'
import Product from '../../sharedComponents/Product/Product'

const HomeProducts = () => {

    const dispatch = useDispatch();

    const productTopRated = useSelector(state => state.productTopRated);
    const { loading, error, products } = productTopRated;

    useEffect(() => {
        dispatch(listTopProducts());
    }, [dispatch]);

    return (
        <div className='homeproducts'>
            <hr />
            <h1>Top Products</h1>
            <hr />
            {
                loading
                    ? <Loader />
                    : error
                        ? <Message bgcolor='#ca7e7e' txtcolor='#fff'>{error}</Message>
                        : (
                            <div className='topproducts'>
                                {products.map((product, i) => (
                                    <Product
                                        key={i}
                                        product={product}
                                        status={product.countInStock === 0 ?
                                            'Out of Stock' :
                                            product.onSale ?
                                                'Sale' :
                                                'New'}
                                        color={product.countInStock === 0 ?
                                            '#df4226' :
                                            product.onSale ?
                                                '#924a4d' :
                                                '#8b7569'} />
                                ))}
                            </div>
                        )
            }
        </div>
    )
}

export default HomeProducts

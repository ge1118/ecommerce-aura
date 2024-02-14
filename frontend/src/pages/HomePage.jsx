import React, { useEffect, useState } from 'react'
import Product from '../components/Product.jsx'
import Loader from '../components/Loader.jsx'
import Message from '../components/Message.jsx'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions.js'

const HomePage = () => {
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList)
    const { error, loading, products } = productList

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    return (
        <div>
            <h1>Latest Products</h1>
            {
                loading
                    ? <Loader />
                    : error
                        ? <Message variant='danger'>{error}</Message>
                        :
                        <Row>
                            {products.map((product, i) => (
                                <Col sm={12} md={6} lg={4} xl={3} key={i}>
                                    <Product product={product} />
                                </Col>
                            ))}
                        </Row>
            }
        </div>
    )
}

export default HomePage

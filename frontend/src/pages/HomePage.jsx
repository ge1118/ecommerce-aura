import React, { useEffect, useState } from 'react'
import Product from '../components/Product.jsx'
import Loader from '../components/Loader.jsx'
import Message from '../components/Message.jsx'
import Paginate from '../components/Paginate.jsx'
import ProductCarousel from '../components/ProductCarousel.jsx'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions.js'
import { useSearchParams } from 'react-router-dom'

const HomePage = ({ }) => {

    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    const productList = useSelector(state => state.productList)
    const { error, loading, products, page, pages } = productList

    const keyword = searchParams.get('keyword')
    const pageQuery = searchParams.get('page')

    useEffect(() => {
        dispatch(listProducts(keyword, pageQuery))
    }, [dispatch, keyword, pageQuery])

    return (
        <div>
            {!keyword && <ProductCarousel />}

            <h1>Latest Products</h1>
            {
                loading
                    ? <Loader />
                    : error
                        ? <Message variant='danger'>{error}</Message>
                        :
                        <div>
                            <Row>
                                {products.map((product, i) => (
                                    <Col sm={12} md={6} lg={4} xl={3} key={i}>
                                        <Product product={product} />
                                    </Col>
                                ))}
                            </Row>
                            <Paginate page={page} pages={pages} keyword={keyword} />
                        </div>
            }
        </div>
    )
}

export default HomePage

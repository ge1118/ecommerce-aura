import React from 'react'
import Product from '../components/Product.jsx'
import products from '../products.js'
import { Row, Col } from 'react-bootstrap'

const HomePage = () => {
    return (
        <div>
            <h1>Latest Products</h1>
            <Row>
                {products.map((product, i) => (
                    <Col sm={12} md={6} lg={4} xl={3} key={i}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default HomePage

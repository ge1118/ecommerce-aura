import React, { useEffect, useState } from 'react'
import Product from '../components/Product.jsx'
import { Row, Col } from 'react-bootstrap'
import axios from 'axios'

const HomePage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await axios.get('/api/products/');
            setProducts(data);
        }

        fetchProducts();
    }, [])

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

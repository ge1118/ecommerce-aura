import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Form = ({ children }) => {
    return (
        <div>
            <Container>
                <Row className='justify-content-md-center'>
                    <Col xs={12} md={6}>
                        {children}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Form

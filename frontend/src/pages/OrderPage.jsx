import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Card, Col, Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { PayPalButton } from 'react-paypal-button-v2'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails, payOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET } from '../constants/orderConstants'

const OrderPage = () => {

    let { id } = useParams();
    const dispatch = useDispatch()
    const [sdkReady, setSdkReady] = useState(false)
    const [itemsPrice, setItemsPrice] = useState(0)

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, error, loading } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay



    const addPayPalScript = () => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://www.paypal.com/sdk/js?client-id=AYIEHzUsQXr9V440zEqJqM36C0YEN1hKlnb4-m-E6w48D0rW0mubww7_Zxv1Dl_g7dwvdiUOQqlPdaDZ&components=buttons'
        script.async = true
        script.onload = () => {
            setSdkReady(true)
            console.log(sdkReady)
        }
        document.body.appendChild(script)
    }

    useEffect(() => {
        if (!loading && !error) {
            setItemsPrice(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2))
        }
        if (!order || successPay || order._id !== Number(id)) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch(getOrderDetails(id))
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
    }, [dispatch, order, id, successPay])

    const successPaymentHandler = (paymentMethod) => {
        dispatch(payOrder(id, paymentMethod))
    }


    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <div>
            <h1>Order: {id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p><strong>Name: </strong> {order.user.name}</p>
                            <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}> {order.user.email} </a></p>
                            <p>
                                <strong>Shipping: </strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city}
                                {'    '}
                                {order.shippingAddress.postalCode},
                                {'    '}
                                {order.shippingAddress.country}
                            </p>

                            {
                                order.isDelivered ? (
                                    <Message variant='success'>Delivered on {order.deliveredAt.substring(0, 10)}</Message>
                                ) : (
                                    <Message variant='warning'>Not Delivered</Message>
                                )
                            }
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>

                            {
                                order.isPaid ? (
                                    <Message variant='success'>Paid on {order.paidAt.substring(0, 10)}</Message>
                                ) : (
                                    <Message variant='warning'>Not Paid</Message>
                                )
                            }
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>

                            {order.orderItems.length === 0 ?
                                <Message variant='info'>
                                    Order Is Empty
                                </Message> : (
                                    <ListGroup variant='flush'>
                                        {order.orderItems.map((item, i) => (
                                            <ListGroup.Item key={i}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt={item.name} fluid rounded></Image>
                                                    </Col>

                                                    <Col>
                                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                    </Col>

                                                    <Col md={4}>
                                                        {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Items:</Col>
                                    <Col>${itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            {
                                !order.isPaid && (
                                    <ListGroup.Item>
                                        {
                                            loadingPay && <Loader />
                                        }
                                        {
                                            !sdkReady ? <Loader /> : (
                                                <PayPalButton
                                                    amount={order.totalPrice}
                                                    onSuccess={successPaymentHandler}
                                                />
                                            )
                                        }
                                    </ListGroup.Item>
                                )
                            }
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default OrderPage

import axios from 'axios'
import {
    CART_ADD_ITEM,
    CART_SHOW_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD,
    MERGE_CART_ITEMS,
} from '../constants/cartConstants'


export const addToCart = (id, qty) => async (dispatch, getState) => {
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: id,
            qty
        }
    })

    const { saveCartItemId: { itemId }, userLogin: { userInfo } } = getState()

    if (userInfo && userInfo.email) {
        const userCartKey = `cartItems_${userInfo.email}`
        localStorage.setItem(userCartKey, JSON.stringify(itemId))
    } else {
        localStorage.setItem('cartItems_generic', JSON.stringify(itemId))
    }
}


export const mergeCartItems = (userInfo) => async (dispatch, getState) => {
    dispatch({
        type: MERGE_CART_ITEMS,
        payload: userInfo
    })
}


export const showCartItems = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`)

    id = Number(id)
    qty = Number(qty)

    if (data.countInStock === 0) {
        dispatch({
            type: CART_SHOW_ITEM,
            payload: {
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.salePrice,
                countInStock: 'This item is sold out',
                qty
            },
        })
    } else {
        data.onSale ? (
            dispatch({
                type: CART_SHOW_ITEM,
                payload: {
                    product: data._id,
                    name: data.name,
                    image: data.image,
                    price: data.salePrice,
                    countInStock: data.countInStock,
                    qty
                },
            })) : (
            dispatch({
                type: CART_SHOW_ITEM,
                payload: {
                    product: data._id,
                    name: data.name,
                    image: data.image,
                    price: data.price,
                    countInStock: data.countInStock,
                    qty
                },
            })
        )
    }

    // localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}


export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id,
    })

    const { userLogin: { userInfo } } = getState()
    const cartKey = userInfo ? `cartItems_${userInfo.email}` : 'cartItems_generic'

    localStorage.setItem(cartKey, JSON.stringify(getState().saveCartItemId.itemId))
}


export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data,
    })

    localStorage.setItem('shippingAddress', JSON.stringify(data))
}


export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data,
    })

    localStorage.setItem('paymentMethod', JSON.stringify(data))
}
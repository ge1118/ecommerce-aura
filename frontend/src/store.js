import { configureStore, combineReducers } from '@reduxjs/toolkit'
// import thunk from 'redux-thunk'
import {
    productListReducer,
    productDetailsReducer,
    productDeleteReducer,
    productCreateReducer,
    productUpdateReducer,
    productUploadImageReducer,
    productReviewCreateReducer,
    productTopRatedReducer,
    productNewReducer,
    productReviewDeleteReducer,
} from './reducers/productReducers'
import {
    cartReducer,
    saveCartItemIdReducer,
} from './reducers/cartReducers'
import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer,
    userSubscribeReducer,
} from './reducers/userReducers'
import {
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    orderDeliverReducer,
    orderListMyReducer,
    orderListReducer,
} from './reducers/orderReducers'

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productUploadImage: productUploadImageReducer,
    productReviewCreate: productReviewCreateReducer,
    productTopRated: productTopRatedReducer,
    productNew: productNewReducer,
    productReviewDelete: productReviewDeleteReducer,

    saveCartItemId: saveCartItemIdReducer,
    cart: cartReducer,

    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    userSubscribe: userSubscribeReducer,

    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderDeliver: orderDeliverReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

const getCartItemForUser = (userInfo) => {
    if (userInfo && userInfo.email) {
        const key = `cartItems_${userInfo.email}`
        return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : []
    } else if (localStorage.getItem('cartItems_generic')) {
        return JSON.parse(localStorage.getItem('cartItems_generic'))
    }
    return []
}

// const cartItemFromStorage = localStorage.getItem('cartItemId')
//     ? JSON.parse(localStorage.getItem('cartItemId'))
//     : []

const cartItemFromStorage = getCartItemForUser(userInfoFromStorage)

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {}

const initialState = {
    saveCartItemId: { itemId: cartItemFromStorage },
    cart: {
        cartItems: [],
        shippingAddress: shippingAddressFromStorage
    },
    userLogin: { userInfo: userInfoFromStorage },
}

export default function configureAppStore() {
    const store = configureStore({
        reducer: reducer,
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware(),
        preloadedState: initialState,
    })

    return store
}
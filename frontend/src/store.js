import { configureStore, combineReducers } from '@reduxjs/toolkit'
// import thunk from 'redux-thunk'
// import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, productDetailsReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'


const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
})

const cartItemFromStorage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : []

const initialState = {
    cart: { cartItems: cartItemFromStorage }
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
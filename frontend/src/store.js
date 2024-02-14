import { configureStore, combineReducers } from '@reduxjs/toolkit'
// import thunk from 'redux-thunk'
// import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, productDetailsReducer } from './reducers/productReducers'


const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
})

const initialState = {}

export default function configureAppStore(preloadedState) {
    const store = configureStore({
        reducer: reducer,
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware(),
        preloadedState,
    })

    return store
}
import {
    CART_ADD_ITEM,
    CART_SHOW_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD,
    CART_CLEAR_ITEMS,
    MERGE_CART_ITEMS
} from '../constants/cartConstants'

export const saveCartItemIdReducer = (state = { itemId: [] }, action) => {
    switch (action.type) {
        case MERGE_CART_ITEMS:
            const userInfo = action.payload

            const genericCartItems = JSON.parse(localStorage.getItem('cartItems_generic')) || []
            const userCartKey = `cartItems_${userInfo.email}`
            const userCartItems = JSON.parse(localStorage.getItem(userCartKey)) || []

            const mergedCartItems = [...userCartItems]
            genericCartItems.forEach(genericItem => {
                const existingItemIndex = mergedCartItems.findIndex(userItem => userItem.product === genericItem.product);
                if (existingItemIndex === -1) {
                    mergedCartItems.push(genericItem)
                } else {
                    mergedCartItems[existingItemIndex] = {
                        ...mergedCartItems[existingItemIndex],
                        qty: genericItem.qty
                    }
                };
            });

            localStorage.removeItem('cartItems_generic');
            localStorage.setItem(userCartKey, JSON.stringify(mergedCartItems));

            return {
                ...state,
                itemId: mergedCartItems
            }

        case CART_ADD_ITEM:
            const item = action.payload
            const isExist = state.itemId.find(x => x.product == item.product)

            if (isExist) {
                return {
                    ...state,
                    itemId: state.itemId.map(x =>
                        x.product === isExist.product ? item : x)
                }
            } else {
                return {
                    ...state,
                    itemId: [...state.itemId, item]
                }
            }

        case CART_REMOVE_ITEM:
            return {
                ...state,
                itemId: state.itemId.filter(x => x.product != action.payload)
            }

        case CART_CLEAR_ITEMS:
            return {
                ...state,
                itemId: []
            }

        default:
            return state
    }
}

export const cartReducer = (state = { cartItems: [], shippingAddress: {} }, action) => {
    switch (action.type) {
        case CART_SHOW_ITEM:
            const item = action.payload
            const isExist = state.cartItems.find(x => x.product == item.product)

            if (isExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.product === isExist.product ? item : x)
                }
            } else {
                const newCartItems = [...state.cartItems, item].sort((a, b) => a.product - b.product);
                return {
                    ...state,
                    cartItems: newCartItems
                }
            }

        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.product != action.payload)
            };

        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload
            }

        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
            }

        case CART_CLEAR_ITEMS:
            return {
                ...state,
                cartItems: []
            }

        default:
            return state
    }
}
import {configureStore, combineReducers, getDefaultMiddleware} from '@reduxjs/toolkit'
import authReducer from './Slice/authSlice'
import productReducer from './Slice/ProductSlice'
import filterReducer  from './Slice/filterSlice'
import cartReducer  from './Slice/cartSlice'
import checkoutReducer  from './Slice/cartSlice'

// const rootReducer = combineReducers({
//     auth: authReducer,
//     product: productReducer,
//     filter: filterReducer,
//     cart: cartReducer,
//     checkout: checkoutReducer,
    

// }
// )

const store = configureStore({
    // reducer: rootReducer,
    reducer: {
        auth: authReducer,
        product: productReducer,
        filter: filterReducer,
        cart: cartReducer,
        checkout: checkoutReducer,
        
    

    },
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
        serializableCheck:false,
    }),
})

export default store
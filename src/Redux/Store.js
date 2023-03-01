import {configureStore, combineReducers, getDefaultMiddleware} from '@reduxjs/toolkit'
import authReducer from './Slice/authSlice'
import productReducer from './Slice/ProductSlice'
import filterReducer  from './Slice/filterSlice'

const rootReducer = combineReducers({
    auth: authReducer,
    product: productReducer,
    filter: filterReducer,

}
)

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
        serializableCheck:false,
    }),
})

export default store
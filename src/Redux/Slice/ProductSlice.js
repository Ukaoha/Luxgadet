import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    products: [], 
    minPrice: null,
    maxPrice: null , 

}

const productSlice = createSlice({
    name: 'product' , 
    initialState, 
    reducers: {
        STORE_PRODUCTS(state , action){
            // console.log(action.payload)
            state.products = action.payload.products;
        },
        GET_PRICE_RANGE(state, action) {
            console.log(action.payload); 
            const {products} = action.payload;
            const arry = []
            products.map((product) => {
                const price = product.price
                return arry.push(price)
            })
            const max = Math.max(...arry)
            const min = Math.min(...arry)

            state.minPrice = min;
            state.maxPrice = max;

        }
    },

});



export const {STORE_PRODUCTS, GET_PRICE_RANGE}  = productSlice.actions;

export const selectProducts = (state) => state.product.
products
export const selectMinPrice = (state) => state.product.
price
export const selectMaxPrice = (state) => state.product.
price

export default productSlice.reducer
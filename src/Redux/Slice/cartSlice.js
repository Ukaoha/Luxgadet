import { createSlice} from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    cartTotalQuantity: 0,
    // cartTotalAmount: 0,
    cartTotalAmount: 0, // initialize cartTotalAmount to 0
    previousUrl: '',
  }
  

const cartSlice = createSlice({
    name: 'auth' , 
    initialState, 
    reducers: {
        ADD_TO_CART: (state , action) => {
            const productIndex = state.cartItems.findIndex((item) => item.id === action.payload.id)

            if(productIndex >= 0 ) {
                // item already exits in the cart , increase the cart quantitly
                state.cartItems[productIndex].cartQuantity += 1
                toast.info(`${action.payload.name}  increased by 1 `)

            } else{

                const temProduct = {...action.payload , cartQuantity: 1}
                state.cartItems.push(temProduct)
                toast.success(`${action.payload.name}  addedd to cart successsfully `)

            }



            // save cart to localstorage
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))

        },
        DECREASE_CART: (state , action) => {
            const productIndex = state.cartItems.findIndex((item) => item.id === action.payload.id)

            if(state.cartItems[productIndex].cartQuantity > 1 ){
                state.cartItems[productIndex].cartQuantity -= 1
                toast.info(`${action.payload.name}  decreased by 1 `)


            }else if (state.cartItems[productIndex].cartQuantity === 1 ){
                const newCartItem = state.cartItems.filter((item) => item.id !== action.payload.id)
                state.cartItems = newCartItem
                toast.success(`${action.payload.name}  removed from  cart successsfully `)


            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))



        },
        REMOVE_FROM_CART:(state,action) => {
            const newCartItem = state.cartItems.filter((item) => item.id !== action.payload.id)
            state.cartItems = newCartItem
            toast.success(`${action.payload.name}  removed frrom cart successsfully `)

            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))



        },
        CLEAR_CART:(state,action) => {
            state.cartItems = []
            toast.info(`cart cleard successsfully `)

            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))


        }, 
        CALCULATE_SUBTOTAL:(state , action) => {
            const arry = []
            state.cartItems.map((item) => {
                const {price, cartQuantity} = item
                const  cartItemAmount =  price * cartQuantity
        

                return arry.push(cartItemAmount)
            })

            const totalAmount = arry.reduce((a , b) => {
                return a + b
            }, 0)

            state.cartTotalAmount = totalAmount

            // .toLocaleString('en-US', {
            //     style: 'currency',
            //     currency: 'NGN'
            //   });
            // state.cartTotalAmount = totalAmount
            


            console.log('cartTotalAmount:', state.cartTotalAmount)


            

        },
        
        CALCULATE_TOTAL_QUANTITY:(state , action) => {
            const arry = []
            state.cartItems.map((item) => {
                const { cartQuantity} = item
                const quantity = cartQuantity
                return arry.push(quantity)
            })
        
            const totalQuantity = arry.reduce((a , b) => {
                return a + b
            }, 0)
            state.cartTotalQuantity = totalQuantity;
        },
        SAVE_URL(state, action) {
            state.previousUrl = action.payload
        },

        


    },

})

export const {ADD_TO_CART , DECREASE_CART, REMOVE_FROM_CART, CLEAR_CART, CALCULATE_SUBTOTAL, CALCULATE_TOTAL_QUANTITY , SAVE_URL} = cartSlice.actions
export const selectCartItems = (state) => state.cart.cartItems
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity
export const selectCartToatalAmount = (state) => state.cart.cartTotalAmount
export const selectPreviousUrl  = (state) => state.cart.previousUrl





export default cartSlice.reducer
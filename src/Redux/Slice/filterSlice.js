// import { createSlice} from "@reduxjs/toolkit";

// const initialState = {
//     filteredProducts: [],

// }

// const filterSlice = createSlice({
//     name: 'filter' , 
//     initialState, 
//     reducers: {
//         FILTER_BY_SEARCH(state , action){
//             console.log(action.payload)
//             const {products , search} = action.payload
//             const tempProducts = products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()) ||
//              product.category.toLowerCase().includes(search.toLowerCase()) )

//              state.filteredProducts = tempProducts
//         },
//     },

// });



// export const {FILTER_BY_SEARCH}  = filterSlice.actions;

// export const selectfilteredProducts = (state) => state.filter.filteredProducts

// export default filterSlice.reducer


import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProducts: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_BY_SEARCH(state, action) {
      console.log(action.payload);
      const { products, search } = action.payload;
      const tempProducts = products.filter((product) => {
        if (!product || !product.name || !product.category) {
          return false; // add checks for undefined properties
        }
        return (
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase())
        );
      });

      state.filteredProducts = tempProducts;
    },
  },
});

export const { FILTER_BY_SEARCH } = filterSlice.actions;

export const selectfilteredProducts = (state) => state.filter.filteredProducts;

export default filterSlice.reducer;

import {configureStore} from '@reduxjs/toolkit';
import vendorReducer from "../features/vendorSlice.js"
import productReducer from "../features/productSlice.js";
import cartReducer from "../features/cartSlice.js";
import authReducer from "../features/authSlice.js";
import toggleReducer from "../features/toggleSlice.js";
const store = configureStore({
reducer: {
  product: productReducer, 
  cart:cartReducer,
  auth:authReducer,
  vendor:vendorReducer,
  toggle:toggleReducer
}
});



export default store;
import {configureStore} from "@reduxjs/toolkit";
import AuthReducer from "../features/auth/authSlice.js";
import categoryReducer from "../features/category/categorySlice.js";
import productReducer from "../features/product/productSlice.js";
 const store = configureStore({
    reducer:{
    auth:AuthReducer,
    category:categoryReducer,
    product:productReducer
    }
});


export default store;
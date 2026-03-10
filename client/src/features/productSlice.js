import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axios.js";

// 🔹 Get All Products
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/product/all");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch products");
    }
  }
);

// 🔹 Get Starter Products
export const getStarterProducts = createAsyncThunk(
  "products/getStarterProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/product/starter");
      // console.log(res.data)
      return res.data.products;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || "Failed to fetch starter products"
      );
    }
  }
);

// 🔹 Get Product By ID
export const getProductById = createAsyncThunk(
  "products/getProductById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/product/${id}`);
      return res.data.product;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch product");
    }
  }
);
export const fetchProductsByCategory = createAsyncThunk(
  "product/fetchByCategory",
  async (categoryName, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/auth/user/products/category/${categoryName || "Electronics"}`);
      return res.data.products; // array of products
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch products");
    }
  }
);

export const fetchFilteredProducts = createAsyncThunk(
  "products/fetchFiltered",
  async ({categories,Brands, Price}, { rejectWithValue }) => {
    try {
      // Convert filters object to query string
      // const query = new URLSearchParams(filters).toString();
      const res = await axiosInstance.get(`/product/filter?category=${categories}&brand=${Brands}&range=${Price}&limit=${10}`);
      console.log(res)
      return res.data.products;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const searchProducts = createAsyncThunk(
  "products/search",
  async ({ searchTerm, page = 1, limit = 5 }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/product/search", {
        params: { q: searchTerm, page, limit },
      });
      console.log(response.data)
      return response.data.products; // return only products for state
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to search products");
    }
  }
);


export const fetchVendorProducts = createAsyncThunk(
  "products/fetchVendorProducts",
  async ({ vendorId, category, page = 1, limit = 10 }, thunkAPI) => {
    try {
      const  res  = await axiosInstance.get("/product/vendor", {
        params: { vendorId, category, page, limit },
      });
      console.log(res)
      return res.data.products;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Failed to fetch products" }
      );
    }
  }
);
const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    vendorProducts:[],
    loadingVendorProducts:false,
    starterProduct: [],
    searchProductsResult:[],
    loadingSearchProducts:false,
    product: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 🔹 Get All Products
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 Get Starter Products
      .addCase(getStarterProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStarterProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.starterProduct = action.payload;
      })
      .addCase(getStarterProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 Get Product By ID
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })    .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.starterProduct = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })      .addCase(fetchFilteredProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilteredProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload; // store fetched products
      })
      .addCase(fetchFilteredProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })  .addCase(searchProducts.pending, (state) => {
        state.loadingSearchProducts = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loadingSearchProducts = false;
        state.searchProductsResult = action.payload;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loadingSearchProducts = false;
        state.error = action.payload;
      }).addCase(fetchVendorProducts.pending,(state,action)=>{
        state.loadingVendorProducts = true;
      }).addCase(fetchVendorProducts.fulfilled,(state,action)=>{
        state.loadingVendorProducts = false;
        state.vendorProducts = action.payload || [] ;
        
      }).addCase(fetchVendorProducts.rejected,(state,ation)=>{
        state.loadingVendorProducts = false;
      })
  },
});

export default productSlice.reducer;
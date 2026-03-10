import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios.js";
// Async thunk to add product
export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(
        "/auth/vendor/add-product",   // remove /api if already in baseURL
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return res.data.product; // assuming backend sends { success, product }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to add product"
      );
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    product: null,
    loading: false,
    success: false,
    error: null,
  },
  reducers: {}, // no reset here
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.product = action.payload;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
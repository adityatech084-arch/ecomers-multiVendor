
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axios.js";

// Fetch vendor details + categories
export const fetchVendorDetails = createAsyncThunk(
  "vendor/fetchVendorDetails",
  async (vendorId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/auth/user/vendor/${vendorId}/details`);
      // console.log(res)
      return res.data; // { success, vendor, categories }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch vendor details");
    }
  }
);



const initialState = {
  vendor: null,
  categories: [],
  loading: false,
  error: null,
};

const vendorSlice = createSlice({
  name: "vendor",
  initialState,
  reducers: {
    clearVendor: (state) => {
      state.vendor = null;
      state.categories = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVendorDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVendorDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.vendor = action.payload.vendor || null;
        state.categories = action.payload.categories || [];
      })
      .addCase(fetchVendorDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch vendor details";
      });
  },
});

export const { clearVendor } = vendorSlice.actions;
export default vendorSlice.reducer;
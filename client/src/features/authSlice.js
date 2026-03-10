import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axios.js"; // adjust path
import { toast } from "react-toastify";
import { fetchCart } from "./cartSlice.js";

// ================= SIGNUP =================
export const signup = createAsyncThunk(
  "auth/signup",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/user/register", userData);
      toast.success(res.data.message)
      return res.data; // return full data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/auth/user/me");
    //   console.log("Check auth response:", res.data);
      return res.data.user; // { user }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ token, otp }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/user/verify-otp", { otp, token });
      // console.log("Backend response inside thunk:", res.data); // ✅ logs backend response
      return res.data; // goes to fulfilled
    } catch (err) {
      const message =
        err.response?.data?.message || "Something went wrong";
      toast.error(message); // 🔹 show backend message as toast
      return rejectWithValue(err.response?.data || { message });
    }
  }
);

// ================= LOGIN =================
export const login = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue ,dispatch}) => {
    try {
      const res = await axiosInstance.post("/auth/user/login", userData);
      // console.log(res.data)
      dispatch(fetchCart())
      return res.data.user;
    } catch (error) {
      // console.log(error)
      return rejectWithValue(
        error.response?.data
      );
    }
  }
);
export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (formData, { rejectWithValue }) => {
    try {
      // Don't set Content-Type header - let browser set it with boundary
      const res = await axiosInstance.patch('/auth/user/update-profile', formData, );
      console.log(res)
      return res.data.user;
    } catch (error) {
      console.error('Update profile error:', error.response?.data || error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


// ================= INITIAL STATE =================
const initialState = {
  authUser: null,
  isCheckingAuth: true,
  isLogining: false,
  isSigning: false,
  isCheckingOtp:false,
  error: null,
  isUpdating:false
};

// ================= SLICE =================
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.authUser = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // ===== SIGNUP =====
      .addCase(signup.pending, (state) => {
        state.isSigning = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isSigning = false;
        state.authUser = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isSigning = false;
        state.authUser = null;
        state.error = action.payload;
      })

      // ===== LOGIN =====
      .addCase(login.pending, (state) => {
        state.isLogining = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLogining = false;
        state.authUser = action.payload;
      })   .addCase(verifyOtp.pending, (state) => {
                 state.isCheckingOtp = true;
              state.error = null;
            })
            .addCase(verifyOtp.fulfilled, (state, action) => {
                 state.isCheckingOtp = false;
              state.authUser = action.payload;
            })
            .addCase(verifyOtp.rejected, (state, action) => {
                 state.isCheckingOtp = false;
                //  toast.error(action.payload || "OTP verification failed");
              state.error = action.payload;
            })
      .addCase(login.rejected, (state, action) => {
        state.isLogining = false;
        state.authUser = null;
        state.error = action.payload;
      })  .addCase(checkAuth.pending, (state) => {
              state.isCheckingAuth = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
              state.isCheckingAuth = false;
              state.authUser = action.payload;
            //   state.authChecked = true;
            })
            .addCase(checkAuth.rejected, (state) => {
              state.isCheckingAuth = false;
              state.authUser = null;
            //   state.authChecked = true;
      
            })      .addCase(updateProfile.pending, (state) => {
        state.isUpdating = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isUpdating = false;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
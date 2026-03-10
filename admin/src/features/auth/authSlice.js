import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios.js";
import { toast } from "react-toastify";

/* ================= REGISTER ================= */

export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/vendor/register", userData);
      return res.data; // { user, otpToken }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

/* ================= LOGIN ================= */

export const login = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/vendor/login", userData);
      console.log(res)
      return res.data; // { user, accessToken }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

/* ================= VERIFY OTP ================= */



export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (otpData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/vendor/verify-otp", otpData);

      // STRICT check for boolean true
      if (res.data.success === true) {
        // Only show success if OTP actually verified
        toast.success(res.data.message || "OTP verified successfully!");
        return res.data; // contains user, token, etc.
      } else {
        // Treat everything else as failure
        const msg = res.data.message || "OTP verification failed";
        toast.error(msg);
        return rejectWithValue(msg);
      }

    } catch (error) {
      const msg =
        error.response?.data?.message || error.message || "OTP verification failed";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

/* ================= CHECK AUTH ================= */

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/auth/vendor/me");
      // console.log("Check auth response:", res.data);
      return res.data.vendor; // { user }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

/* ================= LOGOUT ================= */

export const logout = createAsyncThunk(
  "auth/logout",
  async () => {
    await axiosInstance.post("/auth/user/logout");
  }
);


export const resendOtp = createAsyncThunk(
  "auth/resendOtp",
  async ({ token }, { rejectWithValue }) => {
    try {
      // console.log(`${import.meta.env.VITE_API_BASE_URL}/auth/user/resend-otp`,);
      const { data } = await axiosInstance.post("/auth/user/resend-otp", { token });

      // data should include expireAt for frontend timer
      return data;
    } catch (error) {
      // Axios error handling
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message || "Resend OTP failed");
      }
      return rejectWithValue(error.message);
    }
  }
);
/* ================= INITIAL STATE ================= */

const initialState = {
  authUser: null,
  isCheckingAuth: false,
  isSigningUp: false,
  isLoggingIn: false,
  otpStatus: "idle", // 'idle' | 'pending' | 'succeeded' | 'failed'
  error: null,
  rsendotploading:false,
  authChecked:false
};

/* ================= SLICE ================= */

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetOtpState: (state) => {
  state.otpStatus = "idle";
}
  },
  extraReducers: (builder) => {
    builder

      /* REGISTER */
      .addCase(register.pending, (state) => {
        state.isSigningUp = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.isSigningUp = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.isSigningUp = false;
        state.error = action.payload;
      })

      /* LOGIN */
      .addCase(login.pending, (state) => {
        state.isLoggingIn = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggingIn = false;
           
        if(action.payload.success && action.payload.vendor){
          state.authUser = action.payload.vendor;
          toast.success(action.payload.message || "Logine SucessFul")
        }

        
        // state.authUser = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoggingIn = false;
        state.error = action.payload;
      })

      /* VERIFY OTP */
      .addCase(verifyOtp.pending, (state) => {
           state.otpStatus = "loading";
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
           state.otpStatus = "success";
        state.authUser = action.payload.vendor;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
           state.otpStatus = "error";
          //  toast.error(action.payload || "OTP verification failed");
        state.error = action.payload;
      })

      /* CHECK AUTH */
      .addCase(checkAuth.pending, (state) => {
        state.isCheckingAuth = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isCheckingAuth = false;
        state.authUser = action.payload;
        state.authChecked = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isCheckingAuth = false;
        state.authUser = null;
        state.authChecked = true;

      })

      /* LOGOUT */
      .addCase(logout.fulfilled, (state) => {
        state.authUser = null;
      }).addCase(resendOtp.pending, (state) => {
        state.rsendotploading = true;
        // state.error = null;
      })
      .addCase(resendOtp.fulfilled, (state) => {
        state.rsendotploading = false;
        toast.success("OTP resent successfully! to your mail");
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.rsendotploading = false;
        // state.error = action.payload;
      })
  },
});

export const { resetOtpState } = authSlice.actions;

export default authSlice.reducer;

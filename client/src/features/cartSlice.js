import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axios.js";







export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/auth/cart/all");
      console.log(res.data)
     
      return res.data.cart;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch cart");
    }
  }
);

// 🔹 Add to Cart
export const AddToCartBackend = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity = 1 }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/cart/add", { productId, quantity });
      // console.log(res.data.cart)
      return res.data.cart;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to add to cart");
    }
  }
);

// 🔹 Update Quantity
export const updateCartQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put("/cart/update", { productId, quantity });
      return res.data.cart;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update quantity");
    }
  }
);

// 🔹 Remove from Cart
export const RemoveFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.delete(`/auth/cart/remove/${productId}`);
      // console.log(res)
      return res.data.cart;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to remove from cart");
    }
  }
);

// 🔹 Clear Cart
export const ClearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.delete("/auth/cart/clear");
      return res.data.cart;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to clear cart");
    }
  }
);




















// Get cart from localStorage
const getCartFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  }
  return [];
};

// Save cart to localStorage
const saveCartToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const initialState = {
  items: getCartFromLocalStorage() , // load cart from localStorage
  totalQuantity: 0,
  subTotal: "0.00",
  discount: "0.00",
  totalDue: "0.00",
  loading:false,
  error:null
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // ➕ Add product to cart
    addToCart: (state, action) => {
      const product = action.payload;
      const index = state.items?.findIndex((item) => item._id === product._id);

      if (index >= 0) {
        state.items[index].quantity += 1; // increment if already exists
      } else {
        state.items.push({ ...product, quantity: 1 });
      }

      saveCartToLocalStorage(state.items); // persist
    },

    // 🗑 Remove product
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item._id !== id);
      saveCartToLocalStorage(state.items); // persist
    },

    // 🔄 Update quantity
 updateQuantity: (state, action) => {
  const { id, quantity } = action.payload;
  const index = state.items.findIndex((item) => item._id === id);
  if (index >= 0) {
    // Clamp the quantity to minimum 1
    state.items[index].quantity = Math.max(1, quantity);
  }
  saveCartToLocalStorage(state.items); // persist
},

    // 🧹 Clear cart
    clearCart: (state) => {
      state.items = [];
      saveCartToLocalStorage([]); // persist
    },

    // 📊 Calculate totals
    calculateTotals: (state) => {
      let subTotal = 0;
      let discount = 0;
      let totalQuantity = 0;

      state.items?.forEach((item) => {
        totalQuantity += item.quantity;
        subTotal += (item.salePrice || 0) * item.quantity;
        if (item.basePrice && item.salePrice) {
          discount += (item.basePrice - item.salePrice) * item.quantity;
        }
      });

      state.totalQuantity = totalQuantity;
      state.subTotal = subTotal.toFixed(2);
      state.discount = discount.toFixed(2);
      state.totalDue = (subTotal).toFixed(2);
    },
  },
  extraReducers:(builder)=>{
    builder.addCase(fetchCart.pending, (state) => { state.loading = true; })


    .addCase(fetchCart.fulfilled, (state, action) => {
  state.loading = false;

  const cartItems = action.payload || [];

  state.items = cartItems;

  // ✅ Store in localStorage
  localStorage.setItem("cart", JSON.stringify(cartItems));
})

      .addCase(fetchCart.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // 🔹 Add to Cart
      .addCase(AddToCartBackend.pending, (state) => { state.loading = true; })
     .addCase(AddToCartBackend.fulfilled, (state, action) => {
    state.loading = false;
    // Merge backend items with local items
    
    state.items = [...state.items]
    // saveCartToLocalStorage(state.items);
    

})
      .addCase(AddToCartBackend.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // 🔹 Update Quantity
      .addCase(updateCartQuantity.pending, (state) => { state.loading = true; })
      .addCase(updateCartQuantity.fulfilled, (state, action) => { state.loading = false; state.items = action.payload?.items || []; })
      .addCase(updateCartQuantity.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // 🔹 Remove from Cart
      .addCase(RemoveFromCart.pending, (state) => { state.loading = true; })
     .addCase(RemoveFromCart.fulfilled, (state, action) => {
  state.loading = false;

  // action.payload = updated cart from backend
  state.items = action.payload || [];

  // ✅ Save to localStorage
  localStorage.setItem("cart", JSON.stringify(state.items));
})
      .addCase(RemoveFromCart.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // 🔹 Clear Cart
      .addCase(ClearCart.pending, (state) => { state.loading = true; })
      .addCase(ClearCart.fulfilled, (state, action) => { state.loading = false; state.items = action.payload || []; })
      .addCase(ClearCart.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  }
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  calculateTotals,
} = cartSlice.actions;

export default cartSlice.reducer;
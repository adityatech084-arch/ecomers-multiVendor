// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axiosInstance from "../../utils/axios.js";

// // Fetch categories
// export const fetchCategories = createAsyncThunk(
//   "category/fetchCategories",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await axiosInstance.get("/vendor/category/categories");
//       return res.data.categories;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );

// // Add top-level category (optimistic update)
// export const addCategory = createAsyncThunk(
//   "category/addCategory",
//   async (data, { rejectWithValue }) => {
//     try {
//       const res = await axiosInstance.post("/vendor/category/create-category", data);
//       return res.data.category;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );

// // Add subcategory (optimistic update)
// export const addSubcategory = createAsyncThunk(
//   "category/addSubcategory",
//   async ({ categoryId, name, slug }, { rejectWithValue }) => {
//     try {
//       const res = await axiosInstance.post(
//         "/vendor/category/subcategory",
//         {
//           categoryId,
//           name,
//           slug,
//         }
//       );

//       return res.data.category; // backend returns updated full category
//     } catch (err) {
//       return rejectWithValue(
//         err.response?.data?.message || err.message
//       );
//     }
//   }
// );

// // Update category
// export const updateCategory = createAsyncThunk(
//   "category/updateCategory",
//   async ({ id, ...data }, { rejectWithValue }) => {
//     try {
//       const res = await axiosInstance.put(`/vendor/category/update/${id}`, data);
//       return res.data.category;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );

// // Delete category
// export const deleteCategory = createAsyncThunk(
//   "category/deleteCategory",
//   async (id, { rejectWithValue }) => {
//     try {
//       await axiosInstance.delete(`/vendor/category/delete/category/${id}`);
//       return id;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );

// // Update subcategory
// export const updateSubcategory = createAsyncThunk(
//   "category/updateSubcategory",
//   async ({ categoryId, subcategoryId, ...data }, { rejectWithValue }) => {
//     try {
//       const res = await axiosInstance.put(`/vendor/category/update/${categoryId}/subcategory/${subcategoryId}`, data);
//       return res.data.category;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );

// // Delete subcategory
// export const deleteSubcategory = createAsyncThunk(
//   "category/deleteSubcategory",
//   async ({ categoryId, subcategoryId }, { rejectWithValue }) => {
//     try {
//       const res = await axiosInstance.delete(`/vendor/category/delete/${categoryId}/subcategory/${subcategoryId}`);
//       return res.data.category;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );

// const categorySlice = createSlice({
//   name: "category",
//   initialState: {
//     categories: [],
//     loading: false,
//     error: null
//   },
//   reducers: {
//     // Quick local update for add/edit/delete before API returns
//     addCategoryLocal: (state, action) => { state.categories.push(action.payload); },
//     addSubcategoryLocal: (state, action) => {
//       const idx = state.categories.findIndex(c => c._id === action.payload.categoryId);
//       if (idx !== -1) state.categories[idx].subcategories.push(action.payload.subcategory);
//     },
//     updateCategoryLocal: (state, action) => {
//       const idx = state.categories.findIndex(c => c._id === action.payload._id);
//       if (idx !== -1) state.categories[idx] = { ...state.categories[idx], ...action.payload };
//     },
//     updateSubcategoryLocal: (state, action) => {
//       const { categoryId, subcategory } = action.payload;
//       const idx = state.categories.findIndex(c => c._id === categoryId);
//       if (idx !== -1) {
//         const subIdx = state.categories[idx].subcategories.findIndex(s => s._id === subcategory._id);
//         if (subIdx !== -1) state.categories[idx].subcategories[subIdx] = subcategory;
//       }
//     },
//     deleteCategoryLocal: (state, action) => {
//       state.categories = state.categories.filter(c => c._id !== action.payload);
//     },
//     deleteSubcategoryLocal: (state, action) => {
//       const { categoryId, subcategoryId } = action.payload;
//       const idx = state.categories.findIndex(c => c._id === categoryId);
//       if (idx !== -1) {
//         state.categories[idx].subcategories = state.categories[idx].subcategories.filter(s => s._id !== subcategoryId);
//       }
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCategories.pending, (state) => { state.loading = true; state.error = null; })
//       .addCase(fetchCategories.fulfilled, (state, action) => { state.loading = false; state.categories = action.payload; })
//       .addCase(fetchCategories.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

//       .addCase(addCategory.fulfilled, (state, action) => { 
//         const exists = state.categories.find(c => c._id === action.payload._id);
//         if (!exists) state.categories.push(action.payload); 
//       })
//       .addCase(addSubcategory.fulfilled, (state, action) => {
//         const idx = state.categories.findIndex(c => c._id === action.payload._id);
//         if (idx !== -1) state.categories[idx] = action.payload;
//       })
//       .addCase(updateCategory.fulfilled, (state, action) => {
//         const idx = state.categories.findIndex(c => c._id === action.payload._id);
//         if (idx !== -1) state.categories[idx] = action.payload;
//       })
//       .addCase(deleteCategory.fulfilled, (state, action) => {
//         state.categories = state.categories.filter(c => c._id !== action.payload);
//       })
//       .addCase(updateSubcategory.fulfilled, (state, action) => {
//         const idx = state.categories.findIndex(c => c._id === action.payload._id);
//         if (idx !== -1) state.categories[idx] = action.payload;
//       })
//       .addCase(deleteSubcategory.fulfilled, (state, action) => {
//         const idx = state.categories.findIndex(c => c._id === action.payload._id);
//         if (idx !== -1) state.categories[idx] = action.payload;
//       });
//   }
// });

// export const { 
//   addCategoryLocal, addSubcategoryLocal, 
//   updateCategoryLocal, updateSubcategoryLocal,
//   deleteCategoryLocal, deleteSubcategoryLocal
// } = categorySlice.actions;

// export default categorySlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios.js";
import { toast } from "react-toastify";

// ==========================
// Async Thunks
// ==========================

// Fetch categories
export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/vendor/category/categories");
      return res.data.categories;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Add top-level category
// export const addCategory = createAsyncThunk(
//   "category/addCategory",
//   async ({name,slug,tempId}, { rejectWithValue }) => {
//     try {
//       const res = await axiosInstance.post("/vendor/category/create-category", {name,slug});
     
//         return res.data.category;

//     } catch (err) {
//         toast.error(res.data.message || "faild to add Category")
//       return rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );
export const addCategory = createAsyncThunk(
  "category/addCategory",
  async ({ name, slug, tempId }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(
        "/vendor/category/create-category",
        { name, slug }
      );

      // 👇 return tempId also
      return {
        category: res.data.category,
        tempId,
      };

    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to add category"
      );

      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);
// Add subcategory
export const addSubcategory = createAsyncThunk(
  "category/addSubcategory",
  async ({ categoryId, name, slug }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/vendor/category/subcategory", { categoryId, name, slug });
      return res.data.category; // backend returns full updated category
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Update category
export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ id, ...data }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(`/vendor/category/update/${id}`, data);
      return res.data.category;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Delete category
export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/vendor/category/delete/category/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Update subcategory
export const updateSubcategory = createAsyncThunk(
  "category/updateSubcategory",
  async ({ categoryId, subcategoryId, ...data }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(
        `/vendor/category/update/${categoryId}/subcategory/${subcategoryId}`,
        data
      );
      return res.data.category; // backend returns updated full category
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Delete subcategory
export const deleteSubcategory = createAsyncThunk(
  "category/deleteSubcategory",
  async ({ categoryId, subcategoryId }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.delete(
        `/vendor/category/delete/${categoryId}/subcategory/${subcategoryId}`
      );
      return res.data.category; // backend returns updated full category
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ==========================
// Slice
// ==========================
const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    loadingCategory:false,
    loading: false,
    error: null,
  },
  reducers: {

      addCategoryLocal: (state, action) => { state.categories.push(action.payload); },
    addSubcategoryLocal: (state, action) => {
      const idx = state.categories.findIndex(c => c._id === action.payload.categoryId);
      if (idx !== -1) state.categories[idx].subcategories.push(action.payload.subcategory);
    },
    updateCategoryLocal: (state, action) => {
      const idx = state.categories.findIndex(c => c._id === action.payload._id);
      if (idx !== -1) state.categories[idx] = { ...state.categories[idx], ...action.payload };
    },
    updateSubcategoryLocal: (state, action) => {
      const { categoryId, subcategory } = action.payload;
      const idx = state.categories.findIndex(c => c._id === categoryId);
      if (idx !== -1) {
        const subIdx = state.categories[idx].subcategories.findIndex(s => s._id === subcategory._id);
        if (subIdx !== -1) state.categories[idx].subcategories[subIdx] = subcategory;
      }
    },
    deleteCategoryLocal: (state, action) => {
      state.categories = state.categories.filter(c => c._id !== action.payload);
    },
    deleteSubcategoryLocal: (state, action) => {
      const { categoryId, subcategoryId } = action.payload;
      const idx = state.categories.findIndex(c => c._id === categoryId);
      if (idx !== -1) {
        state.categories[idx].subcategories = state.categories[idx].subcategories.filter(s => s._id !== subcategoryId);
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchCategories.pending, (state) => {
        state.loadingCategory = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loadingCategory = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loadingCategory = false;
        state.error = action.payload;
      })

      // ADD CATEGORY
      .addCase(addCategory.fulfilled, (state, action) => {
  const { category, tempId } = action.payload;

  const index = state.categories.findIndex(
    (cat) => cat._id === tempId
  );

  if (index !== -1) {
    // 🔥 Replace temp category with real one
    state.categories[index] = category;
  } else {
    // fallback safety
    state.categories.push(category);
  }
})
      // DELETE CATEGORY
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter((c) => c._id !== action.payload);
      })

      // ADD / UPDATE / DELETE SUBCATEGORY
      .addCase(addSubcategory.fulfilled, (state, action) => {
        const idx = state.categories.findIndex((c) => c._id === action.payload._id);
        if (idx !== -1) state.categories[idx] = action.payload;
      })
      .addCase(updateSubcategory.fulfilled, (state, action) => {
        const idx = state.categories.findIndex((c) => c._id === action.payload._id);
        if (idx !== -1) state.categories[idx] = action.payload;
      })
      .addCase(deleteSubcategory.fulfilled, (state, action) => {
        const idx = state.categories.findIndex((c) => c._id === action.payload._id);
        if (idx !== -1) state.categories[idx] = action.payload;
      });
  },
});

export const { 
  addCategoryLocal, addSubcategoryLocal, 
  updateCategoryLocal, updateSubcategoryLocal,
  deleteCategoryLocal, deleteSubcategoryLocal
} = categorySlice.actions;
export default categorySlice.reducer;
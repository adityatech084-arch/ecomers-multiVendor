import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchModel: false,  // fixed typo
};

const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    toggleSearchModel: (state) => {
      state.searchModel = !state.searchModel; // toggle boolean
    },
  },
});

export const { toggleSearchModel } = toggleSlice.actions;
export default toggleSlice.reducer;
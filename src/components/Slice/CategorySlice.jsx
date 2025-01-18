import { createSlice } from "@reduxjs/toolkit";

const HandleCategory = createSlice({
  name: "category",
  initialState: {
    categorytype: "All",
  },
  reducers: {
    changeCetegory(state, action) {
      state.categorytype = action.payload;
    },
  },
});

export const { changeCetegory } = HandleCategory.actions;
export default HandleCategory.reducer;

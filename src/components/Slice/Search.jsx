import { createSlice } from "@reduxjs/toolkit";

const Searchslice = createSlice({
  name: "search",
  initialState: {
    search: "",
  },
  reducers: {
    searchItem: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { searchItem } = Searchslice.actions;
export default Searchslice.reducer;

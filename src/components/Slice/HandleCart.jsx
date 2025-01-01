import { createSlice } from "@reduxjs/toolkit";

const handleCartSlice = createSlice({
  name: "handlecart",
  initialState: {
    isopen: false,
  },
  reducers: {
    setIsopen: (state) => {
      state.isopen = !state.isopen;
    },
  },
});

export const { setIsopen } = handleCartSlice.actions;
export default handleCartSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiCall from "../../APIcall/APIcall";

export const CheakoutDetails = createAsyncThunk("CheakoutDetails", async () => {
  try {
    const res = await apiCall("/user_details");
    return res.user_detail;
  } catch (error) {
    throw error.message;
  }
});

export const cheakoutSlice = createSlice({
  name: "cheakoutName",
  initialState: {
    cheakout_list: {},
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(CheakoutDetails.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(CheakoutDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.cheakout_list = action.payload;
      }),
      builder.addCase(CheakoutDetails.rejected, (state, action) => {
        state.loading = true;
        state.error = action.error.message;
      });
  },
});

export default cheakoutSlice.reducer;

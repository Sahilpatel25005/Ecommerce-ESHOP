import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiCall from "../../APIcall/APIcall";

export const list_product = createAsyncThunk("list_product", async () => {
  try {
    const res = await apiCall("/list_product");

    return res;
  } catch (error) {
    throw error.message;
  }
});

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    product_items: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(list_product.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(list_product.fulfilled, (state, action) => {
        state.loading = false;
        state.product_items = action.payload;
      }),
      builder.addCase(list_product.rejected, (state, action) => {
        state.loading = true;
        state.product_items.push(action.payload);
      });
  },
});

export default dataSlice.reducer;

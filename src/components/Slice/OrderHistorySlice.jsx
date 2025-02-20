import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiCall from "../../APIcall/APIcall";

export const list_order = createAsyncThunk("list_order", async () => {
  try {
    const res = await apiCall("/order/all_orders");

    return res.cartitem;
  } catch (error) {
    throw error.message;
  }
});

export const itemSlice = createSlice({
  name: "item",
  initialState: {
    order_items: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(list_order.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(list_order.fulfilled, (state, action) => {
        state.loading = false;
        state.order_items = action.payload;
      }),
      builder.addCase(list_order.rejected, (state, action) => {
        state.loading = true;
        state.error = action.error.message;
      });
  },
});

export default itemSlice.reducer;

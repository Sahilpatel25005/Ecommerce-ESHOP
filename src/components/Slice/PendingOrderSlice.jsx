import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiCall from "../../APIcall/APIcall";

export const list_pending_order = createAsyncThunk(
  "list_pending_order",
  async () => {
    try {
      const res = await apiCall("/order/pending_orders");

      return res.cartitem;
    } catch (error) {
      throw error.message;
    }
  }
);

export const PendingitemSlice = createSlice({
  name: "pendingItem",
  initialState: {
    pending_order_items: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(list_pending_order.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(list_pending_order.fulfilled, (state, action) => {
        state.loading = false;
        state.pending_order_items = action.payload;
      }),
      builder.addCase(list_pending_order.rejected, (state, action) => {
        state.loading = true;
        state.error = action.error.message;
      });
  },
});

export default PendingitemSlice.reducer;

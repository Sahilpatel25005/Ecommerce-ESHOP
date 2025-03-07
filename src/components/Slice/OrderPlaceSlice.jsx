import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiCall from "../../APIcall/APIcall";

export const order_placed = createAsyncThunk("order_placed", async () => {
  try {
    const res = await apiCall("/order", "POST");

    return res;
  } catch (error) {
    throw error.message;
  }
});

export const orderPlacedSlice = createSlice({
  name: "orderPlaced",
  initialState: {
    placeOrder: {},
    loading: false,
    error: null,
  },
  reducers: {
    clearOrderId: (state) => {
      state.placeOrder = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(order_placed.pending, (state) => {
      state.loading = true;
    }),
      builder.addCase(order_placed.fulfilled, (state, action) => {
        state.loading = false;
        state.placeOrder = action.payload;
      }),
      builder.addCase(order_placed.rejected, (state, action) => {
        state.loading = true;
        state.error = action.error.message;
      });
  },
});

export const { clearOrderId } = orderPlacedSlice.actions;
export default orderPlacedSlice.reducer;

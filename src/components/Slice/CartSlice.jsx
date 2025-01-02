import { createSlice } from "@reduxjs/toolkit";

const CartData = createSlice({
  name: "cartdata",
  initialState: {
    cart: [],
  },
  reducers: {
    addProduct: (state, action) => {
      state.cart.push(action.payload);
    },
  },
});

export const { addProduct } = CartData.actions;
export default CartData.reducer;

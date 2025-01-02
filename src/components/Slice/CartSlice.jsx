import { createSlice } from "@reduxjs/toolkit";

const CartData = createSlice({
  name: "cartdata",
  initialState: {
    cart: [],
  },
  reducers: {
    addProduct: (state, action) => {
      const existItem = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (existItem) {
        state.cart = state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, qty: item.qty + 1 }
            : { ...item }
        );
      } else {
        state.cart.push(action.payload);
      }
    },

    removeProduct: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },

    incereseQty: (state, action) => {
      state.cart = state.cart.map((item) =>
        item.id === action.payload
          ? { ...item, qty: item.qty + 1 }
          : { ...item }
      );
    },

    dicereseQty: (state, action) => {
      state.cart = state.cart.map((item) =>
        item.id === action.payload
          ? { ...item, qty: item.qty - 1 }
          : { ...item }
      );
    },
  },
});

export const { addProduct, removeProduct, incereseQty, dicereseQty } =
  CartData.actions;
export default CartData.reducer;

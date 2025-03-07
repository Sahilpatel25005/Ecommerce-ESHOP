import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiCall from "../../APIcall/APIcall";

export const incereseQty = createAsyncThunk(
  "cart/incereseQty",
  async (productId, { rejectWithValue }) => {
    if (!productId) {
      return rejectWithValue("Product ID is undefined!");
    }
    try {
      const response = await apiCall(`/cart/increse`, "POST", {
        productid: productId,
      });
      return response.cart_item;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const dicereseQty = createAsyncThunk(
  "cart/dicereseQty",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await apiCall(`/cart/decrese`, "POST", {
        productid: productId,
      });
      return response.cart_item;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeProduct = createAsyncThunk(
  "cart/removeProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await apiCall(`/cart/delete`, "DELETE", {
        productid: productId,
      });

      if (!response.delete_item) {
        return rejectWithValue("Invalid response format");
      }

      return response.delete_item;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiCall(`/cart/cart_item`);
      return response.cartitem || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const CartData = createSlice({
  name: "cartdata",
  initialState: {
    cart: [],
  },
  reducers: {
    addProduct: (state, action) => {
      const existItem = state.cart.find(
        (item) => item.productid === action.payload.productid
      );

      if (existItem) {
        existItem.qty += 1;
      } else {
        state.cart.push({ ...action.payload, qty: action.payload.qty });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        console.error("Error fetching cart:", action.payload);
        state.status = "failed";
        state.error = action.payload;
        state.cart = [];
      })
      .addCase(incereseQty.fulfilled, (state, action) => {
        state.cart = state.cart.map((item) =>
          item.productid === action.payload.productid
            ? { ...item, qty: action.payload.qty }
            : item
        );
      })
      .addCase(dicereseQty.fulfilled, (state, action) => {
        state.cart = state.cart.map((item) =>
          item.productid === action.payload.productid
            ? { ...item, qty: action.payload.qty }
            : item
        );
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        if (!action.payload || !action.payload.productid) {
          console.error("Invalid payload:", action.payload);
          return;
        }

        state.cart = state.cart.filter(
          (item) => item.productid !== action.payload.productid
        );
      });
  },
});

export const { addProduct } = CartData.actions;
export default CartData.reducer;

import { createSlice } from "@reduxjs/toolkit";
import apiCall from "../../APIcall/APIcall";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const admin_add_product = createAsyncThunk("admin_add_product", async (product) => {
  try {
   
    const res = await apiCall("/searchadmin_add_product", "POST", {
      query: product,
    });
    return res;
  } catch (error) {
    return error;
  }
});

const AdminAddProductSlice = createSlice({
  name: "admin_add_product",
  initialState: {
    product: [],
    loading: false,
  },
  extraReducers: (buider) => {
    buider
    .addCase(admin_add_product.pending, (state) => {
        state.loading = true;
    })
      .addCase(admin_add_product.fulfilled, (state, action) => {
        state.admin_add_product = action.payload;
        state.loading = false;
      })
      .addCase(admin_add_product.rejected, (state, action) => {
        console.log("item is not in store that you have to search");
        state.search.push(action.payload);
        // console.log("item is not in store that you have to search", state.search);
      });
  },
});

export default AdminAddProductSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import apiCall from "../../APIcall/APIcall";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const generate_product_details = createAsyncThunk("generate_product_etails", async (file) => {
  try {
   
    const res = await apiCall("/generate-product", "POST", {
      image: file,
    });
    return res;
  } catch (error) {
    return error;
  }
});

const GenerateProductDetailsSlice = createSlice({
  name: "search",
  initialState: {
    product_details: [],
    loading: false,
  },
  extraReducers: (buider) => {
    buider
    .addCase(generate_product_details.pending, (state) => {
        state.loading = true;
    })
      .addCase(generate_product_details.fulfilled, (state, action) => {
        state.product_details = action.payload;
        state.loading = false;
      })
      .addCase(generate_product_details.rejected, (state, action) => {
        state.product_details.push(action.payload);
        // console.log("item is not in store that you have to search", state.search);
      });
  },
});

export default GenerateProductDetailsSlice.reducer;

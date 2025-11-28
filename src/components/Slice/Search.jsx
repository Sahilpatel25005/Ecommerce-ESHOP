import { createSlice } from "@reduxjs/toolkit";
import apiCall from "../../APIcall/APIcall";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const searchItem = createAsyncThunk("serchItem", async (search) => {
  try {
   
    const res = await apiCall("/search", "POST", {
      query: search,
    });
    return res;
  } catch (error) {
    return error;
  }
});

const Searchslice = createSlice({
  name: "search",
  initialState: {
    search: [],
    loading: false,
  },
  extraReducers: (buider) => {
    buider
    .addCase(searchItem.pending, (state) => {
        state.loading = true;
    })
      .addCase(searchItem.fulfilled, (state, action) => {
        state.search = action.payload;
        state.loading = false;
      })
      .addCase(searchItem.rejected, (state, action) => {
        state.search.push(action.payload);
        // console.log("item is not in store that you have to search", state.search);
      });
  },
});

export default Searchslice.reducer;

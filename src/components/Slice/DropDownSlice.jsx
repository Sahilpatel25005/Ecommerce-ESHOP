import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  DropdownData: [
    {
      id: 1,
      name: "Order",
      link: "/#",
    },
    {
      id: 2,
      name: "Order History",
      link: "https://www.youtube.com/watch?v=fQBCX-T-1O4",
    },
  ],
};

const dropDownSlice = createSlice({
  name: "dropdown",
  initialState,
});

export default dropDownSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  DropdownData: [
    {
      id: 1,
      name: "Order",
      link: "/Current_order",
    },
    {
      id: 2,
      name: "Order history",
      link: "/Order_history",
    },
  ],
};

const dropDownSlice = createSlice({
  name: "dropdown",
  initialState,
});

export default dropDownSlice.reducer;

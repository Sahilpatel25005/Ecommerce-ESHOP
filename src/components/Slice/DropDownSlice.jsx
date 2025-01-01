import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  DropdownData: [
    {
      id: 1,
      name: "Tranding Products",
      link: "/#",
    },
    {
      id: 2,
      name: "Best Selling",
      link: "/#",
    },
    {
      id: 3,
      name: "Top Rated",
      link: "/#",
    },
  ],
};

const dropDownSlice = createSlice({
  name: "dropdown",
  initialState,
});

export default dropDownSlice.reducer;

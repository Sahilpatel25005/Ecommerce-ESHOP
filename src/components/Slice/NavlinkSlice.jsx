import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  MenuLinks: [
    {
      id: 1,
      name: "Home",
      link: "/Home",
    },
    {
      id: 2,
      name: "Shop",
      link: "/shop",
    },
    {
      id: 3,
      name: "About",
      link: "/about",
    },
  ],
};

const NavlinkSlice = createSlice({
  name: "navlink",
  initialState,
  reducers: {},
});

export default NavlinkSlice.reducer;

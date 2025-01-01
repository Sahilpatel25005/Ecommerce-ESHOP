import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  MenuLinks: [
    {
      id: 1,
      name: "Home",
      link: "/",
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
    {
      id: 4,
      name: "Blogs",
      link: "/blog",
    },
  ],
};

const NavlinkSlice = createSlice({
  name: "navlink",
  initialState,
  reducers: {},
});

export default NavlinkSlice.reducer;

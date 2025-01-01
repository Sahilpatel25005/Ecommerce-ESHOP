import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "../components/Slice/ProductSlice";
import handleCartSlice from "../components/Slice/HandleCart";
import dropDownSlice from "../components/Slice/DropDownSlice";
import NavlinkSlice from "../components/Slice/NavlinkSlice";

export const store = configureStore({
  reducer: {
    data: dataSlice,
    handlecart: handleCartSlice,
    dropdown: dropDownSlice,
    navlink: NavlinkSlice,
  },
});

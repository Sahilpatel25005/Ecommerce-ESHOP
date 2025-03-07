import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "../components/Slice/ProductSlice";
import handleCartSlice from "../components/Slice/HandleCart";
import dropDownSlice from "../components/Slice/DropDownSlice";
import NavlinkSlice from "../components/Slice/NavlinkSlice";
import CartData from "../components/Slice/CartSlice";
import HandleCategory from "../components/Slice/CategorySlice";
import Searchslice from "../components/Slice/Search";
import loadingSlice from "../components/Slice/LoadingSlice";
import cheakoutSlice from "../components/Slice/CheakoutSlice";
import itemSlice from "../components/Slice/OrderHistorySlice";
import PendingitemSlice from "../components/Slice/PendingOrderSlice";
import orderPlacedSlice from "../components/Slice/OrderPlaceSlice";

const store = configureStore({
  reducer: {
    data: dataSlice,
    handlecart: handleCartSlice,
    dropdown: dropDownSlice,
    navlink: NavlinkSlice,
    cartdata: CartData,
    category: HandleCategory,
    search: Searchslice,
    loading: loadingSlice,
    cheakout: cheakoutSlice,
    item: itemSlice,
    pendingItem: PendingitemSlice,
    orderPlaced: orderPlacedSlice,
  },
});

export default store;

import { createSlice } from "@reduxjs/toolkit";
import Img1 from "../../assets/products/p-1.jpg";
import Img2 from "../../assets/products/p-2.jpg";
import Img3 from "../../assets/products/p-3.jpg";
import Img4 from "../../assets/products/p-4.jpg";
import Img5 from "../../assets/products/p-5.jpg";
import Img7 from "../../assets/products/p-7.jpg";
import Img9 from "../../assets/products/p-9.jpg";
import airbuds from "../../assets/products/airbuds.png";
import airbuds2 from "../../assets/products/airbuds2.png";
import airbuds3 from "../../assets/products/airbuds3.jpg";
import Img10 from "../../assets/products/images10.jpg";
import airb from "../../assets/products/airb.png";
import watch from "../../assets/products/watch.png";

const initialState = {
  product: [
    {
      id: 1,
      img: Img1,
      title: "Boat Headphone",
      price: "120",
      aosDelay: "0",
      category: "Headphone",
    },
    {
      id: 2,
      img: Img2,
      title: "Rocky Mountain",
      price: "4202",
      aosDelay: "200",
      category: "Watch",
    },
    {
      id: 3,
      img: watch,
      title: "Goggles",
      price: "320",
      aosDelay: "400",
      category: "Headphone",
    },
    {
      id: 4,
      img: airb,
      title: "Printed ",
      price: "220",
      aosDelay: "600",
      category: "Headphone",
    },
    {
      id: 5,
      img: airbuds2,
      title: "Boat Headphone",
      price: "120",
      aosDelay: "0",
      category: "Headphone",
    },
    {
      id: 6,
      img: airbuds,
      title: "Rocky Mountain",
      price: "420",
      aosDelay: "200",
      category: "Headphone",
    },
    {
      id: 7,
      img: airbuds3,
      title: "Goggles",
      price: "320",
      aosDelay: "400",
      category: "Headphone",
    },
    {
      id: 8,
      img: airbuds3,
      title: "Printed ",
      price: "220",
      aosDelay: "600",
      category: "Headphone",
    },
    {
      id: 9,
      img: Img10,
      title: "Boat Headphone",
      price: "120",
      aosDelay: "0",
      category: "Headphone",
    },
    {
      id: 10,
      img: Img2,
      title: "Rocky Mountain",
      price: "4202",
      aosDelay: "200",
      category: "Watch",
    },
    {
      id: 11,
      img: Img3,
      title: "Goggles",
      price: "320",
      aosDelay: "400",
      category: "Headphone",
    },
    {
      id: 12,
      img: Img4,
      title: "Printed ",
      price: "220",
      aosDelay: "600",
      category: "Headphone",
    },
    {
      id: 13,
      img: Img9,
      title: "Boat Headphone",
      price: "120",
      aosDelay: "0",
      category: "Headphone",
    },
    {
      id: 14,
      img: Img4,
      title: "Rocky Mountain",
      price: "420",
      aosDelay: "200",
      category: "Headphone",
    },
    {
      id: 15,
      img: Img7,
      title: "Goggles",
      price: "320",
      aosDelay: "400",
      category: "Headphone",
    },
    {
      id: 16,
      img: Img5,
      title: "Printed ",
      price: "220",
      aosDelay: "600",
      category: "Headphone",
    },
  ],
  product2: [
    {
      id: 1,
      img: Img1,
      title: "Boat Headphone",
      price: "120",
      aosDelay: "0",
      category: "Headphone",
    },
    {
      id: 2,
      img: Img2,
      title: "Rocky Mountain",
      price: "4202",
      aosDelay: "200",
      category: "Watch",
    },
    {
      id: 3,
      img: Img3,
      title: "Goggles",
      price: "320",
      aosDelay: "400",
      category: "Headphone",
    },
    {
      id: 4,
      img: Img4,
      title: "Printed ",
      price: "220",
      aosDelay: "600",
      category: "Headphone",
    },
    {
      id: 4,
      img: Img4,
      title: "Printed ",
      price: "220",
      aosDelay: "600",
      category: "Headphone",
    },
    {
      id: 5,
      img: Img9,
      title: "Boat Headphone",
      price: "120",
      aosDelay: "0",
      category: "Headphone",
    },
    {
      id: 6,
      img: Img4,
      title: "Rocky Mountain",
      price: "420",
      aosDelay: "200",
      category: "Headphone",
    },
    {
      id: 7,
      img: Img7,
      title: "Goggles",
      price: "320",
      aosDelay: "400",
      category: "Headphone",
    },
    {
      id: 8,
      img: Img5,
      title: "Printed ",
      price: "220",
      aosDelay: "600",
      category: "Headphone",
    },
  ],
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
});

export default dataSlice.reducer;

import React  , {useEffect} from "react";
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import ShopCard from "./ShopCard";
import Heading from "../Shered/Heading";
import Img1 from "../../assets/products/p-1.jpg";
import Img2 from "../../assets/products/p-2.jpg";
import Img3 from "../../assets/products/p-3.jpg";
import Img4 from "../../assets/products/p-4.jpg";
import Img5 from "../../assets/products/p-5.jpg";
import Img7 from "../../assets/products/p-7.jpg";
import Img9 from "../../assets/products/p-9.jpg";

const ProductsData = [
  {
    id: 1,
    img: Img1,
    title: "Boat Headphone",
    price: "120",
    aosDelay: "0",
  },
  {
    id: 2,
    img: Img2,
    title: "Rocky Mountain",
    price: "420",
    aosDelay: "200",
  },
  {
    id: 3,
    img: Img3,
    title: "Goggles",
    price: "320",
    aosDelay: "400",
  },
  {
    id: 4,
    img: Img4,
    title: "Printed ",
    price: "220",
    aosDelay: "600",
  },
];

const ProductsData2 = [
  {
    id: 1,
    img: Img9,
    title: "Boat Headphone",
    price: "120",
    aosDelay: "0",
  },
  {
    id: 2,
    img: Img4,
    title: "Rocky Mountain",
    price: "420",
    aosDelay: "200",
  },
  {
    id: 3,
    img: Img7,
    title: "Goggles",
    price: "320",
    aosDelay: "400",
  },
  {
    id: 4,
    img: Img5,
    title: "Printed ",
    price: "220",
    aosDelay: "600",
  },
];


function Shop() {
    useEffect(() => {
        AOS.init({
          duration: 800,
          easing: "ease-in-sine",
          delay: 100,
          offset: 100,
        });
        AOS.refresh();
      }, []);
    
  return (
    <div className="container">
      <div  className="mt-3">
        <Heading
          title="Our Products"
          subtitle={"The best Products for you..."}
        />
        <ShopCard data={ProductsData} />
        <ShopCard data={ProductsData2} />
        <ShopCard data={ProductsData} />
        <ShopCard data={ProductsData2} />
      </div>
    </div>
  );
}

export default Shop;

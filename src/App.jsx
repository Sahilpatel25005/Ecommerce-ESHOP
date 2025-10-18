import Cetagory2 from "./components/Cetegory/Cetagory2";
import Cetegory from "./components/Cetegory/Cetegory";
import Hero from "./components/Hero/Hero";
import Navbar from "./components/Navbar/Navbar";
import React, { useEffect, useState } from "react";
import Services from "./components/Services/Services";
import Banner from "./components/Banner/Banner";
import headphone from "./assets/Hero/tomato.png";
import smartwatch2 from "./assets/Hero/green-chili.png";
import Products from "./components/Products/Products";
import Blog from "./components/Blog/Blog";
import Partner from "./components/Partner/Partner";
import Footer from "./components/Footer/Footer";
import Popup from "./components/Popup/Popup";

import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  const BannerData = {
    discount: "30% OFF",
    title: "FRESH HARVEST",
    date: "10 Jan to 28 Jan",
    image: headphone,
    title2: "Organic Tomato",
    title3: "Winter Offer",
    title4:
      "Enjoy nature’s freshness with our handpicked organic tomatoes — juicy, healthy, and grown with love. Perfect for your daily meals and full of natural goodness.",
    bgColor: "#f42c37",
  };

  const BannerData2 = {
    discount: "30% OFF",
    title: "GREEN DELIGHT",
    date: "14 Jan to 28 Jan",
    image: smartwatch2,
    title2: "Farm Fresh Vegetables",
    title3: "Winter Sale",
    title4:
      "Taste the freshness of nature with our range of green, organic vegetables — from farm to your plate, picked fresh every day.",
    bgColor: "#7CB342",
  };

  const [orderPopup, setOrderPopup] = React.useState(false);

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };

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
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden pt-6">
      <Hero handleOrderPopup={handleOrderPopup} />
      <Cetegory />
      {/* <Cetagory2 /> */}
      <Services />
      <Banner data={BannerData} />
      <Products />
      <Banner data={BannerData2} />
      <Blog />
      <Partner />
      <Footer />
      <Popup orderPopup={orderPopup} handleOrderPopup={handleOrderPopup} />
    </div>
  );
}

export default App;

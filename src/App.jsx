import Cetagory2 from "./components/Cetegory/Cetagory2";
import Cetegory from "./components/Cetegory/Cetegory";
import Hero from "./components/Hero/Hero";
import Navbar from "./components/Navbar/Navbar";
import React, { useEffect, useState } from "react";
import Services from "./components/Services/Services";
import Banner from "./components/Banner/Banner";
import headphone from "./assets/Hero/headphone.png";
import smartwatch2 from "./assets/cetegory/smartwatch2.png";
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
    title: "Fine Smile",
    date: "10 Jan to 28 Jan",
    image: headphone,
    title2: "Air Solo Bass",
    title3: "Winter Sale",
    title4:
      "Headphones let a single user listen to an audio source privately, in contrast to a loudspeaker, which emits sound into the open air for anyone nearby to hear. ",
    bgColor: "#f42c37",
  };

  const BannerData2 = {
    discount: "30% OFF",
    title: "Happy Hours",
    date: "14 Jan to 28 Jan",
    image: smartwatch2,
    title2: "Smart Solo",
    title3: "Winter Sale",
    title4:
      "A smartwatch is a portable device worn on the wrist that supports apps and acts as an extension of your mobile phone in some cases.",
    bgColor: "#2dcc6f",
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
      <Cetagory2 />
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

import React from "react";
import Heading from "../Shered/Heading";
import Img1 from "../../assets/blog/blog-1.png";
import Img2 from "../../assets/blog/blog-2.png";
import Img3 from "../../assets/blog/blog-3.png";

const BlogData = [
  {
    id: 1,
    title: "🌱 How to choose the freshest vegetables",
    subtitle:"Finding truly fresh vegetables can make all the difference in taste and nutrition. Always check for bright color, firm texture, and a natural aroma. Avoid wilted leaves or soft spots — they’re signs of aging produce. Fresh vegetables not only enhance your dishes but also boost your health with maximum vitamins and minerals.",
    published: "Jan 20, 2024 by Dilshad",
    image: Img1,
    aosDelay: "0",
  },
  {
    id: 2,
    title: "🥕 Keep your veggies fresh for days",
    subtitle:"Proper storage helps your vegetables stay crisp and flavorful. Leafy greens prefer moisture, so wrap them in a damp cloth before refrigerating. Root vegetables like carrots and potatoes last longer in cool, dark spaces. Store tomatoes at room temperature to preserve their natural taste and juiciness. Small care can save big waste!",
    published: "Jan 20, 2024 by Satya",
    image: Img2,
    aosDelay: "200",
  },
  {
    id: 3,
    title: "🍅 Why seasonal veggies are the healthiest choice",
    subtitle:"Eating vegetables that grow in their natural season means more nutrients and better flavor. Seasonal produce is fresher, cheaper, and supports local farmers. From crisp cucumbers in summer to sweet carrots in winter — nature provides what your body needs most, just at the right time.",
    published: "Jan 20, 2024 by Sabir",
    image: Img3,
    aosDelay: "400",
  },
];
const Blog = () => {
  return (
    <div>
      <div className="container">
        <Heading title="Recent News" subtitle={"Explore Our Blog"} />
        <div className="my-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-9 sm:gap-5">
            {BlogData.map((data) => (
              <div
                data-aos="fade-up"
                data-aos-delay={data.aosDelay}
                key={data.id}
              >
                <img
                  src={data.image}
                  alt=""
                  className="h-[250px] w-full object-cover rounded-2xl sm:h-[250px]"
                />
                <p className="text-sm text-gray-500 mt-2">{data.published}</p>
                <p className="font-bold my-2 line-clamp-1">{data.title}</p>
                <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                  {data.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;

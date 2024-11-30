import React from "react";
import Heading from "../Shered/Heading";
import Img1 from "../../assets/blog/blog-1.jpg";
import Img2 from "../../assets/blog/blog-2.jpg";
import Img3 from "../../assets/blog/blog-3.jpg";

const BlogData = [
  {
    id: 1,
    title: "How to choose perfect smartwatch",
    subtitle:
      "minima facere deserunt vero illo beatae deleniti eius dolores consequuntur, eligendi corporis maiores molestiae laudantium. Porro?",
    published: "Jan 20, 2024 by Dilshad",
    image: Img1,
    aosDelay: "0",
  },
  {
    id: 2,
    title: "How to choose perfect gadget",
    subtitle:
      "minima facere deserunt vero illo beatae deleniti eius dolores consequuntur, eligendi corporis maiores molestiae laudantium. Porro?",
    published: "Jan 20, 2024 by Satya",
    image: Img2,
    aosDelay: "200",
  },
  {
    id: 3,
    title: "How to choose perfect VR headset",
    subtitle:
      "minima facere deserunt vero illo beatae deleniti eius dolores consequuntur, eligendi corporis maiores molestiae laudantium. Porro?",
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
                  className="h-[230px] w-full rounded-2xl sm:h-[220px]"
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

import React from "react";
import { motion } from "framer-motion";
import Heading from "../Shered/Heading";
import Img1 from "../../assets/blog/blog-1.png";
import Img2 from "../../assets/blog/blog-2.png";
import Img3 from "../../assets/blog/blog-3.png";

const posts = [
  { id: 1, title: "How to choose the freshest vegetables", subtitle: "Finding truly fresh vegetables can make all the difference in taste and nutrition. Always check for bright color, firm texture, and a natural aroma...", published: "Jan 20, 2024 by Dilshad", image: Img1 },
  { id: 2, title: "Keep your veggies fresh for days", subtitle: "Proper storage helps your vegetables stay crisp and flavorful. Leafy greens prefer moisture, so wrap them in a damp cloth before refrigerating...", published: "Jan 20, 2024 by Satya", image: Img2 },
  { id: 3, title: "Why seasonal veggies are the healthiest choice", subtitle: "Eating vegetables that grow in their natural season means more nutrients and better flavor. Seasonal produce is fresher, cheaper, and supports local farmers...", published: "Jan 20, 2024 by Sabir", image: Img3 },
];

const Blog = () => {
  return (
    <div>
      <div className="container">
        <Heading title="Recent News" subtitle="Explore Our Blog" />
        <div className="my-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-9 sm:gap-5">
            {posts.map((data, i) => (
              <motion.div
                key={data.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6 }}
              >
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden rounded-2xl"
                >
                  <img src={data.image} alt="" className="h-[250px] w-full object-cover sm:h-[250px]" />
                </motion.div>
                <p className="text-sm text-gray-500 mt-2">{data.published}</p>
                <p className="font-bold my-2 line-clamp-1 dark:text-white">{data.title}</p>
                <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400">{data.subtitle}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;

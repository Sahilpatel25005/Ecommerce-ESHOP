// src/pages/Blog.js
import React from "react";

function MBlog() {
  const blogPosts = [
    {
      id: 1,
      title: "Why You Need Wireless Headphones",
      excerpt: "Learn about the benefits of wireless headphones.",
    },
    {
      id: 2,
      title: "Top 5 Smart Watches for 2025",
      excerpt: "Check out the top 5 smart watches in 2025.",
    },
    // Add more blog posts here
  ];

  return (
    <div>
      <h1>Our Blog</h1>
      {blogPosts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.excerpt}</p>
        </div>
      ))}
    </div>
  );
}

export default MBlog;

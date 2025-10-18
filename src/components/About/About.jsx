import React from "react";

function About() {
  return (
    <>
      <div className="w-full min-h-screen bg-gradient-to-b from-green-50 to-green-100 dark:from-gray-800 py-10">
        <div className="max-w-3xl mx-auto   shadow-lg rounded-2xl p-8 border border-green-200">
          <h1 className="text-center text-4xl font-bold text-green-700 font-serif mb-4">
            About Fresho
          </h1>
          <hr className="border-green-400 mb-6 w-1/2 mx-auto" />

          <p className="dark:text-white text-gray-700 leading-relaxed text-lg text-center">
            Welcome to <span className="font-semibold text-green-700">Fresho</span>,
            your trusted online marketplace for farm-fresh vegetables and organic produce.
            We bring the goodness of nature directly from the fields to your doorstep.
          </p>

          <div className="mt-10">
            <h2 className="text-3xl font-semibold text-green-700 text-center mb-3 font-serif">
              Our Story
            </h2>
            <hr className="border-green-300 w-1/3 mx-auto mb-4" />
            <p className="dark:text-white text-gray-700 leading-relaxed">
              Fresho began with a simple idea — to connect people with
              fresh, chemical-free vegetables grown by local farmers. Our journey started
              when we realized how difficult it was to find truly fresh and sustainably
              grown produce in urban areas. Today, we partner with trusted farms to deliver
              vegetables that are crisp, healthy, and full of flavor.
            </p>
          </div>

          <div className="mt-10">
            <h2 className="text-3xl font-semibold text-green-700 text-center mb-3 font-serif">
              Our Mission
            </h2>
            <hr className="border-green-300 w-1/3 mx-auto mb-4" />
            <p className="dark:text-white text-gray-700 leading-relaxed">
              Our mission is to promote healthy eating and sustainable farming. We aim to
              make it easy for every household to enjoy nutritious vegetables while supporting
              local farmers and eco-friendly practices.
            </p>
          </div>

          <div className="mt-10">
            <h2 className="text-3xl font-semibold text-green-700 text-center mb-3 font-serif">
              Why Choose Fresho?
            </h2>
            <hr className="border-green-300 w-1/3 mx-auto mb-4" />
            <ul className="list-disc list-inside dark:text-white text-gray-700 space-y-3 leading-relaxed">
              <li>
                <span className="font-semibold text-green-700">Farm-Fresh Guarantee:</span> 
                We deliver vegetables picked within 24 hours of harvest.
              </li>
              <li>
                <span className="font-semibold text-green-700">100% Organic:</span> 
                No harmful chemicals, pesticides, or preservatives.
              </li>
              <li>
                <span className="font-semibold text-green-700">Support Local Farmers:</span> 
                Every purchase helps empower small-scale growers.
              </li>
              <li>
                <span className="font-semibold text-green-700">Eco-Friendly Packaging:</span> 
                We use biodegradable and reusable packaging to reduce waste.
              </li>
              <li>
                <span className="font-semibold text-green-700">Fast & Fresh Delivery:</span> 
                Quick doorstep delivery ensures freshness and quality.
              </li>
            </ul>
          </div>

          <div className="mt-10 text-center">
            <h2 className="text-3xl font-semibold text-green-700 mb-3 font-serif">
              Join Our Green Community
            </h2>
            <hr className="border-green-300 w-1/3 mx-auto mb-4" />
            <p className="dark:text-white text-gray-700 leading-relaxed mb-3">
              Be part of a growing family that values health, freshness, and sustainability.
              Discover new seasonal produce, learn healthy recipes, and enjoy exclusive offers.
            </p>
            <p className="dark:text-white text-gray-700 font-semibold">The Fresho Team 🌱</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;

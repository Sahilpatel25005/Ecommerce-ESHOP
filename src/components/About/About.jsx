import React from "react";

function About() {
  return (
    <>
      <div className="container mt-5 w-full h-auto pb-10">
        <div>
          <div className="sm:w-[50%] w-[85%] m-auto mt-5 font-serif tracking-wider">
            <h1 className="text-center font-serif tracking-wide text-3xl font-semibold ">
              {" "}
              About Us{" "}
            </h1>
            <hr />
            <div className="flex gap-3 justify-center items-start mt-5">
              <p>
                Welcome to ESHOP, your one-stop destination for all your
                shopping needs!
              </p>
            </div>

            <div className="flex gap-3 mt-5">
              <p>
                <span className="font-semibold">
                  We started ESHOP with a simple vision:{" "}
                </span>
                to make online shopping easy, reliable, and enjoyable for
                everyone. We believe that quality products and exceptional
                customer service should go hand in hand, creating a seamless
                experience for our customers.
              </p>{" "}
            </div>

            <div className="mt-10">
              <h1 className="text-center font-serif tracking-wide text-3xl font-semibold">
                {" "}
                Our Mission{" "}
              </h1>
              <hr />
              <div className="mt-5">
                <div className="flex gap-3 mt-5">
                  <p>
                    To provide high-quality products at affordable prices and
                    deliver a hassle-free shopping experience that you can
                    trust.
                  </p>{" "}
                </div>
              </div>
            </div>

            <div className="mt-10">
              <h1 className="text-center font-serif tracking-wide text-3xl font-semibold">
                {" "}
                Why Choose Us?{" "}
              </h1>
              <hr />
              <div className="mt-5">
                <div className="flex gap-9 mt-5 flex-col">
                  <p>
                    <span className="font-semibold">
                      Wide Range of Products:{" "}
                    </span>
                    Wide Range of Products: From fashion and electronics to home
                    decor and daily essentials, we offer a diverse selection to
                    meet all your needs.
                  </p>

                  <p>
                    <span className="font-semibold">Secure Shopping:</span> Your
                    safety is our priority. We use advanced security measures to
                    protect your personal information and transactions.
                  </p>

                  <p>
                    <span className="font-semibold">Fast Delivery:</span> Enjoy
                    quick and reliable shipping, ensuring your orders reach your
                    doorstep in no time.
                  </p>

                  <p>
                    <span className="font-semibold">
                      Excellent Customer Support:
                    </span>
                    Our friendly support team is here to assist you, answering
                    your queries and resolving any issues.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-10">
              <h1 className="text-center font-serif tracking-wide text-3xl font-semibold">
                {" "}
                Join Our Community{" "}
              </h1>
              <hr />
              <div className="mt-5">
                <div className="flex gap-9 mt-5 flex-col">
                  <p>
                    At ESHOP, we’re more than just an online store – we’re a
                    growing community of happy customers. Explore our
                    collections, find your favorite items, and enjoy exclusive
                    deals.
                  </p>{" "}
                  <p>
                    Thank you for choosing ESHOP. We’re excited to serve you and
                    be a part of your shopping journey!
                  </p>
                  <p>The ESHOP Team</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;

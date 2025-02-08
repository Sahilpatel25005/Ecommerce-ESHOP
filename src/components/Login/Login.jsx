// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import AOS from "aos";
// import "aos/dist/aos.css";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     AOS.init({
//       duration: 1000,
//       easing: "ease-in-out",
//     });
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     setPasswordError("");
//     setEmailError("");

//     const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

//     if (!emailPattern.test(email)) {
//       setEmailError("Please enter a valid email address.");
//       return;
//     }

//     navigate("/");

//     console.log("Email:", email);
//     console.log("Password:", password);
//   };

//   return (
//     <div className="min-h-screen bg-cover bg-center flex items-center justify-center bg-black">
//       <div className="absolute inset-0 bg-black opacity-50"></div>

//       <div
//         className="relative bg-white w-full max-w-md p-8 rounded-lg shadow-lg backdrop-blur-sm bg-opacity-70"
//         data-aos="fade-up"
//       >
//         <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
//           Login to Your Account
//         </h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4" data-aos="fade-right">
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//             />
//             {emailError && (
//               <div className="text-red-500 text-sm mt-2">{emailError}</div>
//             )}
//           </div>
//           <div className="mb-6" data-aos="fade-left">
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//             />
//             {passwordError && (
//               <div className="text-red-500 text-sm mt-2">{passwordError}</div>
//             )}
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-primary text-white py-2 rounded-md text-lg font-semibold focus:outline-none hover:bg-blue-600 transition duration-300 ease-in-out"
//             data-aos="zoom-in"
//             onClick={handleSubmit}
//           >
//             Login
//           </button>

//           <div className="text-center mt-4">
//             <Link
//               to="/forgot-password"
//               className="text-sm text-gray-600 hover:text-primary"
//               data-aos="fade-up"
//             >
//               Forgot your password?
//             </Link>
//           </div>

//           <div className="text-center mt-4">
//             <p className="text-sm text-gray-600">
//               Don't have an account?{" "}
//               <a
//                 href="#"
//                 className="text-primary font-semibold hover:text-blue-600"
//               >
//                 Sign Up
//               </a>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loginError, setLoginError] = useState(""); 
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    setPasswordError("");
    setEmailError("");
    setLoginError(""); 

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailPattern.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    const is404Error = true; 
    if (is404Error) {
      setLoginError("Invalid username or password");
      return;
    }

    navigate("/");

    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center bg-black">
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div
        className="relative bg-white w-full max-w-md p-8 rounded-lg shadow-lg backdrop-blur-sm bg-opacity-70"
        data-aos="fade-up"
      >
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
          Login to Your Account
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4" data-aos="fade-right">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            {emailError && (
              <div className="text-red-500 text-sm mt-2">{emailError}</div>
            )}
          </div>
          <div className="mb-6" data-aos="fade-left">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            {passwordError && (
              <div className="text-red-500 text-sm mt-2">{passwordError}</div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md text-lg font-semibold focus:outline-none hover:bg-blue-600 transition duration-300 ease-in-out"
            data-aos="zoom-in"
          >
            Login
          </button>

          {loginError && (
            <div className="text-red-500 text-sm mt-4">{loginError}</div>
          )}

          <div className="text-center mt-4">
            <Link
              to="/forgot-password"
              className="text-sm text-gray-600 hover:text-primary"
              data-aos="fade-up"
            >
              Forgot your password?
            </Link>
          </div>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a
                href="#"
                className="text-primary font-semibold hover:text-blue-600"
              >
                Sign Up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;



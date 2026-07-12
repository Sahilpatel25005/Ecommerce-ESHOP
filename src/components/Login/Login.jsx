import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import apiCall from "../../APIcall/APIcall"; // ensure apiCall uses credentials: "include"
import { useDispatch } from "react-redux";
// import your redux action if you use one, e.g. setUser
// import { setUser } from "../Slice/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out" });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setLoginError("");
    setLoading(true);

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setEmailError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    const data = { email, password };

    try {
      // Call login - backend will set HttpOnly cookie (no token returned)
      const res = await apiCall("/login/", "POST", data);

      if (res?.error) {
        setLoginError(res.error);
        setLoading(false);
        return;
      }

      // Success: now fetch /login/me to get user details (cookie is sent automatically)
      try {
        const me = await apiCall("/login/me", "GET");
        // If you use Redux, store user info:
        // dispatch(setUser(me.user));
        // Otherwise you can store minimal info in local state
        navigate("/Home");
      } catch (meErr) {
        console.error("Failed to fetch user after login:", meErr);
        setLoginError("Login succeeded but failed to fetch user details.");
      }
    } catch (error) {
      console.error("Login error:", error);
      // If backend returns structured error, apiCall throws Error with message
      setLoginError(error.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
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

        {loading && (
          <div className="flex justify-center mb-4">
            <div className="w-9 h-9 border-4 border-black border-dashed rounded-full animate-spin"></div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4" data-aos="fade-right">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
            {emailError && <div className="text-red-500 text-sm mt-2">{emailError}</div>}
          </div>

          <div className="mb-6" data-aos="fade-left">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
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
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md text-lg font-semibold focus:outline-none hover:bg-blue-600 transition duration-300 ease-in-out"
            data-aos="zoom-in"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {loginError && <h1 className="text-center text-red-500 mt-3">{loginError}</h1>}

          <div className="text-center mt-4">
            <Link to="/forgot-password" className="text-sm text-blue-900 hover:text-primary">
              Forgot your password?
            </Link>
          </div>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-sm text-blue-900 hover:text-primary">
                Signup
              </Link>
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Login for Admin{" "}
              <Link to="/admin" className="text-sm text-blue-900 hover:text-primary">
                Admin
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

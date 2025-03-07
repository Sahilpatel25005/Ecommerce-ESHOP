import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import apiCall from "../../APIcall/APIcall";

const Registration = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // 👈 Loader state
  const navigate = useNavigate();

  const validate = () => {
    let errors = {};

    if (!firstName) errors.firstName = "First name is required";
    if (!lastName) errors.lastName = "Last name is required";
    if (!phoneNumber) errors.phoneNumber = "Phone number is required";
    if (!email) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";
    if (!address) errors.address = "Address is required";

    const phonePattern = /^[0-9]{10}$/;
    if (phoneNumber && !phonePattern.test(phoneNumber)) {
      errors.phoneNumber = "Please enter a valid phone number";
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email && !emailPattern.test(email)) {
      errors.email = "Please enter a valid email address";
    }

    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}|:<>?.,]).{8,}$/;
    if (password && !passwordPattern.test(password)) {
      errors.password =
        "Password must contain at least 8 characters, including uppercase, lowercase, number and special character";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    if (validate()) {
      setLoading(true); // Start loader
      const registrationData = {
        fname: firstName,
        lname: lastName,
        email: email,
        monumber: phoneNumber,
        password: password,
        address: address,
      };

      try {
        const response = await apiCall("/register", "POST", registrationData);
        if (!response.massage) {
          throw new Error("Registration failed");
        }
        navigate("/login");
      } catch (error) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          apiError: error.message,
        }));
      } finally {
        setLoading(false); // Stop loader
      }
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center bg-black">
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative bg-white w-full max-w-md sm:max-w-lg md:max-w-xl p-6 sm:p-8 rounded-lg shadow-lg backdrop-blur-sm bg-opacity-70">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
          Registration Form
        </h2>

        {/* Loader */}
        {loading && (
          <div className="flex justify-center mb-4">
            <div className="w-9 h-9 border-4 border-black border-dashed rounded-full animate-spin"></div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            {errors.firstName && (
              <div className="text-red-500 text-sm mt-2">
                {errors.firstName}
              </div>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            {errors.lastName && (
              <div className="text-red-500 text-sm mt-2">{errors.lastName}</div>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            {errors.phoneNumber && (
              <div className="text-red-500 text-sm mt-2">
                {errors.phoneNumber}
              </div>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            {errors.email && (
              <div className="text-red-500 text-sm mt-2">{errors.email}</div>
            )}
          </div>

          <div className="mb-4">
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
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            {errors.password && (
              <div className="text-red-500 text-sm mt-2">{errors.password}</div>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            {errors.address && (
              <div className="text-red-500 text-sm mt-2">{errors.address}</div>
            )}
          </div>

          {errors.apiError && (
            <div className="text-red-500 text-sm mb-4">{errors.apiError}</div>
          )}

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md text-lg font-semibold focus:outline-none hover:bg-blue-600 transition duration-300 ease-in-out"
            disabled={loading} // Disable button while loading
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary font-semibold hover:text-blue-600"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;

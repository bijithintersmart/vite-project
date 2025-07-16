import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import EyeOpen from "../assets/eye-open.svg";
import EyeClosed from "../assets/eye-closed.svg";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [signupError, setSignupError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const imageInputRef = useRef(null); // Ref for the file input

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    if (imageInputRef.current) {
      imageInputRef.current.value = ""; // Clear the file input
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    if (!name) {
      setNameError("Name is required");
      valid = false;
    } else {
      setNameError("");
    }

    if (!email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (valid) {
      setLoading(true);
      setSignupError("");
      try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        if (image) {
          formData.append("image", image);
        }
        const response = await fetch(
          "https://test-project-26ku.onrender.com/auth/register",
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          navigate("/login"); 
        } else {
          const errorData = await response.json();
          setSignupError(errorData.message || "Sign up failed. Please try again.");
        }
      } catch (error) {
        console.error("Sign up failed:", error);
        setSignupError("An unexpected error occurred. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-800 p-4">
      <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
        {/* Left Side: Sign Up Form */}
        <div className="w-full md:w-1/2 p-8 space-y-6 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">Create an Account</h2>
          <p className="text-center text-gray-500 dark:text-gray-300">Join us and start your journey!</p>
          {signupError && (
            <p className="mt-2 text-sm text-red-600 text-center bg-red-100 dark:bg-red-900 dark:text-red-200 p-3 rounded-lg">{signupError}</p>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full px-4 py-3 mt-1 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm"
              />
              {nameError && (
                <p className="mt-2 text-sm text-red-600">{nameError}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-4 py-3 mt-1 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm"
              />
              {emailError && (
                <p className="mt-2 text-sm text-red-600">{emailError}</p>
              )}
            </div>
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-3 pr-12 mt-1 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center justify-center w-12"
              >
                <img
                  src={showPassword ? EyeClosed : EyeOpen}
                  alt="Toggle password visibility"
                  className="h-6 w-6"
                />
              </button>
            </div>
            {passwordError && (
              <p className="mt-2 text-sm text-red-600">{passwordError}</p>
            )}
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Profile Image (Optional)
              </label>
              <div className="flex items-center space-x-2">
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={imageInputRef}
                  className="block w-full text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm
                             file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold
                             file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 file:cursor-pointer"
                />
                {image && (
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-3 text-sm font-semibold text-white bg-indigo-600 border border-transparent rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 transition-all duration-300 ease-in-out"
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
            </div>
          </form>
        </div>

        {/* Right Side: Title, Description, etc. */}
        <div className="w-full md:w-1/2 bg-indigo-600 text-white p-8 flex flex-col justify-center items-center text-center">
          <h2 className="text-4xl font-bold mb-4">Welcome!</h2>
          <p className="text-lg mb-6">Already have an account? Sign in here!</p>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 text-indigo-600 bg-white rounded-lg shadow-md hover:bg-gray-100 transition-all duration-300 ease-in-out"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
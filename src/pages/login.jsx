import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EyeOpen from "../assets/eye-open.svg";
import EyeClosed from "../assets/eye-closed.svg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

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
    } else {
      setPasswordError("");
    }

    if (valid) {
      setLoading(true);
      setLoginError("");
      try {
        const response = await fetch(
          "https://test-project-26ku.onrender.com/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          }
        );

        if (response.ok) {
          navigate("/");
        } else {
          const errorData = await response.json();
          setLoginError(errorData.message || "Invalid email or password");
        }
      } catch (error) {
        console.error("Login failed:", error);
        setLoginError("Failed to connect to the server. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-800 p-4">
      <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
        {/* Left Side: Login Form */}
        <div className="w-full md:w-1/2 p-8 space-y-6 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
            Welcome Back
          </h2>
          <p className="text-center text-gray-500 dark:text-gray-300">
            Sign in to continue to your account
          </p>
          {loginError && (
            <p className="mt-2 text-sm text-red-600 text-center bg-red-100 dark:bg-red-900 dark:text-red-200 p-3 rounded-lg">
              {loginError}
            </p>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
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
              {passwordError && (
                <p className="mt-2 text-sm text-red-600">{passwordError}</p>
              )}
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-3 text-sm font-semibold text-white bg-indigo-600 border border-transparent rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 transition-all duration-300 ease-in-out"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </div>
          </form>
        </div>

        {/* Right Side: Title, Description, etc. */}
        <div className="w-full md:w-1/2 bg-indigo-600 text-white p-8 flex flex-col justify-center items-center text-center">
          <h2 className="text-4xl font-bold mb-4">New Here?</h2>
          <p className="text-lg mb-6">
            Sign up and discover a great amount of new opportunities!
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="px-6 py-3 text-indigo-600 bg-white rounded-lg shadow-md hover:bg-gray-100 transition-all duration-300 ease-in-out"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
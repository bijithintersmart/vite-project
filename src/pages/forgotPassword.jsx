import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import EyeOpen from "../assets/eye-open.svg";
import EyeClosed from "../assets/eye-closed.svg";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    setMessage("");

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
      setPasswordError("New password is required");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (valid) {
      setLoading(true);
      try {
        // Placeholder for API call
        const response = await fetch(
          "https://test-project-26ku.onrender.com/auth/forgot-password",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, newPassword: password }),
          }
        );

        if (response.ok) {
          setMessage("Password reset successfully. You can now log in.");
          setTimeout(() => navigate("/g"), 3000);
        } else {
          const errorData = await response.json();
          setMessage(errorData.message || "Failed to reset password. Please try again.");
        }

        // // Simulate API call success
        // await new Promise(resolve => setTimeout(resolve, 1500));
        // setMessage("Password reset successfully. You can now log in.");
        // setTimeout(() => navigate("/login"), 3000);

      } catch (error) {
        console.error("Forgot password failed:", error);
        setMessage("An unexpected error occurred. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-800 p-4">
      <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
        {/* Left Side: Forgot Password Form */}
        <div className="w-full md:w-1/2 p-8 space-y-6 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">Forgot Password</h2>
          <p className="text-center text-gray-500 dark:text-gray-300">Enter your email and new password to reset.</p>
          {message && (
            <p className={`mt-2 text-sm text-center p-3 rounded-lg ${
              message.includes("successfully") ? "text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200" : "text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200"
            }`}>
              {message}
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
                New Password
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
              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-3 text-sm font-semibold text-white bg-indigo-600 border border-transparent rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 transition-all duration-300 ease-in-out"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </div>
          </form>
        </div>

        {/* Right Side: Title, Description, etc. */}
        <div className="w-full md:w-1/2 bg-indigo-600 text-white p-8 flex flex-col justify-center items-center text-center">
          <h2 className="text-4xl font-bold mb-4">Remembered your password?</h2>
          <p className="text-lg mb-6">You can log in with your existing credentials.</p>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 text-indigo-600 bg-white rounded-lg shadow-md hover:bg-gray-100 transition-all duration-300 ease-in-out"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email.");
      return;
    }

    try {
      const response = await axios.post(
        "https://carbot-w720.onrender.com/forgot-password", 
        { email }
      );
      
      setMessage("If the email exists, a reset link will be sent.");
      setError(""); // Clear any previous error
      setEmail(""); // Reset email field after submission
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to send reset link. Try again.");
      setMessage("");
    }
  };

  return (
    <div className="bg-gray-800 h-screen flex justify-center items-center font-antonio">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md animate__animated animate__fadeIn animate__delay-0.5s">
        <h2 className="text-4xl font-extrabold text-center text-green-600 mb-6">Forgot Password</h2>
        
        <div className="mb-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-5 text-xl rounded-lg border border-gray-400 focus:outline-none focus:ring-4 focus:ring-green-500 mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        
        <button
          className="w-full bg-green-600 text-white text-2xl px-8 py-4 rounded-lg hover:bg-green-700 transition duration-300 transform hover:scale-105 shadow-lg"
          onClick={handleForgotPassword}
        >
          Send Reset Link
        </button>

        {error && <p className="text-red-600 text-center mt-4">{error}</p>}
        {message && <p className="text-green-600 text-center mt-4">{message}</p>}
      </div>
    </div>
  );
}

export default ForgotPassword;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./header";
import FloatingContactIcon from "./contact";
import Footer from "./footer";
import "animate.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      const response = await axios.post("https://carbot-ha6v.onrender.com/token", formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("email", response.data.email);
      navigate("/chat");
    } catch (err) {
      setError(err.response?.data?.detail || "Invalid username or password.");
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-800 font-antonio">
      <Header /> 

      <div className="flex-grow flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-4xl animate__animated animate__fadeIn animate__delay-0.5s">
          <h2 className="text-4xl font-extrabold text-center text-green-600 mb-6">
            Sign In
          </h2>
          {error && <p className="text-red-600 text-center mb-4">{error}</p>}

          <input
            type="text"
            placeholder="Username or Email"
            className="w-full p-5 text-xl rounded-lg border border-gray-400 focus:outline-none focus:ring-4 focus:ring-green-500 mb-4"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-5 text-xl rounded-lg border border-gray-400 focus:outline-none focus:ring-4 focus:ring-green-500 mb-6"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-full bg-green-600 text-white text-2xl px-8 py-4 rounded-lg hover:bg-green-700 transition duration-300 transform hover:scale-105 shadow-lg font-antonio"
            onClick={handleLogin}
          >
            Login
          </button>
          
          <div className="text-center mt-4">
            <p className="text-2xl">
              Don't have an account?{" "}
              <span
                onClick={() => navigate("/register")}
                className="text-green-600 cursor-pointer hover:underline"
              >
                Sign Up
              </span>
            </p>
            {/* Forgot Password Button */}
            <p className="text-2xl mt-2">
              Forgot your password?{" "}
              <span
                onClick={() => navigate("/forgot_password")}
                className="text-green-600 cursor-pointer hover:underline"
              >
                Reset Password
              </span>
            </p>
          </div>
        </div>
      </div>

      <FloatingContactIcon />

      <Footer />
    </div>
  );
}

export default Login;

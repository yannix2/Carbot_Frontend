import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./header";
import FloatingContactIcon from "./contact";
import Footer from "./footer";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");  // Added state for success message
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      // Create a FormData object to send the data as multipart/form-data
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);

      // Make a POST request to register the user
      await axios.post("https://carbot-75uf.onrender.com/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // On successful registration, set success message and reset form data
      setSuccessMessage(
        "Registration successful! Please check your email to verify your account."
      );
      setUsername("");
      setEmail("");
      setPassword("");
      setError(""); // Clear any previous errors
    } catch (err) {
      // Handle error (show an error message)
      setError(err.response?.data?.detail || "Registration failed. Try again.");
      setSuccessMessage(""); // Clear any previous success message if an error occurs
    }
  };

  return (
    <div className="bg-gray-800 my-4 h-screen flex justify-center items-center font-antonio">
      <Header />
      <div className="bg-white px-4 py-2 pb-2 rounded-lg shadow-2xl w-full max-w-4xl animate__animated animate__fadeIn animate__delay-0.5s">
        <h2 className="text-4xl font-extrabold text-center text-green-600 mb-6">
          Sign Up
        </h2>

        {/* Show success message */}
        {successMessage && (
          <p className="text-green-600 text-center mb-4">{successMessage}</p>
        )}

        {/* Show error message */}
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          className="w-full p-5 text-xl rounded-lg border border-gray-400 focus:outline-none focus:ring-4 focus:ring-green-500 mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-5 text-xl rounded-lg border border-gray-400 focus:outline-none focus:ring-4 focus:ring-green-500 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-5 text-xl rounded-lg border border-gray-400 focus:outline-none focus:ring-4 focus:ring-green-500 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-green-600 text-white text-2xl px-8 py-4 rounded-lg hover:bg-green-700 transition duration-300 transform hover:scale-105 shadow-lg font-antonio"
          onClick={handleRegister}
        >
          Register
        </button>
        <div className="text-center mt-4">
          <p className="text-xl">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-green-600 cursor-pointer hover:underline"
            >
              Sign In
            </span>
          </p>
        </div>
      </div>
      <FloatingContactIcon />
      <Footer />
      
    </div>
  );
}

export default Register;

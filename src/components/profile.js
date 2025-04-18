import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Get user details from local storage
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setError("New password and confirmation do not match.");
      return;
    }

    try {
      const response = await axios.put(
        "https://carbot-w720.onrender.com/update-password", 
        { old_password: oldPassword, new_password: newPassword },
        { headers: { "Authorization": `Bearer ${token}` } }
      );
      
      setSuccess("Password updated successfully.");
      setError(""); // Clear any previous error
      setOldPassword(""); // Reset fields after success
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        navigate("/chat");
      }, 2000); // Wait for 3 seconds before navigating
    } catch (err) {
      // Check for specific error codes (e.g., 401 Unauthorized for expired tokens)
      if (err.response?.status === 401) {
        setError("Session expired. Please log in again.");
        // Optionally navigate to the login page or perform other actions
        navigate("/login");
      } else {
        setError(err.response?.data?.detail || "Failed to update password. Try again.");
      }
      setSuccess(""); 
    }
  };

  return (
    <div className="bg-gray-800 h-screen flex justify-center items-center font-antonio">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-4xl animate__animated animate__fadeIn animate__delay-0.5s">
        <h2 className="text-4xl font-extrabold text-center text-green-600 mb-6">Profile</h2>
        
        <div className="mb-4">
          <p className="text-lg font-semibold">Username: {username || "No Username"}</p>
          <p className="text-lg font-semibold">Email: {email || "No Email"}</p>
        </div>
        
        <div className="mb-4">
          <input
            type="password"
            placeholder="Old Password"
            className="w-full p-5 text-xl rounded-lg border border-gray-400 focus:outline-none focus:ring-4 focus:ring-green-500 mb-4"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="New Password"
            className="w-full p-5 text-xl rounded-lg border border-gray-400 focus:outline-none focus:ring-4 focus:ring-green-500 mb-4"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            className="w-full p-5 text-xl rounded-lg border border-gray-400 focus:outline-none focus:ring-4 focus:ring-green-500 mb-6"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        
        <button
          className="w-full bg-green-600 text-white text-2xl px-8 py-4 rounded-lg hover:bg-green-700 transition duration-300 transform hover:scale-105 shadow-lg"
          onClick={handleChangePassword}
        >
          Change Password
        </button>

        {error && <p className="text-red-600 text-center mt-4">{error}</p>}
        {success && <p className="text-green-600 text-center mt-4">{success}</p>}
      </div>
    </div>
  );
}

export default Profile;

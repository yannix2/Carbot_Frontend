import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"; // useParams to access route params

function ResetPassword() {
  const { reset_token } = useParams();  // Get reset_token from URL parameter
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!reset_token) {
      setError("Invalid reset token.");
    }
  }, [reset_token]);

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        "https://carbot-75uf.onrender.com/reset-password",
        { reset_token, new_password: newPassword }
      );
      setSuccess("Password reset successfully!");
      setError("");  // Reset any previous errors

      // Redirect user to login page or home page after successful reset
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to reset password. Try again.");
      setSuccess("");
    }
  };

  return (
    <div className="bg-gray-800 h-screen flex justify-center items-center font-antonio">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-4xl">
        <h2 className="text-4xl font-extrabold text-center text-green-600 mb-6">
          Reset Your Password
        </h2>

        <div className="mb-4">
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
          onClick={handleResetPassword}
        >
          Reset Password
        </button>

        {error && <p className="text-red-600 text-center mt-4">{error}</p>}
        {success && <p className="text-green-600 text-center mt-4">{success}</p>}
      </div>
    </div>
  );
}

export default ResetPassword;

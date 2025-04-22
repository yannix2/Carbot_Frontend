import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function VerifyAccount() {
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // To show a loading state while verifying
  const navigate = useNavigate();
  const location = useLocation();

  // Get the token from the URL query parameters
  const urlParams = new URLSearchParams(location.search);
  const token = urlParams.get("token");

  useEffect(() => {
    // If the token exists, we can attempt to verify it automatically
    if (token) {
      verifyAccount(token);
    }
  }, [token]);

  const verifyAccount = async (token) => {
    try {
      // Send token as query parameter instead of in body
      const response = await axios.get(
        `https://carbot-ha6v.onrender.com/verify-account?token=${token}`
      );
      
      if (response.status === 200) {
        setIsVerified(true);
      } else {
        setError("Verification failed.");
      }
    } catch (err) {
      setError("Error verifying account.");
    }
  };
  

  const handleVerifyNow = async () => {
    // If the token exists, trigger verification
    if (token) {
      verifyAccount(token);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-800 font-antonio">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-4xl">
        <h2 className="text-4xl font-extrabold text-center text-green-600 mb-6">
          Account Verification
        </h2>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        {isVerified ? (
          <p className="text-green-600 text-center mb-4">
            Your account has been successfully verified!
          </p>
        ) : (
          <div className="text-center">
            <button
              className="w-full bg-green-600 text-white text-2xl px-8 py-4 rounded-lg hover:bg-green-700 transition duration-300 transform hover:scale-105"
              onClick={handleVerifyNow}
              disabled={loading} // Disable button while verifying
            >
              {loading ? "Verifying..." : "Verify Now"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default VerifyAccount;

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/login";
import Register from "./components/register";
import Home from "./components/Home";
import Chat from "./components/Chat";
import Profile from "./components/profile";
import ForgotPassword from "./components/forgot_password";
import ResetPassword from "./components/Reset_password";
import VerifyAccount from "./components/verify_account";
function App() {
  const isAuthenticated = localStorage.getItem('token'); // Check if user is authenticated
  
  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={isAuthenticated ? <Navigate to="/chat" /> : <Home />} 
        />
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/chat" /> : <Login />} 
        />
        <Route 
          path="/register" 
          element={isAuthenticated ? <Navigate to="/chat" /> : <Register />} 
        />
          <Route 
          path="/forgot_password"
          element={isAuthenticated ? <Navigate to="/chat" /> : <ForgotPassword />} 
        />
        <Route 
          path="/profile" 
          element={
           <Profile />
          }
          />
          <Route 
           path="/verify-account" 
            element={isAuthenticated ? <Navigate to="/chat" /> : <VerifyAccount />} 
            />
        <Route 
          path="/chat" 
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          } 
        />
        <Route path="/reset-password/:reset_token" element={<ResetPassword />} />
      </Routes>
     
    </Router>
  );
}

export default App;

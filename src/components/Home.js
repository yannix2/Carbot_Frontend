import React, { useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logoh from '../assets/logoh.png';
import logo from '../assets/carb-high-resolution-logo-transparent (2).png';
import 'animate.css';  
import FloatingContactIcon from './contact';  
import { motion } from "framer-motion";
import axios from "axios";
// Contact Form Component

import { Linkedin, Facebook } from "lucide-react";


const ContactForm = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [messageError, setMessageError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email) {
      setEmailError("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }

    if (!message) {
      setMessageError("Message is required");
    } else {
      setMessageError("");
    }

    // If no errors, submit the form
    if (email && message && !emailError && !messageError) {
      try {
        const response = await axios.post(
          "https://carbot-w720.onrender.com/mailing", // URL of your backend mailing API
          new URLSearchParams({
            email: email,
            subject: "Contact Form Submission", // You can customize this
            message: message,
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        // On successful email submission
        setSuccessMessage("Email sent successfully!");
        setErrorMessage(""); // Clear any previous error message
        setEmail(""); // Clear email field
        setMessage(""); // Clear message field
      } catch (error) {
        // If error occurs while sending email
        setErrorMessage(
          error.response?.data?.detail || "Failed to send email. Try again."
        );
        setSuccessMessage(""); // Clear any previous success message
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl font-antonio mx-auto space-y-8 p-8 bg-gray-100 shadow-lg rounded-xl">
      <div className="space-y-4">
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-5 text-xl rounded-lg border border-gray-400 focus:outline-none focus:ring-4 focus:ring-green-500 transition duration-300"
          required
        />
        {emailError && <p className="text-red-600 text-sm">{emailError}</p>}
        
        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-5 text-xl rounded-lg border border-gray-400 focus:outline-none focus:ring-4 focus:ring-green-500 transition duration-300 h-40"
          required
        />
        {messageError && <p className="text-red-600 text-sm">{messageError}</p>}
      </div>
      <button
        type="submit"
        className="w-full bg-green-600 text-white text-2xl px-10 py-5 rounded-lg hover:bg-green-700 transition duration-300 transform hover:scale-105 shadow-md font-anton"
      >
        Send Message
      </button>
    </form>
  );
};


const Footer = () => (
<footer className=" bg-gray-800 text-white py-6 bottom-0 left-0 w-full z-50">
    <div className="text-center">
      <p>&copy; 2025 Carbot, All rights reserved.</p>
      <div className="flex justify-center items-center gap-4 mt-2 text-lg">
        <span>Follow Carbot on</span>
        <a
          href="https://www.linkedin.com/in/yassine-khiari-111150255/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-500 hover:text-green-300 transition duration-300"
        >
          <Linkedin size={28} />
        </a>
        <a
          href="https://www.facebook.com/y4nnix"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-500 hover:text-green-300 transition duration-300"
        >
          <Facebook size={28} />
        </a>
      </div>
    </div>
  </footer>
);

function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleTryNowClick = () => {
    if (token) {
      navigate("/chat");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="bg-gray-800 h-screen font-antonio relative ">
      <Navbar bg="gray-100" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand href="/" className="text-white font-bold">
            <img src={logoh} alt="Logo" className="w-96 h-auto" />
          </Navbar.Brand>
          <Nav className="ml-auto flex gap-6">
            <Button
              variant="outline-dark"
              className="text-2xl px-8 py-4 shadow-lg font-anton"
              onClick={() => navigate("/login")}
            >
              Sign In
            </Button>
            <Button
              variant="outline-success"
              className="text-2xl px-8 py-4 shadow-lg font-anton"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </Button>
          </Nav>
        </Container>
      </Navbar>

      <div className="flex flex-col my-24 justify-center items-center h-screen font-antonio">
        <div className="text-center  text-white py-24 px-4 max-w-8xl relative z-10 animate__animated animate__fadeIn animate__delay-0.5s">
          <h1 className="text-9xl font-extrabold text-green-600 space-x-3 drop-shadow-xl font-antonio py-2 ">
            WELCOME TO
          </h1>
          <div className="mb-12 w-auto h-auto animate__animated animate__fadeIn animate__delay-0.5s">
            <img src={logo} alt="Carbot Logo" className="w-2/4 mx-auto" />
          </div>
           <p className="text-5xl max-w-7xl font-thin mx-auto mb-8 animate__animated animate__fadeIn animate__delay-1s">
            <strong className="text-green-500 font-semibold"> Carbot</strong>  is your AI-powered auto parts assistant! 
            <p className="my-4">Whether you're a DIYer or a pro, find the perfect parts fast and </p>
            <p className="uppercase font-semibold text-green-300/90 my-8 "> keep your vehicle running smoothly</p>
          </p>
     
          <motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  className="bg-green-600 text-white text-6xl mt-12 px-12 p-6 rounded-lg hover:bg-green-700 transition duration-200 shadow-2xl"
  onClick={handleTryNowClick}
>
  Try Now
</motion.button>
        </div>
      </div>

      <div className="bg-white py-12 px-8 mt-12">
        <h2 className="text-5xl font-extrabold text-center mb-6 animate__animated animate__fadeIn animate__delay-1.5s font-anton">
          Contact Us
        </h2>
        <p className="text-center mb-6 text-2xl text-gray-600 animate__animated animate__fadeIn animate__delay-1.5s">
          If you have any questions or need support, feel free to reach out to us.
        </p>

        <ContactForm onSubmit={({ email, message }) => alert(`Message sent by ${email}!`)} />
      </div>

      <FloatingContactIcon />
      <Footer />
    </div>
  );
}

export default Home;

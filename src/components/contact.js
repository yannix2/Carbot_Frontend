// FloatingContactIcon.js
import React from "react";
import custo from "../assets/customer-service-support-svgrepo-com (1).svg"; // Import your icon image here
const FloatingContactIcon = () => (
  <a href="mailto:club.tunivisonstekup@gmail.com" className="fixed bottom-6   right-6 bg--700  p-2 rounded-full shadow-xl text-2xl text-white hover:bg-green-700 transition duration-300">
    <img src={custo} alt="Contact" className="w-24 h-24" />
  
  </a>
);

export default FloatingContactIcon;

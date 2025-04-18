// FloatingContactIcon.js
import React from "react";
import { Linkedin, Facebook } from "lucide-react";
import FloatingContactIcon from "./contact";
const Footer = () => ( 
   
  <footer className=" bg-opacity-10 text-white py-6 fixed bottom-0 left-0 w-full z-50">
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
    <FloatingContactIcon />
  </footer>
);

export default Footer;

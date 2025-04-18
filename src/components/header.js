import React from "react";
import logoh from "../assets/logoh.png";
import { Navbar, Container } from "react-bootstrap";

const Header = () => (
  <Navbar bg="gray-100" expand="lg" fixed="top" className="w-full flex justify-center py-2 shadow-lg">
    <Container className="flex justify-center">
      <Navbar.Brand href="/" className="flex justify-center w-full">
        <img src={logoh} alt="Logo" className="w-96 h-auto" />
      </Navbar.Brand>
    </Container>
  </Navbar>
);

export default Header;

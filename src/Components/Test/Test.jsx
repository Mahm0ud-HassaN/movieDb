
import React, { useState } from 'react';
import './Test.css'; // Import the CSS file

const Test = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage the mobile menu

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle the menu state
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Brand/Logo */}
        <div className="navbar-brand">
          <a href="/">MyBrand</a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button className="navbar-toggle" onClick={toggleMenu}>
          <span className="toggle-icon">&#9776;</span> {/* Hamburger icon */}
        </button>

        {/* Navbar Links */}
        <ul className={`navbar-links ${isOpen ? 'active' : ''}`}>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Test;
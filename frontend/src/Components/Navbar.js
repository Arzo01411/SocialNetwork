import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from  "../Resources/logo.png";

function Navbar() {
  const navigate = useNavigate();

  const navLogin = () => {
    navigate("/login");
  };

  const navRegister = () => {
    navigate("/register");
  };
  
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" width={170} height={45} />
      </div>
      <div className="navbar-buttons">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about-page">About</Link>
          </li>
          <li>
            <Link to="/contact-page">Contact Us</Link>
          </li>
          <li>
            <button onClick={navRegister}>Register</button>
          </li>
          <li>
            <button onClick={navLogin}>Login</button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

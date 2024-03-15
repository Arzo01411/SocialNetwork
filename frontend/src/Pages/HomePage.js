import React from 'react'
import '../style.css'
import Navbar from '../Components/Navbar';
import logo from  "../Resources/logo.png";

function HomePage() {
  return (
    <div className="home">
        < Navbar/>
      <div className="main">
        <div className="main-center">
          <img src={logo} alt="Logo" width={450} height={120}></img>
          <br></br>
          <p>Register a new account to continue</p>
        </div>
      </div>
    </div>
  )
}

export default HomePage
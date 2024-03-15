import React, { useEffect } from "react";
import '../style.css'

const Home = () => {
  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");

    if (jwtToken) {
      window.location.href = "/view-posts";
    } else {
      window.location.href = "/home-page";
    }
  }, []);

  return (
    <div>
      <h1>Welcome to the Social Media App</h1>
    </div>
  );
};

export default Home;

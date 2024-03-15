import React, { useState } from "react";
import Navbar from "../Components/Navbar";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("jwtToken", data.token);
        window.location.href = "/view-posts";
      } else {
        const errorData = await response.json();
        const errorMessage = errorData?.message || "Login failed";
        console.error("Login failed:", errorMessage);

        if (errorMessage.includes("User not found")) {
          alert("Username or password is incorrect.");
        } else {
          alert(errorMessage);
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("User Not Registered. Please Register.");
    }
  };

  return (
    <>
    < Navbar/>
    <div className="container">
      <h2>User Login</h2>
      <input
        type="text"
        id="login-username"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        id="login-password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={loginUser}>Login</button>
      <p>
        If not registered, <a href="/register">create an account</a>.
      </p>
    </div>
    </>
  );
};

export default Login;

import React, { useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/contact-page", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        alert("Message sent successfully!");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        alert("Error sending message. Please try again later.");
      }
    } catch (error) {
      console.error(error);
      alert("Error sending message. Please try again later.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container contact">
        <div className="contact-left">
          <h1>Contact Us</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam pariatur deleniti quae labore quo, consectetur aperiam unde autem, vero alias maiores fuga dignissimos mollitia eaque. Doloribus vero quasi praesentium iusto.</p>
        </div>
        <div className="contact-right">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <input
              type="email"
              id="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <input
              type="text"
              id="message"
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <br />
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ContactPage;

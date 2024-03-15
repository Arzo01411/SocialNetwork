import React from "react";
import Navbar from "../Components/Navbar";
import intro from "../Resources/intro.mp4";

function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="container about">
        <div className="about-left">
          <video
            src={intro}
            width="600"
            height="300"
            controls="controls"
            autoplay="true"
          />
        </div>
        <div className="about-right">
          <h1>About Us</h1>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius officia nostrum quaerat ipsam architecto ad cupiditate. Illum alias, iusto odio autem quas veritatis officiis eaque id, fuga in quo corrupti consequatur natus ducimus nostrum. Quisquam eaque quaerat unde omnis incidunt.</p>
        </div>
      </div>
    </>
  );
}

export default AboutPage;

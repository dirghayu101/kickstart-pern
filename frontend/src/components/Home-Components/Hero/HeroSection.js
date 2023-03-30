import React from "react";
import { useRef } from "react";
import "./HeroSection.css";

function HeroSection() {
  const myRef = useRef("home");
  return (
    <div className="hero-container" id="home">
      <img src="./images/img-home.jpg" alt="herobg" />
      <p>
        Make our space your office. <br /> What are you waiting for?
      </p>
    </div>
  );
}

export default HeroSection;

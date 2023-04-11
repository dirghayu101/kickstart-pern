import React from "react";
import Navbar from "../Home-Components/Navbar/Navbar.js";
import About from "../Home-Components/Pages/About.js";  //Has hook
import Plans from "../Home-Components/Pages/Plans.js";  //Has hook
import Contact from "../Home-Components/Pages/Contact.js";
import Faq from "../Home-Components/Pages/Faq.js";
import HeroSection from "../Home-Components/Hero/HeroSection.js";   //Home Route
import Footer from "../Home-Components/Footer/Footer.js";
import Slider from "../Home-Components/Reviews/Slider.js";
import "./Home.css"

function Home() {
  return (
    <>
        <Navbar />
        <HeroSection />
        <About />
        <Plans />
        <Contact />
        <Slider />
        <Faq />
        <Footer />
    </>
  );
}

export default Home

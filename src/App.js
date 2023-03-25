import React from 'react';
import Navbar from './components/Navbar/Navbar.js';
import './App.css';
import About from './components/Pages/About.js';
import Plans from './components/Pages/Plans.js';
import Contact from './components/Pages/Contact.js';
import Faq from './components/Pages/Faq.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from './components/Hero/HeroSection.js';
import Footer from './components/Footer/Footer.js';
import Slider from './components/Reviews/Slider.js';

function App() {
  return (
    
    <>
      <Router>
        <Navbar />
    <HeroSection/>
    <About/>
    <Plans/>
    <Contact/>
    <Slider/>
    <Faq/>
    {/* <Routes>
        <Route path='/about' element={<About />} />
        <Route path='/spaces' element={Spaces} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/signup' element={<Signup />} />
        </Routes> */}
        <Footer />
      </Router>
    </>
  );
}

export default App;

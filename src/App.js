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
//  import Login from './components/Login/Login.js';
// import Signup from './components/Signup/Signup.js';


function App() {
  return (
    // <Signup/>
    //  <Login/> Include these two for sign up and login
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
        <Route path='/sign-up' element={<Signup />} />
        </Routes> */}
        <Footer />
      </Router>
    </>
  );
}

export default App;

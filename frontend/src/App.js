import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home.js";
 import Login from './components/Login/Login.js';
import Signup from './components/Signup/Signup.js';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/sign-up" element={<Signup/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;

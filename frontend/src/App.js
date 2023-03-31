import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react"
import Home from "./components/Home/Home.js";
import Login from './components/Login/Login.js';
import Signup from './components/Signup/Signup.js';
const UserDashboard = lazy(() => import('./components/UserDashboard/UserDashboard.js'))

function App() {
  return (
    <>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/user/dashboard" element={<UserDashboard />} />

          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;

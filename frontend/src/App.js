import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react"
import Home from "./components/Home/Home.js";
import Login from './components/Login/Login.js';
import Signup from './components/Signup/Signup.js';
const UserDashboard = lazy(() => import('./components/UserDashboard/UserDashboard.js'))
const UserDashboardHome = lazy(() => import('./components/UserDashboard/UserDashboardHome.js'))
const UserDashboardOrder = lazy(() => import('./components/UserDashboard/UserDashboardOrder.js'))
const UserDashboardFeedback = lazy(() => import('./components/UserDashboard/UserDashboardFeedback.js'))
const UserDashboardSupport = lazy(() => import('./components/UserDashboard/UserDashboardSupport.js'))
const UserDashboardReSchedule = lazy(() => import('./components/UserDashboard/UserDashboardReSchedule.js'))


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
            <Route path="/user/dashboard/home" element={<UserDashboardHome/>}/>
            <Route path="/user/dashboard/order" element={<UserDashboardOrder/>}/>
            <Route path="/user/dashboard/feedback" element={<UserDashboardFeedback/>}/>
            <Route path="/user/dashboard/support" element={<UserDashboardSupport/>}/>
            <Route path="/user/dashboard/re-schedule" element={<UserDashboardReSchedule/>}/>

          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;

import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import PrivateRoute from "./components/Utils/PrivateRoute";
import LoginCheckRoute from "./components/Utils/LoginCheckRoute";
const Home = lazy(() => import("./components/Home/Home.js"));
const Login = lazy(() => import("./components/Login/Login.js"));
const Signup = lazy(() => import("./components/Signup/Signup.js"));
const UserDashboard = lazy(() =>
  import("./components/UserDashboard/UserDashboard.js")
);
const ForgetPassword = lazy(() =>
  import("./components/Login/ForgetPassword.js")
);
const AdminDashboard = lazy(() =>
  import("./components/AdminDashboard/AdminDashboard.js")
);
const PaymentPage = lazy(() => import("./components/Utils/PaymentPage.js"));

const loginPage = [
  {
    filler: "User",
    urlPost: "http://localhost:3500/api/v1/user/login",
    urlNavigate: "/user/dashboard/spaces",
    css: {},
  },
  {
    filler: "Admin",
    urlPost: "http://localhost:3500/api/v1/admin/suman-kickstart",
    urlNavigate: "/admin/dashboard/home",
    css: { marginBottom: "28px" },
  },
];

function App() {
  return (
    <>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={
                <LoginCheckRoute
                  redirectTo="/user/dashboard/spaces"
                  component={Login}
                  props={loginPage[0]}
                />
              }
            />
            <Route
              path="/admin/login"
              element={
                <LoginCheckRoute
                  redirectTo="/admin/dashboard/home"
                  component={Login}
                  props={loginPage[1]}
                />
              }
            />
            <Route path="/sign-up" element={<Signup />} />
            <Route
              path="/user/dashboard/:dashboardMenu"
              element={
                <PrivateRoute redirectTo="/login" component={UserDashboard} />
              }
            />
            <Route
              path="/admin/dashboard/:dashboardMenu"
              element={
                <PrivateRoute
                  redirectTo="/admin/login"
                  component={AdminDashboard}
                />
              }
            />
            <Route
              path="/user/pay"
              element={
                <PrivateRoute redirectTo="/login" component={PaymentPage} />
              }
            />
            <Route path="/user/recover-account" element={<ForgetPassword />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;

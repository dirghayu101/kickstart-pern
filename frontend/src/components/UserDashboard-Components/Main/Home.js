import React from "react";
import { useEffect, useState } from "react";
import UserInformation from "./UserInformation";
import ChangePassword from "./ChangePassword";

const Home = () => {
  const [showUserInfo, setShowUserInfo] = useState(true)

  function swapComponent(){
    setShowUserInfo(!showUserInfo)
  }

  useEffect( () => {
    document.querySelector(".dashboard").classList.add("active");
    return () => {
      document.querySelector(".dashboard").classList.remove("active");
    };
  }, []);

  const buttonText = showUserInfo ? "Change Password" : "Update My Information"

  return <>
    <button id="dashboardSwitchButton" onClick={swapComponent}>{buttonText}</button>
    <br/>
    <br/>
    {showUserInfo ? <UserInformation/> : <ChangePassword/>}
    <br/>
    <br/>
  </>
};

export default Home;

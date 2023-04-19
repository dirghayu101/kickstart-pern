import React from "react";
import { useEffect } from "react";

/* 
Modify reservations and remove reservations functionality
*/

const Settings = () => {
  useEffect(() => {
    document.querySelector(".settings").classList.add("active");
    return () => {
      document.querySelector(".settings").classList.remove("active");
    };
  }, []);

  return <></>;
};

export default Settings;

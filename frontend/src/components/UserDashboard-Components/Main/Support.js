import React from "react";
import { useEffect } from "react";
const Support = () => {
  useEffect(() => {
    document.querySelector(".support").classList.add("active");
    return () => {
      document.querySelector(".support").classList.remove("active");
    };
  }, []);
  return <></>;
};

export default Support;

import React from "react";
import { useEffect } from "react";

const Feedback = () => {
  useEffect(() => {
    document.querySelector(".feedback").classList.add("active");
    return () => {
      document.querySelector(".feedback").classList.remove("active");
    };
  }, []);
  return <></>;
};

export default Feedback;

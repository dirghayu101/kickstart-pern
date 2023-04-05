import React from "react";
import { useEffect } from "react";
const Home = () => {
  useEffect(() => {
    document.querySelector(".dashboard").classList.add("active");
    return () => {
      document.querySelector(".dashboard").classList.remove("active");
    };
  }, []);
  return <></>;
};

export default Home;

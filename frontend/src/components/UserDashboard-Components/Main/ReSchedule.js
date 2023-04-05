import React from "react";
import { useEffect } from "react";

const ReSchedule = () => {
  useEffect(() => {
    document.querySelector(".reschedule").classList.add("active");
    return () => {
      document.querySelector(".reschedule").classList.remove("active");
    };
  }, []);
  return <></>;
};

export default ReSchedule;

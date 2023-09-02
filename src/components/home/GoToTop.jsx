"use client";
import React, { useState, useEffect } from "react";
import { TfiAngleDoubleUp } from "react-icons/tfi";

const GoToTop = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <button
      onClick={goToTop}
      className={`fixed z-50 right-6 bottom-6 lg:right-16 lg:bottom-16 h-10 w-10 rounded-full bg-main ${
        showTopBtn ? "visible" : "invisible"
      } flex justify-center items-center`}
    >
      <TfiAngleDoubleUp className="text-white" />
    </button>
  );
};

export default GoToTop;

import React from "react";

const Overlay = ({ showOverlay, handleClick }) => {
  return (
    <div
      className={`transition-all ease-linear duration-[250] fixed z-40 top-0 left-0 bottom-0 right-0  ${
        showOverlay
          ? "point-event-auto bg-[#00000080] visible"
          : "point-event-none bg-black/0 invisible"
      }`}
      onClick={handleClick}
    ></div>
  );
};

export default Overlay;

import React from "react";

const Notification = ({ children, count }) => {
  return (
    <div className="relative w-max">
      <span className="absolute top-[-6px] right-[-9px] rounded-full bg-main text-white text-[10px] h-[14px] w-[14px] text-center leading-[14px]">{count}</span>
      {children}
    </div>
  );
};

export default Notification;

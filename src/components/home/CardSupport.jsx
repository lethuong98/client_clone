import React from "react";
import Image from "next/image";

const CardSupport = ({ linkImage, title, subTitle }) => {
  return (
    <div className="w-full flex h-max items-center gap-3">
      <div className="w-[50px] h-[48px] relative">
        <Image src={linkImage} alt="" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/>
      </div>
      <div className="flex-grow">
        <p className="text-[18px]">{title}</p>
        <p className="text-[14px] text-[#666]">{subTitle}</p>
      </div>
    </div>
  );
};

export default CardSupport;

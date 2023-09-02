import React from "react";
import Link from "next/link";

const Breadcrumbs = (props) => { 
  const getBreadcrumbs = () => {
    const newProps = [];
    for (const prop in props) {
      const newValue = {};
      newValue.title = prop;
      newValue.link = props[prop];
      newProps.push(newValue);
    }
    return newProps;
  };
  return (
    <div
      className={`py-[35px] bg-[#f7f7f7] uppercase text-[15px] font-medium text-center`}
    >
      {getBreadcrumbs().map((item, index) => {
        return (
          item.title != "curent" && (
            <span key={index}>
              <Link href={item.link}>
                <span
                  className={`py-[35px] bg-[#f7f7f7] uppercase text-[15px] text-[#5b5858] font-medium text-center`}
                >
                  {item.title}
                </span>
              </Link>
              <span className="mx-2">/</span>{" "}
            </span>
          )
        );
      })}
      <span
        className={`py-[35px] bg-[#f7f7f7] uppercase text-[15px] font-medium text-center`}
      >
        {props.curent}
      </span>
    </div>
  );
};

export default Breadcrumbs;

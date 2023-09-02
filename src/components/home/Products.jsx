"use client";
import React, { useState } from "react";
import { Poppins } from "next/font/google";
import "swiper/css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

const Products = ({ children }) => {
  const [listProductsActive, setListProductsActive] = useState("new");
  return (
    <div className={`row  mb-10`}>
      <div className="w-max m-auto mb-3">
        <h2
          className={`relative text-[24px] md:text-[30px] m-auto font-semibold before:content-[''] before:w-[30px] before:h-[2px] before:bg-black before:block before:absolute before:top-[60%] before:left-[-42px] after:content-[''] after:w-[30px] after:h-[2px] after:bg-black after:block after:absolute after:top-[60%] after:right-[-42px]`}
        >
          SẢN PHẨM
        </h2>
      </div>
      <div className=" w-max m-auto mb-4">
        <div className="flex justify-around">
          <h4
            className={`text-black ${
              listProductsActive === "new" ? "text-main" : ""
            }  hover:text-main transition-all duration-300 p-3 text-[12px] md:text-[14px] xl:text-[18px] font-medium cursor-pointer`}
            onClick={() => setListProductsActive("new")}
          >
            Sản phẩm mới
          </h4>
          <h4
            className={`text-black ${
              listProductsActive === "best" ? "text-main" : ""
            }  hover:text-main transition-all duration-300 p-3 text-[12px] md:text-[14px] xl:text-[18px] font-medium cursor-pointer`}
            onClick={() => setListProductsActive("best")}
          >
            Top Bán chạy
          </h4>
          <h4
            className={`text-black ${
              listProductsActive === "sale" ? "text-main" : ""
            }  hover:text-main transition-all duration-300 p-3 text-[12px] md:text-[14px] xl:text-[18px] font-medium cursor-pointer`}
            onClick={() => setListProductsActive("sale")}
          >
            Đang giảm giá
          </h4>
        </div>
      </div>
      {listProductsActive === "new"
        ? children[0]
        : listProductsActive === "best"
        ? children[1]
        : children[2]}
    </div>
  );
};

export default Products;

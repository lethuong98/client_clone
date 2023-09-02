"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import CardProducts from "@/components/common/card/CardProducts";

const RelatedProducts = ({ relatedProducts }) => {
  relatedProducts = JSON.parse(relatedProducts);
  return (
    <>
      <div className="w-max m-auto mb-4">
        <h2
          className={`relative text-[24px] md:text-[30px] m-auto font-semibold before:content-[''] before:w-[30px] before:h-[2px] before:bg-black before:block before:absolute before:top-[60%] before:left-[-42px] after:content-[''] after:w-[30px] after:h-[2px] after:bg-black after:block after:absolute after:top-[60%] after:right-[-42px]`}
        >
          SẢN PHẨM TƯƠNG TỰ
        </h2>
      </div>
      <div className="mb-20 cursor-grab">
        <Swiper slidesPerView={1} spaceBetween={10} breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 16,
          },
        }} className="mySwiper">
          {relatedProducts.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <CardProducts  product={JSON.stringify(item)} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};

export default RelatedProducts;

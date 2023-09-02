"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";

import Image from "next/image";

const Banners = ({ banners }) => {
  banners = JSON.parse(banners);
  return (
    <div className="slider container">
      <Swiper
        modules={[Autoplay]}
        className="mySwiper"
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
      >
        {banners.map((item, index) => {
          return (
            <SwiperSlide key={index} className="text-center bg-white">
              <div className="relative w-[100%] aspect-[11/5] sm:aspect-[13/5] lg-aspect-[16/5]">
                <Image
                  src={item.previewBanners}
                  alt="banners"
                  fill
                  sizes="100vw"
                  priority={true}
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Banners;

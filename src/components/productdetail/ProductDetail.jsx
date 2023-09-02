"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Rating, Pagination } from "@mui/material";
import { useQuickView } from "@/context/Context";
import { toast } from "react-toastify";

const AdditionalInformation = (props) => {
  return (
    <div className="mt-8">
      <div className="mb-3">
        <h5 className="w-36 text-sm inline-block font-semibold  ">Cân nặng</h5>
        <span className="text-sm text-[#333]">{props.weight}</span>
      </div>
      <div className="mb-3">
        <h5 className="w-36 text-sm inline-block font-semibold  ">
          Kích thước
        </h5>
        <span className="text-sm text-[#333]">{props.dimensions}</span>
      </div>
      <div className="mb-3">
        <h5 className="w-36 text-sm inline-block font-semibold  ">Chất liệu</h5>
        <span className="text-sm text-[#333]">{props.materials}</span>
      </div>
      <div className="mb-3">
        <h5 className="w-36 text-sm inline-block font-semibold  ">
          Thông tin khác
        </h5>
        <span className="text-sm text-[#333]">{props.other}</span>
      </div>
    </div>
  );
};

const Description = (props) => {
  return <p className="text-sm mt-8">{props.desc}</p>;
};

const ProductDetail = ({ product, color, size, category }) => {
  product = JSON.parse(product);
  console.log("product", product);
  color = JSON.parse(color);
  size = JSON.parse(size);
  category = JSON.parse(category);
  const { setCounCartt } = useQuickView();
  const [show, setShow] = useState("info");
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [colorActive, setColorActive] = useState(() => {
    const initValue = {
      indexColor: 0,
      colorId: Number(product.listColor.split(",")[0]),
    };
    const nameColor = color.find(
      (item) => item.id === initValue.colorId
    ).nameColor;
    initValue.nameColor = nameColor;
    return initValue;
  });
  const [sizeActive, setSizeActive] = useState(() => {
    const initValue = {
      sizeId: Number(product.listSize.split(",")[0]),
    };
    const nameSize = size.find((item) => item.id === initValue.sizeId).nameSize;
    initValue.nameSize = nameSize;
    return initValue;
  });
  console.log("colorActive", colorActive);
  console.log("sizeActive", sizeActive);
  const showCategory = (id) => {
    const categoryy = category.find((item) => item.id === id);
    if (categoryy) {
      return categoryy.nameCategory;
    }
  };

  const [quantity, setQuantity] = useState(1);
  const buyNow = () => {
    let cart = localStorage.getItem("cart");

    if (JSON.parse(cart)?.length === 0 || !cart) {
      const newCart = [];
      newCart.push({
        product,
        size: sizeActive,
        color: colorActive,
        quantity,
      });
      localStorage.setItem("cart", JSON.stringify(newCart));
      setCounCartt(1);
      toast.success("Thêm thành công", {
        position: "bottom-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    cart = JSON.parse(cart);
    const checkExist = cart.findIndex(
      (item) =>
        item.product.id === product.id &&
        Number(item.color.colorId) === colorActive.colorId &&
        Number(item.size.sizeId) === sizeActive.sizeId
    );
    if (checkExist < 0) {
      cart.push({
        product,
        size: sizeActive,
        color: colorActive,
        quantity,
      });
    } else {
      cart[checkExist].quantity += quantity;
    }
    setCounCartt(cart.length);
    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Thêm thành công", {
      position: "bottom-left",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const formatCurrency = (number) => {
    let numberString = number.toString();
    let parts = numberString.split(".");
    let integerPart = parts[0];
    let decimalPart = parts.length > 1 ? parts[1] : "";
    let formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    let formattedNumber =
      formattedInteger + (decimalPart ? "." + decimalPart : "") + "đ";
    return formattedNumber;
  };
  useEffect(() => {
    const productWithColor = product.detail.filter(
      (item) => item.colorId === colorActive.colorId && item.quantity > 0
    );
    setSizeActive(() => {
      const newValue = {};
      newValue.sizeId = productWithColor[0].sizeId;
      const nameSize = size.find(
        (item) => item.id === newValue.sizeId
      )?.nameSize;
      newValue.nameSize = nameSize;
      return newValue;
    });
  }, [colorActive]);
  return (
    <>
      <div className="products-show py-20 grid grid-cols-1 md:grid-cols-2 gap-7">
        <div className="product-image-gallery">
          <Swiper
            loop={true}
            spaceBetween={10}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Thumbs]}
            className="mySwiper2"
          >
            {product.gallery[colorActive.indexColor].listLink
              .split(",")
              .map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div className="relative w-[100%] aspect-[1138/1517]">
                      <Image
                        src={item}
                        alt="banners"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        fill
                        priority={true}
                      />
                    </div>
                  </SwiperSlide>
                );
              })}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Thumbs]}
            className="mySwiper mt-2"
          >
            {product.gallery[colorActive.indexColor].listLink
              .split(",")
              .map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div className="relative w-[100%] aspect-[1138/1517] cursor-pointer">
                      <Image
                        src={item}
                        alt="banners"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        fill
                        priority={true}
                      />
                    </div>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>
        <div className="product-info w-full">
          <h2 className="text-[24px] leading-6 mb-3">{product.nameProduct}</h2>
          <span className="price text-[24px] text-main">
            {formatCurrency(
              product.saleProduct ? product.salePrice : product.regularPrice
            )}
          </span>
          <span className="ml-5 text-[#333] price inline-block text-[18px] before:content-[''] before:w-full before:h-[1px] before:bg-[#333] before:block relative before:absolute before:top-1/2">
            {product.saleProduct ? formatCurrency(product.regularPrice) : ""}
          </span>
          <h5 className="mt-3 text-[15px] text-[#333] leading-[28px] h-[112px]">
            {product.subDesc}
          </h5>
          <hr className="my-8" />
          <div className="inline-block w-max">
            <h5 className="mb-3 font-medium">Màu</h5>
            {product.listColor.split(",").map((item, index) => {
              const indexColor = color.findIndex(
                (item2) => item2.id === Number(item)
              );
              return (
                <span
                  key={index}
                  style={{
                    backgroundColor: `${color[indexColor].previewColor}`,
                  }}
                  className={`relative mr-5 inline-block h-[14px] w-[14px] border border-solid border-black rounded-full cursor-pointer group`}
                  onClick={() =>
                    setColorActive((prev) => {
                      const newValue = { ...prev };
                      newValue.indexColor = index;
                      newValue.colorId = Number(item);
                      newValue.nameColor = color[indexColor].nameColor;
                      return newValue;
                    })
                  }
                >
                  <span
                    style={{
                      display:
                        colorActive.colorId === Number(item)
                          ? "inline-block"
                          : "",
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2 w-5 h-5 hidden  group-hover:inline-block  rounded-full border border-solid border-black"
                  ></span>
                </span>
              );
            })}
          </div>
          <div className="inline-block ml-10 w-max">
            <h5 className="mb-3 font-medium">Kích cỡ</h5>
            {product.listSize.split(",").map((item, index) => {
              const indexSize = size.findIndex(
                (item2) => item2.id === Number(item)
              );
              const indexDetail = product.detail.findIndex((item2) => {
                return (
                  item2.sizeId === Number(item) &&
                  item2.colorId === Number(colorActive.colorId)
                );
              });
              {
                return (
                  product.detail[indexDetail].quantity > 0 && (
                    <span
                      key={index}
                      className="py-1 px-2 bg-[#eceff8] text-[12px] hover:bg-main hover:text-white mr-3 cursor-pointer"
                      style={{
                        backgroundColor:
                          sizeActive.sizeId === Number(item) ? "#ff6e61" : "",
                      }}
                      onClick={() =>
                        setSizeActive((prev) => {
                          const newValue = { ...prev };
                          newValue.sizeId = Number(item);
                          newValue.nameSize = size[indexSize].nameSize;
                          return newValue;
                        })
                      }
                    >
                      {size[indexSize].nameSize}
                    </span>
                  )
                );
              }
            })}
          </div>
          <div className="flex gap-2 mt-10">
            <div className="w-20 border border-solid border-[#8f8f8f] flex items-center justify-around">
              <span
                style={{ pointerEvents: quantity < 2 ? "none" : "auto" }}
                className="p-1 cursor-pointer"
                onClick={() =>
                  setQuantity((prev) => {
                    if (prev === 0) {
                      return prev;
                    }
                    return prev - 1;
                  })
                }
              >
                -
              </span>
              <span>{quantity}</span>
              <span
                style={{ pointerEvents: quantity > 9 ? "none" : "auto" }}
                className="p-1 cursor-pointer"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </span>
            </div>
            <div
              className="uppercase py-4 px-10 text-[14px] font-bold bg-black text-white cursor-pointer transition-all duration-300 hover:bg-main"
              onClick={buyNow}
            >
              mua ngay
            </div>
          </div>
          <p className="mt-8 text-[#676767]">
            Danh mục: {showCategory(product.categoryId)}
          </p>
        </div>
      </div>
      <div className="more-info mb-[90px]">
        <div className="flex items-center gap-5 mx-auto w-max">
          <h2
            onClick={() => setShow("info")}
            className={`text-[14px] md:text-base lg:text-xl xl:text-2xl font-semibold  cursor-pointer
            ${
              show === "info"
                ? "after:content-[''] after:block after:w-full after:h-[2px] after:bg-black"
                : ""
            } `}
          >
            Thông tin thêm
          </h2>
          <h2
            onClick={() => setShow("desc")}
            className={`text-[14px] md:text-base lg:text-xl xl:text-2xl font-semibold  cursor-pointer
              ${
                show === "desc"
                  ? "after:content-[''] after:block after:w-full after:h-[2px] after:bg-black"
                  : ""
              } `}
          >
            Mô tả sản phẩm
          </h2>
        </div>
        <hr />
        {show === "info" ? (
          <AdditionalInformation
            weight={product.weight}
            dimensions={product.dimensions}
            materials={product.materials}
            other={product.other}
          />
        ) : (
          <Description desc={product.desc} />
        )}
      </div>
    </>
  );
};

export default ProductDetail;

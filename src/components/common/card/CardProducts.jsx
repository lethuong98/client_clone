"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { TfiEye } from "react-icons/tfi";
import { FaHeart } from "react-icons/fa";
import Link from "next/link";
import { useQuickView } from "@/context/Context";
import { formatCurrency } from "@/utils/Convert";

const CardProducts = ({ product }) => {
  product = JSON.parse(product);
  const { show, handleToggleShow, addData, setCounWishlistt } = useQuickView();
  const [changewishlist, setChangeWishlish] = useState(false);
  const [exist, setExist] = useState(false);

  const handleToggleWishlist = () => {
    let wishlist = localStorage.getItem("wishlist");
    if (!wishlist) {
      const newWishlist = [];
      newWishlist.push(product);
      localStorage.setItem("wishlist", JSON.stringify(newWishlist));
      return;
    }
    wishlist = JSON.parse(wishlist);
    const exist = wishlist.findIndex((item) => item.id === product.id);
    if (exist < 0) {
      wishlist.push(product);
    } else {
      wishlist.splice(exist, 1);
    }
    setCounWishlistt(wishlist.length);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  };
  const checkExistInWishlist = () => {
    if (typeof window !== "undefined") {
      let wishlist = localStorage.getItem("wishlist");
      if (!wishlist) {
        return false;
      }
      wishlist = JSON.parse(wishlist);
      const exist = wishlist.findIndex((item) => item.id === product.id);
      if (exist < 0) {
        return false;
      } else {
        return true;
      }
    }
  };
  useEffect(() => {
    document.body.style.overflow = show ? `hidden` : "visible";
    document.body.style.paddingRight = show ? `17px` : "0";
  }, [show]);
  useEffect(() => {
    if (checkExistInWishlist()) {
      setExist(true);
    } else {
      setExist(false);
    }
  }, [changewishlist]);
  return (
    <>
      <div className="card">
        <div className="banner w-full aspect-[3/4] relative overflow-hidden group cursor-pointer">
          <Link href={`/product/${product?.id}`}>
            <div className="relative h-full w-full">
              <Image
                src={product?.gallery[0].listLink.split(",")[0]}
                alt=""
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="group-hover:scale-110 transition-all duration-500"
                fill
              />
            </div>
          </Link>
          <div className="absolute top-2 right-2 flex flex-col gap-1">
            {product?.newProduct && (
              <div className="py-[2px] px-2 bg-main text-sm text-white rounded">
                New
              </div>
            )}
            {product?.saleProduct && (
              <div className="py-[2px] px-2 bg-[#9a49d2] text-sm text-white rounded">
                <span>-</span>
                {Math.round((product?.salePrice / product?.regularPrice) * 100)}
                <span>%</span>
              </div>
            )}
          </div>

          <div className="icon absolute top-1/2 -translate-y-1/2 flex flex-col right-[-40px] group-hover:right-[20px] transition-all duration-300  gap-2 h-max">
            <div
              className="rounded-full bg-black hover:bg-main h-9 w-9 flex justify-center items-center cursor-pointer transition-all duration-300"
              onClick={() => {
                addData(product);
                handleToggleShow();
              }}
            >
              <TfiEye className="text-white text-[20px] " />
            </div>
            <div
              style={{
                backgroundColor: exist ? "#ff6e61" : "",
              }}
              className={`rounded-full bg-black hover:bg-main h-9 w-9 flex justify-center items-center cursor-pointer transition-all duration-300`}
              onClick={() => {
                handleToggleWishlist();
                setChangeWishlish(!changewishlist);
              }}
            >
              <FaHeart className="text-white text-[20px] " />
            </div>
          </div>
        </div>
        <div className="content mt-3">
          <p
            className={`title  text-[14px] font-normal cursor-pointer hover:text-main transition-all duration-300 h-[42px]`}
          >
            {product?.nameProduct}
          </p>
          <span className={`price $ text-[15px]  font-semibold`}>
            {product?.saleProduct
              ? formatCurrency(product?.salePrice)
              : formatCurrency(product?.regularPrice)}
          </span>
        </div>
      </div>
    </>
  );
};

export default CardProducts;

"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { TfiClose, TfiHeart } from "react-icons/tfi";
import Link from "next/link";
import { useQuickView } from "@/context/Context";
import { formatCurrency } from "@/utils/Convert";

const WishListClient = () => {
  const [wishlist, setWishlist] = useState([]);
  const { setCounWishlistt } = useQuickView();
  const removeItemInWishList = (index) => {
    setWishlist((prev) => {
      const newValue = [...prev];
      newValue.splice(index, 1);
      setCounWishlistt(newValue.length);
      localStorage.setItem("wishlist", JSON.stringify(newValue));
      return newValue;
    });
  };
  const removeAllWishList = () => {
    setWishlist([]);
    setCounWishlistt(0);
    localStorage.setItem("wishlist", JSON.stringify([]));
  };
  useEffect(() => {
    setWishlist(() => JSON.parse(localStorage.getItem("wishlist")) || []);
  }, []);
  return wishlist.length > 0 ? (
    <div className="row">
      <h3 className="text-base md:text-xl font-semibold mt-[90px] mb-[15px]">
        Danh sách sản phẩm yêu thích
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full mb-4 min-w-[670px]">
          <thead className="bg-[#f9f9f9] border border-[#ebebeb] border-solid">
            <tr>
              <th className="text-xs md:text-sm font-medium uppercase text-center lg:text-right w-[100px] lg:w-[150px] text-[#333] py-[21px] px-[20px] lg:px-[45px]">
                ẢNH
              </th>
              <th className="text-xs md:text-sm font-medium uppercase text-[#333] py-[21px] px-[20px] lg:px-[45px]">
                TÊN SẢN PHẨM
              </th>
              <th className="text-xs md:text-sm font-medium text-center lg:text-right uppercase text-[#333] py-[21px] px-[20px] lg:px-[45px] w-[120px]">
                GIÁ
              </th>
              <th className="text-xs md:text-sm font-medium uppercase text-[#333] py-[21px] px-[20px] lg:px-[45px] w-[190px] lg:w-[250px]">
                THÊM VÀO GIỎ HÀNG
              </th>
              <th className="text-xs md:text-sm font-medium uppercase text-[#333] py-[21px] px-[20px] lg:px-[45px] w-[130px] lg:w-[185px]">
                HÀNH ĐỘNG
              </th>
            </tr>
          </thead>
          <tbody>
            {wishlist.map((item, index) => {
              return (
                <tr
                  className="border border-[#ebebeb] border-solid "
                  key={index}
                >
                  <td className="p-[20px] lg:p-[30px] pr-0 text-center">
                    <div className="relative w-full aspect-[3/4] ">
                      <Image
                        src={item?.gallery[0].listLink.split(",")[0]}
                        alt=""
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="group-hover:scale-110 transition-all duration-500"
                        fill
                      />
                    </div>
                  </td>
                  <td className="p-[20px] text-xs md:text-sm lg:p-[30px] pr-0 text-center">
                    {item.nameProduct}
                  </td>
                  <td className="p-[20px] text-xs md:text-sm lg:p-[30px] pr-0 text-center">
                    {item.saleProduct ? (
                      <>
                        <span className="mr-2 before:content-[''] before:w-full before:h-[1px] before:bg-[#8e8e8e] text-[#8e8e8e] before:block relative before:absolute before:top-1/2 before:left-0">
                          {formatCurrency(item.regularPrice)}
                        </span>
                        <span>{formatCurrency(item.salePrice)}</span>
                      </>
                    ) : (
                      <span>{formatCurrency(item.regularPrice)}</span>
                    )}
                  </td>
                  <td className="p-[20px] text-xs md:text-sm lg:p-[30px] pr-0 text-center">
                    <Link href={`/product/${item.id}`}>
                      <button className="px-3 py-2 md:px-5 bg-main uppercase rounded-full font-medium text-white text-xs md:text-sm hover:bg-black transition-all duration-300">
                        Tuỳ chọn
                      </button>
                    </Link>
                  </td>
                  <td className="p-[20px] text-xs md:text-sm lg:p-[30px] pr-0 text-center">
                    <TfiClose
                      className="inline-block hover:text-main cursor-pointer"
                      onClick={() => removeItemInWishList(index)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mb-[40px] md:mb-[80px] flex items-center justify-between">
        <Link href="/product">
          <button className="outline-none py-4 px-6 text-xs md:text-sm md:px-16 bg-[#f2f2f2] text-[#363f4d] rounded-full uppercase hover:bg-main hover:text-white font-medium transition-all duration-300">
            đến trang sản phẩm
          </button>
        </Link>
        <button
          onClick={removeAllWishList}
          className="outline-none py-4 px-6 text-xs md:text-sm md:px-16 bg-[#f2f2f2] text-[#363f4d] rounded-full uppercase hover:bg-main hover:text-white font-medium transition-all duration-300"
        >
          Xoá danh sách
        </button>
      </div>
    </div>
  ) : (
    <div className="py-20 text-center">
      <TfiHeart className="text-[100px] inline-block" />
      <h3 className="text-lg font-medium mt-7 mb-2">Danh yêu thích trống</h3>
      <Link href="/product">
        <button className="uppercase text-white py-2 px-6 bg-black hover:bg-main">
          Thêm Sản phẩm
        </button>
      </Link>
    </div>
  );
};

export default WishListClient;

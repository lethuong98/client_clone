"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { TfiClose, TfiShoppingCart } from "react-icons/tfi";
import Link from "next/link";
import { useQuickView } from "@/context/Context";
import { formatCurrency } from "@/utils/Convert";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { FaGalacticSenate } from "react-icons/fa";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const schema = yup
  .object({
    fullName: yup.string().required("Tên không được để trống"),
    phoneNumber: yup
      .string()
      .required("Số điện thoại không được để trống")
      .matches(/\d{10,11}/, "Số điện thoại phải dài từ 10 đến 11 kí tự"),
    address: yup
      .string()
      .trim()
      .required("Địa chỉ không được để trống")
      .max(100, "Không dài quá 100 kí tự"),
  })
  .required();

const CartClient = () => {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [coupon, setCoupon] = useState(() => {
    const initValue = {
      couponForYou: Math.floor(Math.random() * 1000000).toString(),
      value: "",
      valueSale: Math.floor(Math.random() * (40 - 10) + 10),
    };
    return initValue;
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      address: "",
    },
  });
  const { setCounCartt, setDataOrderr } = useQuickView();
  const [actionByHand, setActionByHand] = useState(false);
  const checkout = (data) => {
    const dataOrder = { ...data, coupon: 100 };

    if (coupon.couponForYou === coupon.value) {
      dataOrder.coupon = Number(coupon.valueSale);
    }
    setDataOrderr(dataOrder);
    router.push("/checkout");
  };
  const removeItemInCart = (index) => {
    setCart((prev) => {
      setActionByHand(true);
      const newValue = [...prev];
      newValue.splice(index, 1);
      return newValue;
    });
  };
  const removeAllCart = () => {
    setCart(() => {
      setActionByHand(true);
      return [];
    });
  };
  useEffect(() => {
    if (actionByHand) {
      console.log("change cart");
      setCounCartt(cart.length);
      localStorage.setItem("cart", JSON.stringify(cart));
      setActionByHand(false);
    }
  }, [cart]);
  useEffect(() => {
    setValue("fullName", localStorage.getItem("fullName"));
    setValue("phoneNumber", localStorage.getItem("phoneNumber"));
    setValue("address", localStorage.getItem("address"));
  }, []);
  useEffect(() => {
    console.log("setCart");
    setCart(() => JSON.parse(localStorage.getItem("cart")) || []);
  }, []);
  return cart.length > 0 ? (
    <div className="row">
      <h3 className="text-base md:text-xl font-semibold mt-[90px] mb-[15px]">
        Danh sách sản phẩm
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full mb-10 min-w-[992px]">
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
              <th className="text-xs md:text-sm font-medium uppercase text-[#333] py-[21px] px-[20px] lg:px-[45px] w-[130px] lg:w-[185px]">
                số lượng
              </th>
              <th className="text-xs md:text-sm font-medium uppercase text-[#333] py-[21px] px-[20px] lg:px-[45px] w-[130px] lg:w-[185px]">
                Tổng phụ
              </th>
              <th className="text-xs md:text-sm font-medium uppercase text-[#333] py-[21px] px-[20px] lg:px-[45px] w-[130px] lg:w-[185px]">
                HÀNH ĐỘNG
              </th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => {
              return (
                <tr
                  className="border border-[#ebebeb] border-solid "
                  key={index}
                >
                  <td className="p-[20px] lg:p-[30px] pr-0 text-center">
                    <div className="relative w-full aspect-[3/4] ">
                      <Image
                        src={
                          item.product?.gallery[
                            item.color.indexColor
                          ].listLink.split(",")[0]
                        }
                        alt=""
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="group-hover:scale-110 transition-all duration-500"
                        fill
                      />
                    </div>
                  </td>
                  <td className="p-[20px] lg:p-[30px] pr-0 text-left text-sm">
                    <p>{item.product.nameProduct}</p>
                    <p className="mt-2 text-xs">
                      <span>Màu: </span>
                      {item.color.nameColor}
                    </p>
                    <p className="text-xs">
                      <span>Kích thước: </span>
                      {item.size.nameSize}
                    </p>
                  </td>
                  <td className="p-[20px] lg:p-[30px] pr-0 text-center text-sm">
                    {item.product.saleProduct ? (
                      <>
                        <span className="mr-2 before:content-[''] before:w-full before:h-[1px] before:bg-[#8e8e8e] text-[#8e8e8e] before:block relative before:absolute before:top-1/2 before:left-0">
                          {formatCurrency(item.product.regularPrice)}
                        </span>
                        <span>{formatCurrency(item.product.salePrice)}</span>
                      </>
                    ) : (
                      <span>{formatCurrency(item.product.regularPrice)}</span>
                    )}
                  </td>
                  <td className="p-[20px] lg:p-[30px] pr-0 text-center text-sm">
                    <div className="relative h-10 w-20 border border-solid border-[#ebebeb] mx-auto">
                      <button
                        className="h-10 p-1 border-r-[1px] border-solid border-[#ebebeb] absolute left-0"
                        onClick={() =>
                          setCart((prev) => {
                            setActionByHand(true);
                            const newValue = [...prev];
                            if (newValue[index].quantity > 1) {
                              newValue[index].quantity -= 1;
                            }
                            return newValue;
                          })
                        }
                      >
                        -
                      </button>
                      <span className="leading-10">{item.quantity}</span>
                      <button
                        className="h-10 p-1 border-l-[1px] border-solid border-[#ebebeb] absolute right-0"
                        onClick={() =>
                          setCart((prev) => {
                            setActionByHand(true);
                            const newValue = [...prev];
                            if (newValue[index].quantity < 10) {
                              newValue[index].quantity += 1;
                            }
                            return newValue;
                          })
                        }
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="text-center text-sm">
                    {item.product.saleProduct
                      ? formatCurrency(item.quantity * item.product.salePrice)
                      : formatCurrency(
                          item.quantity * item.product.regularPrice
                        )}
                  </td>
                  <td className="p-[20px] lg:p-[30px] pr-0 text-center text-sm">
                    <TfiClose
                      className="inline-block hover:text-main cursor-pointer"
                      onClick={() => removeItemInCart(index)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mb-[52px] flex items-center justify-between">
        <Link href="/product">
          <button className="outline-none py-4 px-6 text-xs md:text-sm md:px-16 bg-[#f2f2f2] text-[#363f4d] rounded-full uppercase hover:bg-main hover:text-white font-medium transition-all duration-300">
            đến trang sản phẩm
          </button>
        </Link>
        <button
          onClick={removeAllCart}
          className="outline-none py-4 px-6 text-xs md:text-sm md:px-16 bg-[#f2f2f2] text-[#363f4d] rounded-full uppercase hover:bg-main hover:text-white font-medium transition-all duration-300"
        >
          xoá giỏ hàng
        </button>
      </div>
      <form onSubmit={handleSubmit(checkout)}>
        <div className="grid  lg:grid-cols-3 gap-6 mb-10 sm:mb-24">
          <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-[#f9f9f9] py-10 px-6 rounded">
              <h4 className="font-semibold text-lg">Thông tin vận chuyển</h4>
              <div className="mt-8">
                <label htmlFor="nameCustomer" className="text-sm">
                  *Tên người nhận
                </label>
                <input
                  autoComplete="3"
                  type="text"
                  id="nameCustomer"
                  {...register("fullName")}
                  className="block mt-2  w-full h-10 outline-none px-3 text-sm border border-[#ebebeb] border-solid"
                />
                <p className="h-1 text-[10px] mb-4 text-red-600">
                  {errors.fullName && errors.fullName.message}
                </p>

                <label htmlFor="phoneCustomer" className="text-sm">
                  *Số điện thoại
                </label>
                <input
                  type="number"
                  id="phoneCustomer"
                  {...register("phoneNumber")}
                  className="block mt-2  w-full h-10 outline-none px-3 text-sm border border-[#ebebeb] border-solid"
                />
                <p className="h-1 text-[10px] mb-4 text-red-600">
                  {errors.phoneNumber && errors.phoneNumber.message}
                </p>
                <label htmlFor="address" className="text-sm">
                  *Địa chỉ
                </label>
                <input
                  autoComplete="3"
                  type="text"
                  id="address"
                  {...register("address")}
                  className="block mt-2 w-full h-10 outline-none px-3 text-sm border border-[#ebebeb] border-solid"
                />
                <p className="h-1 text-[10px] text-red-600">
                  {errors.address && errors.address.message}
                </p>
              </div>
            </div>
            <div className="bg-[#f9f9f9] py-10 px-6 rounded h-max">
              <h4 className="font-semibold text-lg">Áp dụng mã giảm giá</h4>
              <div className="mt-8">
                <label htmlFor="coupon" className="text-sm">
                  Mã giảm giá:{" "}
                  <span className="text-main">{coupon.couponForYou}</span>
                </label>
                <input
                  type="text"
                  id="coupon"
                  value={coupon.value}
                  onChange={(e) =>
                    setCoupon((prev) => {
                      const newValue = { ...prev };
                      newValue.value = e.target.value;
                      return newValue;
                    })
                  }
                  className="block mt-2 w-full h-10 outline-none px-3 text-sm border border-[#ebebeb] border-solid"
                />
                {coupon.couponForYou === coupon.value && (
                  <p className="text-xs text-main ml-2 mt-1">
                    Giảm giá <span>{coupon.valueSale}</span>%
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="bg-[#f9f9f9] col-span-2 lg:col-span-1 py-10 px-6 rounded h-max">
            <h4 className="font-semibold text-lg">Tổng cộng</h4>
            <p className="mt-8 flex justify-between">
              <span className="text-sm">Tổng cộng</span>
              <span className="font-semibold">
                {formatCurrency(
                  cart.reduce((a, b) => {
                    return (
                      a +
                      b.quantity *
                        (b.product.saleProduct
                          ? b.product.salePrice
                          : b.product.regularPrice)
                    );
                  }, 0)
                )}
              </span>
            </p>
            <button
              type="submit"
              className="outline-none mt-8 w-full py-4 px-16 bg-main hover:bg-black rounded-full uppercase text-white  hover:text-white text-sm font-medium transition-all duration-300"
            >
              kiểm tra
            </button>
          </div>
        </div>
      </form>
    </div>
  ) : (
    <div className="py-20 text-center">
      <TfiShoppingCart className="text-[100px] inline-block" />
      <h3 className="text-lg font-medium mt-7 mb-2">Giỏ hàng trống</h3>
      <Link href="/product">
        <button className="uppercase text-white py-2 px-6 bg-black hover:bg-main">
          Thêm Sản phẩm
        </button>
      </Link>
    </div>
  );
};

export default CartClient;

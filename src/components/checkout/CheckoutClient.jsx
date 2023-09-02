"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useQuickView } from "@/context/Context";
import { formatCurrency } from "@/utils/Convert";
import api from "@/api/Request";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

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

const CheckoutClient = () => {
  const router = useRouter();
  const { dataOrder, setCounCartt } = useQuickView();
  const [note, setNote] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: dataOrder?.fullName || "",
      phoneNumber: dataOrder?.phoneNumber || "",
      address: dataOrder?.address || "",
    },
  });
  let [cart, setCart] = useState([]);
  const applyCoupon = (total, valueCoupon) => {
    if (valueCoupon < 100) {
      return (total * (100 - valueCoupon)) / 100;
    }
    return total;
  };
  const placeOrder = (data) => {
    const accessToken = Cookies.get("accessToken");
    if (!accessToken) {
      localStorage.setItem("pathname", window.location.pathname);
      router.push("/login-register?form=login");
      return;
    }
    const dataOrderr = new FormData();
    dataOrderr.append("userId", localStorage.getItem("userId"));
    dataOrderr.append("fullName", data.fullName);
    dataOrderr.append("phoneNumber", data.phoneNumber);
    dataOrderr.append("address", data.address);
    dataOrderr.append("note", note);
    dataOrderr.append("coupon", dataOrder.coupon < 100 ? dataOrder.coupon : 0);
    dataOrderr.append(
      "totalMonney",
      applyCoupon(
        cart.reduce((a, b) => {
          return (
            a +
            b.quantity *
              (b.product.saleProduct
                ? b.product.salePrice
                : b.product.regularPrice)
          );
        }, 0),
        dataOrder.coupon || 100
      )
    );
    dataOrderr.append("infoProduct", JSON.stringify(cart));
    api.post(`/order/create`, dataOrderr).then((res) => {
      if (res.data.success) {
        toast.success(res.data.message, {
          position: "bottom-left",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setCounCartt(0);
        localStorage.setItem("cart", "[]");
        router.push("/my-account");
      } else {
        toast.error(res.data.message, {
          position: "bottom-left",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    });
  };
  useEffect(() => {
    setCart(() => {
      let cart = localStorage.getItem("cart");
      if (!cart || cart.length <= 2) {
        return [];
      }
      return JSON.parse(cart);
    });
  }, []);
  return (
    <div className="row">
      <form onSubmit={handleSubmit(placeOrder)}>
        <div className="my-12 sm:my-20 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-4">
          <div className="col-span-2 sm:col-span-1">
            <h2 className="font-semibold text-sm md:text-base uppercase ">
              Thông tin vận chuyển
            </h2>
            <div className="mt-4 bg-[#f9f9f9] px-6 py-8">
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
              <p className="h-1 text-[10px] mb-4 text-red-600">
                {errors.address && errors.address.message}
              </p>
              <label htmlFor="note" className="text-sm">
                Ghi chú
              </label>
              <textarea
                placeholder="vd: chỉ nhận hàng vào nửa đêm"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                id="note"
                rows="4"
                cols="50"
                className="mt-2 p-3 text-sm block outline-none w-full border border-[#ebebeb] border-solid"
              ></textarea>
            </div>
          </div>
          <div className="col-span-2">
            <h2 className="font-semibold text-sm md:text-base uppercase ">
              Thông tin đơn hàng
            </h2>
            <div className="mt-4 bg-[#f9f9f9] px-6 py-8">
              <div className="flex justify-between border-b border-[#dee0e4] border-solid pb-8">
                <p className="font-medium">Sản phẩm</p>
                <p className="font-medium">Tổng</p>
              </div>
              <div className="border-b border-[#dee0e4] border-solid py-7">
                {cart.map((item, index) => {
                  return (
                    <div key={index} className="flex justify-between mb-1">
                      <p className="text-sm">
                        {item.product.nameProduct}
                        <span> x </span>
                        {item.quantity}
                      </p>
                      <p className="text-sm">
                        {item.product.saleProduct
                          ? formatCurrency(
                              item.quantity * item.product.salePrice
                            )
                          : formatCurrency(
                              item.quantity * item.product.regularPrice
                            )}
                      </p>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between border-b border-[#dee0e4] border-solid py-7">
                <p className="text-sm">Phí vận chuyển</p>
                <p className="text-sm">Miễn phí</p>
              </div>
              <div className="flex justify-between border-b border-[#dee0e4] border-solid py-7">
                <p className="text-sm">Giảm giá</p>
                <p className="text-sm">
                  {dataOrder.coupon < 100 ? `${dataOrder.coupon}%` : "Không"}
                </p>
              </div>
              <div className="flex justify-between border-b border-[#dee0e4] border-solid py-7">
                <p className="text-base font-bold">Tổng</p>
                <p className="text-base font-bold text-main">
                  {formatCurrency(
                    applyCoupon(
                      cart.reduce((a, b) => {
                        return (
                          a +
                          b.quantity *
                            (b.product.saleProduct
                              ? b.product.salePrice
                              : b.product.regularPrice)
                        );
                      }, 0),
                      dataOrder.coupon || 100
                    )
                  )}
                </p>
              </div>
            </div>
            <div className="flex justify-center mt-8 sm:mt-6">
              <button
                type="submit"
                className="uppercase rounded-full transition-all duration-300 text-white py-2 px-6 bg-black hover:bg-main"
              >
                đặt hàng
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutClient;

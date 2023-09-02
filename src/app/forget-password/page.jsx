"use client";
import React, { useState } from "react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "@/api/Request";
import { toast } from "react-toastify";
import Link from "next/link";

export default function ForgetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const schema = yup
    .object({
      email: yup
        .string()
        .required("Email không được để trống")
        .email("Vui lòng nhập đúng định dạng email"),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
    },
  });
  const forgetPassword = (data) => {
    const dataForgetPassword = new FormData();
    dataForgetPassword.append("email", data.email);

    api
      .put("/auth/forget-password", dataForgetPassword)
      .then((res) => {
        setNewPassword(res.data.data);
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
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          position: "bottom-left",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };
  return (
    <div className="mt-[70px]">
      <Breadcrumbs home="/" curent="forget password" />
      <div className="my-20 row">
        <div className="w-full md:w-[670px] mx-auto">
          <div className="m-auto w-max mb-8">
            <h2 className="inline-block font-bold text-2xl cursor-pointer">
              Quên mật khẩu
            </h2>
          </div>
          <div className="px-4 py-10 sm:px-10 md:px-20 sm:py-20 shadow-auth">
            <form onSubmit={handleSubmit(forgetPassword)}>
              <input
                autoComplete="off"
                type="text"
                {...register("email")}
                placeholder="Email"
                className="outline-none border border-solid border-[#ebebeb] w-full h-[45px] text-sm p-[15px] text-[#333]"
              />
              <p className="text-red-600 text-xs mt-1 h-4">
                {errors?.email && errors.email.message}
              </p>
              <p className="text-red-600 text-sm mb-2 h-4">
                {newPassword && `Mật khẩu mới của bạn là: ${newPassword}`}
              </p>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="uppercase px-7 py-2 text-sm bg-black text-white hover:bg-main mt-[8px]"
                >
                  Gửi
                </button>
              </div>
              <Link href="/login-register">
                <p className="text-sm text-center mt-2 text-[#333]">
                  Đăng nhập
                </p>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

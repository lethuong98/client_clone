"use client";
import React, { useState, useEffect } from "react";
import { TfiAngleDown } from "react-icons/tfi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "@/api/Request";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import OrderTable from "@/components/account/OrderTable";
import noAvatar from "public/avatar-default.jpg";
import Image from "next/image";

const EditInfo = ({ isShow, setIsShoww }) => {
  const [avatar, setAvatar] = useState({
    preview: "",
    change: false,
    file: "",
  });
  console.log("avatar", avatar);
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
      email: "",
      address: "",
      hobby: "",
    },
  });
  useEffect(() => {
    setValue("fullName", localStorage.getItem("fullName") || "");
    setValue("phoneNumber", localStorage.getItem("phoneNumber") || "");
    setValue("email", localStorage.getItem("email") || "");
    setValue("address", localStorage.getItem("address") || "");
    setValue("hobby", localStorage.getItem("hobby") || "");
    setAvatar((prev) => {
      const newValue = { ...prev };
      newValue.preview = localStorage.getItem("avatar");
      return newValue;
    });
  }, []);
  useEffect(() => {
    return () => {
      avatar && URL.revokeObjectURL(avatar.preview);
    };
  }, [avatar]);
  const handleChangeAvatar = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setAvatar((prev) => {
        const newValue = { ...prev };
        newValue.preview = URL.createObjectURL(file);
        newValue.change = true;
        newValue.file = file;
        return newValue;
      });
    }
  };
  const updateInfo = (data) => {
    const dataUpdateInfo = new FormData();
    dataUpdateInfo.append("fullName", data.fullName);
    dataUpdateInfo.append("email", data.email);
    dataUpdateInfo.append("phoneNumber", data.phoneNumber);
    dataUpdateInfo.append("address", data.address);
    dataUpdateInfo.append("hobby", data.hobby);
    if (avatar.change) {
      dataUpdateInfo.append("avatar", avatar.file);
      dataUpdateInfo.append("prevAvatar", localStorage.getItem("avatar"));
    }
    api
      .put(`/user/update/${localStorage.getItem("userId")}`, dataUpdateInfo)
      .then((res) => {
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
        localStorage.setItem("fullName", data.fullName);
        localStorage.setItem("email", data.email);
        localStorage.setItem("phoneNumber", data.phoneNumber);
        localStorage.setItem("address", data.address);
        localStorage.setItem("hobby", data.hobby);
        if (avatar.change) {
          localStorage.setItem("avatar", res.data.data || "");
        }
      });
  };
  return (
    <div
      className={`${
        isShow === "info" ? "h-[810px]" : "h-[68px]"
      } mb-5 border border-solid border-[#ebebeb] transition-all duration-200 overflow-hidden`}
    >
      <div
        onClick={() => setIsShoww("info")}
        className={`bg-[#f9f9f9] px-4 cursor-pointer border-b border-solid border-[#ebebeb] h-[67px] uppercase flex justify-between items-center`}
      >
        <p className="font-medium text-sm sm:text-base">
          chỉnh sửa thông tin tài khoản
        </p>
        <TfiAngleDown
          className={`transition-all duration-200 ${
            isShow === "info" ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>
      <div className="px-4 py-6">
        <input
          type="file"
          id="avatar"
          className="hidden"
          onChange={handleChangeAvatar}
        />
        <label htmlFor="avatar" className="block w-max rounded-full mx-auto">
          <div className="h-20 w-20 md:h-40 md:w-40 rounded-full overflow-hidden mx-auto my-4 relative">
            <Image
              src={avatar.preview || noAvatar}
              alt="avatar"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={true}
              fill
              className="rounded-full"
            />
          </div>
        </label>

        <form onSubmit={handleSubmit(updateInfo)}>
          <label htmlFor="fullName" className="text-sm">
            Họ và tên*
          </label>
          <input
            type="text"
            {...register("fullName")}
            autoComplete="off"
            id="fullName"
            className="text-sm mb-1 border border-solid border-[#ebebeb] block w-full h-9 leading-9 px-3 outline-none "
          />
          <p className="text-main text-xs h-4 mb-2">
            {errors?.fullName && errors.fullName.message}
          </p>
          <label htmlFor="phoneNumber" className="text-sm">
            Số điện thoại*
          </label>
          <input
            {...register("phoneNumber")}
            type="text"
            autoComplete="off"
            id="phoneNumber"
            className="text-sm mb-1 border border-solid border-[#ebebeb] block w-full h-9 leading-9 px-3 outline-none "
          />
          <p className="text-main text-xs h-4 mb-2">
            {errors?.phoneNumber && errors.phoneNumber.message}
          </p>
          <label htmlFor="email" className="text-sm">
            Email
          </label>
          <input
            readOnly={true}
            {...register("email")}
            type="text"
            autoComplete="off"
            id="email"
            className="text-sm mb-7 border border-solid border-[#ebebeb] block w-full h-9 leading-9 px-3 outline-none "
          />
          <label htmlFor="address" className="text-sm">
            Địa chỉ*
          </label>
          <input
            {...register("address")}
            type="text"
            autoComplete="off"
            id="address"
            className="text-sm mb-1 border border-solid border-[#ebebeb] block w-full h-9 leading-9 px-3 outline-none "
          />
          <p className="text-main text-xs h-4 mb-2">
            {errors?.fullName && errors.fullName.message}
          </p>
          <label htmlFor="hobby" className="text-sm">
            Sở thích
          </label>
          <input
            {...register("hobby")}
            type="text"
            autoComplete="off"
            id="hobby"
            className="text-sm border border-solid border-[#ebebeb] block w-full h-9 leading-9 px-3 outline-none "
          />
          <button
            type="submit"
            className="bg-black px-10 py-3 block m-auto mt-8 uppercase font-semibold hover:bg-main text-white transition-all duration-200"
          >
            Cập nhật
          </button>
        </form>
      </div>
    </div>
  );
};

const ChangePassword = ({ isShow, setIsShoww }) => {
  const [showPass, setShowPass] = useState(false);
  const schema = yup
    .object({
      curentPassword: yup
        .string()
        .required("Mật khẩu hiện tại không được để trống")
        .min(8, "Mật khẩu hiện tại phải dài ít nhất 8 kí tự"),
      newPassword: yup
        .string()
        .required("Mật khẩu mới không được để trống")
        .min(8, "Mật khẩu mới phải dài ít nhất 8 kí tự"),
      confirmPassword: yup
        .string()
        .required("Mật khẩu xác nhận không được để trống")
        .min(8, "Mật khẩu xác nhận phải dài ít nhất 8 kí tự"),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      curentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  const changePassword = (data) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.warning("Vui lòng kiểm tra lại mật khẩu mới và mật khẩu xác nhận", {
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
    const dataUpdateInfo = new FormData();
    dataUpdateInfo.append("curentPassword", data.curentPassword);
    dataUpdateInfo.append("newPassword", data.newPassword);
    dataUpdateInfo.append("confirmPassword", data.confirmPassword);
    api
      .put(
        `/user/change-password/${localStorage.getItem("userId")}`,
        dataUpdateInfo
      )
      .then((res) => {
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
          Cookies.set("password", data.newPassword);
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
  return (
    <div
      className={`${
        isShow === "changePassword" ? "h-[460px]" : "h-[68px]"
      } mb-5 border border-solid border-[#ebebeb] transition-all duration-200 overflow-hidden`}
    >
      <div
        onClick={() => setIsShoww("changePassword")}
        className={`bg-[#f9f9f9] px-4 cursor-pointer border-b border-solid border-[#ebebeb] h-[67px] uppercase flex justify-between items-center`}
      >
        <p className="font-medium text-sm sm:text-base">Thay đổi mật khẩu</p>
        <TfiAngleDown
          className={`transition-all duration-200 ${
            isShow === "changePassword" ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>
      <div className="px-4 py-6">
        <form onSubmit={handleSubmit(changePassword)}>
          <label htmlFor="curentPassword" className="text-sm">
            Mật khẩu hiện tại*
          </label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              {...register("curentPassword")}
              autoComplete="off"
              id="curentPassword"
              className="text-sm mb-1 border border-solid border-[#ebebeb] block w-full h-9 leading-9 px-3 outline-none "
            />
            {showPass ? (
              <IoIosEye
                className="text-[#333] absolute top-1/2 -translate-y-1/2 right-3 text-[20px] cursor-pointer"
                onClick={() => setShowPass(false)}
              />
            ) : (
              <IoIosEyeOff
                className="text-[#333] absolute top-1/2 -translate-y-1/2 right-3 text-[20px] cursor-pointer"
                onClick={() => setShowPass(true)}
              />
            )}
          </div>
          <p className="text-main text-xs h-4 mb-2">
            {errors?.curentPassword && errors.curentPassword.message}
          </p>
          <label htmlFor="newPassword" className="text-sm">
            Mật khẩu mới*
          </label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              {...register("newPassword")}
              autoComplete="off"
              id="newPassword"
              className="text-sm mb-1 border border-solid border-[#ebebeb] block w-full h-9 leading-9 px-3 outline-none "
            />
            {showPass ? (
              <IoIosEye
                className="text-[#333] absolute top-1/2 -translate-y-1/2 right-3 text-[20px] cursor-pointer"
                onClick={() => setShowPass(false)}
              />
            ) : (
              <IoIosEyeOff
                className="text-[#333] absolute top-1/2 -translate-y-1/2 right-3 text-[20px] cursor-pointer"
                onClick={() => setShowPass(true)}
              />
            )}
          </div>
          <p className="text-main text-xs h-4 mb-2">
            {errors?.newPassword && errors.newPassword.message}
          </p>
          <label htmlFor="confirmPassword" className="text-sm">
            Nhập lại mật khẩu mới*
          </label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              {...register("confirmPassword")}
              autoComplete="off"
              id="confirmPassword"
              className="text-sm mb-1 border border-solid border-[#ebebeb] block w-full h-9 leading-9 px-3 outline-none "
            />
            {showPass ? (
              <IoIosEye
                className="text-[#333] absolute top-1/2 -translate-y-1/2 right-3 text-[20px] cursor-pointer"
                onClick={() => setShowPass(false)}
              />
            ) : (
              <IoIosEyeOff
                className="text-[#333] absolute top-1/2 -translate-y-1/2 right-3 text-[20px] cursor-pointer"
                onClick={() => setShowPass(true)}
              />
            )}
          </div>
          <p className="text-main text-xs h-4 mb-2">
            {errors?.confirmPassword && errors.confirmPassword.message}
          </p>

          <button
            type="submit"
            className="bg-black px-10 py-3 block m-auto mt-8 uppercase font-semibold hover:bg-main text-white transition-all duration-200"
          >
            Lưu
          </button>
        </form>
      </div>
    </div>
  );
};

const ListOrder = ({ isShow, setIsShoww }) => {
  return (
    <div
      className={`${
        isShow === "orders" ? "h-max" : "h-[68px]"
      } mb-5 border border-solid border-[#ebebeb] transition-all duration-200 overflow-hidden`}
    >
      <div
        onClick={() => setIsShoww("orders")}
        className={`bg-[#f9f9f9] px-4 cursor-pointer border-b border-solid border-[#ebebeb] h-[67px] uppercase flex justify-between items-center`}
      >
        <p className="font-medium text-sm sm:text-base">Đơn mua</p>
        <TfiAngleDown
          className={`transition-all duration-200 ${
            isShow === "orders" ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>
      <div>
        <OrderTable />
      </div>
    </div>
  );
};

export default function MyAccountClient() {
  const [isShow, setIsShow] = useState("");
  const setIsShoww = (data) => {
    setIsShow((prev) => {
      if (prev !== data) {
        return data;
      }
      return "";
    });
  };
  return (
    <div className="row py-20">
      <div className=" md:px-10 lg:px-40">
        <EditInfo isShow={isShow} setIsShoww={setIsShoww} />
        <ChangePassword isShow={isShow} setIsShoww={setIsShoww} />
        <ListOrder isShow={isShow} setIsShoww={setIsShoww} />
      </div>
    </div>
  );
}

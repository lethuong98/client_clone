"use client";
import React, { useState } from "react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import Link from "next/link";
import api from "@/api/Request";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const schema = yup
    .object({
      email: yup
        .string()
        .required("Email không được để trống")
        .email("Vui lòng nhập đúng định dạng email"),
      password: yup
        .string()
        .required("Mật khẩu không được để trống")
        .min(8, "Phải dài ít nhất 8 ký tự"),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: Cookies.get("email") || "",
      password: Cookies.get("password") || "",
    },
  });
  const [showPass, setShowPass] = useState(false);
  const [rememberAcc, setRememberAcc] = useState(true);
  const login = (data) => {
    const dataLogin = new FormData();
    dataLogin.append("email", data.email);
    dataLogin.append("password", data.password);
    api
      .post("/auth/login", dataLogin)
      .then((res) => {
        localStorage.setItem("userId", res.data.data.id);
        localStorage.setItem("fullName", res.data.data.fullName);
        localStorage.setItem("email", res.data.data.email);
        localStorage.setItem("phoneNumber", res.data.data.phoneNumber);
        localStorage.setItem("address", res.data.data.address);
        localStorage.setItem("hobby", res.data.data.hobby);
        localStorage.setItem("avatar", res.data.data.avatar);
        if (rememberAcc) {
          Cookies.set("email", data.email);
          Cookies.set("password", data.password);
        } else {
          Cookies.remove("email");
          Cookies.remove("password");
        }

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
        router.push(localStorage.getItem("pathname") || "/");
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
    <div className="px-4 py-10 sm:px-10 md:px-20 sm:py-20 shadow-auth">
      <form onSubmit={handleSubmit(login)}>
        <input
          autoComplete="off"
          type="text"
          {...register("email")}
          placeholder="Email"
          className="outline-none border border-solid border-[#ebebeb] w-full h-[45px] text-sm p-[15px] text-[#333]"
        />
        <p className="text-red-600 text-xs mb-[20px] mt-1 h-4">
          {errors?.email && errors.email.message}
        </p>
        <div className="relative ">
          <input
            autoComplete="off"
            type={showPass ? "text" : "password"}
            placeholder="Mật khẩu"
            {...register("password")}
            className="outline-none border border-solid border-[#ebebeb] w-full h-[45px] text-sm p-[15px] text-[#333]"
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
        <p className="text-red-600 text-xs mb-[32px] mt-1 h-4">
          {errors?.password && errors.password.message}
        </p>
        <div className="flex justify-between">
          <div>
            <input
              type="checkbox"
              id="remember"
              className="mr-2"
              checked={rememberAcc}
              onChange={(e) => setRememberAcc(e.target.checked)}
            />
            <label htmlFor="remember" className="text-sm text-[#333]">
              Nhớ mật khẩu
            </label>
          </div>
          <Link href="/forget-password">
            <p className="text-sm text-[#333]">Quên mật khẩu</p>
          </Link>
        </div>
        <button
          type="submit"
          className="uppercase px-4 py-2 text-sm bg-black text-white hover:bg-main mt-[24px]"
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

const Register = ({ setForm }) => {
  const router = useRouter();
  const schema = yup
    .object({
      email: yup
        .string()
        .required("Email không được để trống")
        .email("Vui lòng nhập đúng định dạng email"),
      password: yup
        .string()
        .required("Mật khẩu không được để trống")
        .length(8, "Phải dài ít nhất 8 ký tự"),
      fullName: yup.string().required("Họ tên không được để trống"),
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
      password: "",
      fullName: "",
    },
  });
  const registerr = (data) => {
    const dataRegister = new FormData();
    dataRegister.append("email", data.email);
    dataRegister.append("password", data.password);
    dataRegister.append("fullName", data.fullName);
    api.post("/auth/register", dataRegister).then((res) => {
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
      setForm("login");
    });
  };
  const [showPass, setShowPass] = useState(false);
  return (
    <div className="px-4 py-10 sm:px-10 md:px-20 sm:py-20 shadow-auth">
      <form id="" onSubmit={handleSubmit(registerr)}>
        <input
          autoComplete="off"
          type="text"
          placeholder="Email"
          {...register("email")}
          className="outline-none border border-solid border-[#ebebeb] w-full h-[45px] text-sm p-[15px] mb text-[#333]"
        />
        <p className="text-xs text-red-600 h-4 mb-[20px] mt-1">
          {errors?.email && errors.email.message}
        </p>
        <div className="relative">
          <input
            {...register("password")}
            type={showPass ? "text" : "password"}
            placeholder="Mật khẩu"
            className="outline-none border border-solid border-[#ebebeb] w-full h-[45px] text-sm p-[15px] text-[#333]"
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
        <p className="text-xs text-red-600 h-4 mb-[20px] mt-1">
          {errors?.password && errors.password.message}
        </p>
        <input
          autoComplete="off"
          type="text"
          {...register("fullName")}
          placeholder="Họ và tên"
          className="outline-none border border-solid border-[#ebebeb] w-full h-[45px] text-sm p-[15px]  text-[#333]"
        />
        <p className="text-xs text-red-600 h-4 mb-[24px] mt-1">
          {errors?.fullName && errors.fullName.message}
        </p>
        <button
          type="submit"
          className="uppercase px-4 py-2 text-sm bg-black text-white hover:bg-main"
        >
          Đăng ký
        </button>
      </form>
    </div>
  );
};

const LoginRegister = (props) => {
  const [formActive, setFormActive] = useState(
    () => props.searchParams.form || "login"
  );
  const setForm = (data) => {
    setFormActive(data);
  };
  return (
    <div className="mt-[70px]">
      <Breadcrumbs home="/" curent="login register" />
      <div className="my-20 row">
        <div className="w-full md:w-[670px] mx-auto">
          <div className="m-auto w-max mb-8">
            <h2
              style={{ color: formActive === "login" ? "#ff6e61" : "" }}
              className="inline-block font-bold text-2xl cursor-pointer"
              onClick={() => setForm("login")}
            >
              Đăng nhập
            </h2>
            <span className="mx-2 text-2xl">|</span>
            <h2
              style={{ color: formActive === "register" ? "#ff6e61" : "" }}
              className="inline-block font-bold text-2xl cursor-pointer"
              onClick={() => setForm("register")}
            >
              Đăng ký
            </h2>
          </div>
          {formActive === "login" ? <Login /> : <Register setForm={setForm} />}
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;

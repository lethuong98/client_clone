"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import api from "@/api/Request";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const BoxAccount = ({ showBoxAccount, closeBoxAccount }) => {
  const router = useRouter();
  const logout = () => {
    localStorage.setItem("pathname", "/");
    localStorage.removeItem("userId");
    localStorage.removeItem("fullName");
    localStorage.removeItem("email");
    localStorage.removeItem("phoneNumber");
    localStorage.removeItem("address");
    localStorage.removeItem("avatar");
    localStorage.removeItem("hobby");
    const dataLogout = new FormData();
    dataLogout.append("refreshToken", Cookies.get("refreshToken"));
    api.post("/auth/logout", dataLogout).then((res) => {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
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
      router.push("/login-register");
    });
    closeBoxAccount();
  };
  useEffect(() => {
    const checkLogin = Cookies.get("accessToken") ? true : false;
    if (checkLogin) {
      document.getElementById("login").style.display = "none";
      document.getElementById("register").style.display = "none";
    } else {
      document.getElementById("logout").style.display = "none";
      document.getElementById("info").style.display = "none";
    }
    return () => {
      if (document.getElementById("login")) {
        document.getElementById("login").style.display = "block";
      }
      if (document.getElementById("register")) {
        document.getElementById("register").style.display = "block";
      }
      if (document.getElementById("logout")) {
        document.getElementById("logout").style.display = "block";
      }
      if (document.getElementById("info")) {
        document.getElementById("info").style.display = "block";
      }
    };
  });
  return (
    <div
      className={`transition-all text-[12px] duration-500 w-[145px] py-2 px-3 flex items-center shadow-md bg-white  absolute z-[-1] right-[84px] ${
        showBoxAccount ? " top-[73px]" : "top-[-50px]"
      }`}
    >
      <ul>
        <Link href="/login-register?form=login">
          <li
            id="login"
            className="h-8 leading-8 cursor-pointer hover:text-main hover:translate-x-1 transition-all duration-300"
            onClick={() => {
              localStorage.setItem("pathname", window.location.pathname);
              closeBoxAccount();
            }}
          >
            Đăng nhập
          </li>
        </Link>
        <Link href="/login-register?form=register">
          <li
            id="register"
            className="h-8 leading-8 cursor-pointer hover:text-main hover:translate-x-1 transition-all duration-300"
            onClick={closeBoxAccount}
          >
            Đăng ký
          </li>
        </Link>
        <li
          id="logout"
          className="h-8 leading-8 cursor-pointer hover:text-main hover:translate-x-1 transition-all duration-300"
          onClick={logout}
        >
          Đăng xuất
        </li>
        <Link href="/my-account">
          <li
            id="info"
            className="h-8 leading-8 cursor-pointer hover:text-main hover:translate-x-1 transition-all duration-300"
            onClick={closeBoxAccount}
          >
            Thông tin tài khoản
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default BoxAccount;

import React from "react";
import Logo from "public/logo.png";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { AiOutlineSend } from "react-icons/ai";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

const Footer = () => {
  return (
    <footer className="bg-[#f6f6f6]">
      <div className={` pt-[100px]  row pb-[70px]`}>
        <div className="w-full grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6">
          <div className="logo">
            <Image src={Logo} alt="" priority={true} />
            <p className="mt-5">&copy; 2023 Flone.</p>
            <p>All Rights Reserved</p>
          </div>
          <div className="">
            <h3 className="text-[16px] font-semibold">VỀ CHÚNG TÔI</h3>
            <p className="mt-5  font-normal text-[#5d5d5d] text-[14px]">
              Về chúng tôi
            </p>
            <p className="mt-3  font-normal text-[#5d5d5d] text-[14px]">
              Vị trí cửa hàng
            </p>
            <p className="mt-3  font-normal text-[#5d5d5d] text-[14px]">
              Liên hệ
            </p>
          </div>
          <div className="">
            <h3 className="text-[16px] font-semibold">HỖ TRỢ KHÁCH HÀNG</h3>
            <p className="mt-5  font-normal text-[#5d5d5d] text-[14px]">
              Chính sách đổi trả
            </p>
            <p className="mt-3  font-normal text-[#5d5d5d] text-[14px]">
              Hướng dẫn chọn size
            </p>
            <p className="mt-3  font-normal text-[#5d5d5d] text-[14px]">
              Câu hỏi thường gặp
            </p>
          </div>
          <div className="xl:pl-11">
            <h3 className="text-[16px] font-semibold">KẾT NỐI</h3>
            <p className="mt-5  font-normal text-[#5d5d5d] text-[14px]">
              Facebook
            </p>
            <p className="mt-3  font-normal text-[#5d5d5d] text-[14px]">Zalo</p>
            <p className="mt-3  font-normal text-[#5d5d5d] text-[14px]">
              Youtube
            </p>
            <p className="mt-3  font-normal text-[#5d5d5d] text-[14px]">
              Tiktok
            </p>
          </div>
          <div className="sm:col-span-2">
            <h3 className="text-[16px] font-semibold">ĐĂNG KÝ NHẬN ƯU ĐÃI</h3>
            <p className="mt-3  font-normal text-[#5d5d5d] text-[14px]">
              Nhận thông tin ưu đãi mới nhất của cửa hàng qua email.
            </p>
            <div className="mt-5 send-email h-8">
              <input
                type="text"
                className="w-[90%] h-full outline-none text-sm bg-transparent border-b-[2px] border-solid border-[#ccc]"
                placeholder="Email"
              />
              <button className="mt-3 px-4 py-2 bg-black text-white hover:bg-main transition-all duration-200">
                Đăng ký
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

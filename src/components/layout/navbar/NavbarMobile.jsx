import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "public/logo.png";
import { TfiClose } from "react-icons/tfi";




const links = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
  {
    id: 2,
    title: "Sản phẩm",
    url: "/product",
  },  
  {
    id: 3,
    title: "Blog",
    url: "/blog",
  },
];

const NavbarMobile = ({ showNavbarMobile,closeNavbarMobile }) => {
  return (
    <nav
      className={`fixed z-50 px-[40px] py-[25px] top-0 left-0 h-screen w-[300px] navbar-mobile transition-all ease-linear duration-[500] bg-white ${
        showNavbarMobile ? "translate-x-0 visible" : "-translate-x-full invisible"
      }`}
    >
      <div className="flex items-end justify-between pb-8">
        <div className="logo">
        <Link href="/">
              <Image src={Logo} alt="" priority={true} />
            </Link>
        </div>
        <TfiClose className="text-[18px] cursor-pointer h-max" onClick={closeNavbarMobile}/>
      </div>
      {links.map((link) => (
        <Link
          key={link.id}
          href={link.url}
          className="text-[16px] tracking-wider block py-1 hover:text-main transition-all duration-500"
          onClick={closeNavbarMobile}
        >
          {link.title}
        </Link>
      ))}
    </nav>
  );
};

export default NavbarMobile;

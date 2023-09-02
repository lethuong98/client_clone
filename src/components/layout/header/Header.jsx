"use client";
import React from "react";
import Image from "next/image";
import Logo from "public/logo.png";
import NavbarDesktop from "../navbar/NavbarDesktop";

import ActionIcon from "./ActionIcon";
import NavbarMobile from "../navbar/NavbarMobile";
import Overlay from "../../common/Overlay";
import Link from "next/link";
import BoxSearch from "./BoxSearch";
import BoxAccount from "./BoxAccount";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const [showNavbarMobile, setShowNavbarMobile] = React.useState(false);
  const [showBoxSearch, setShowBoxSearch] = React.useState(false);
  const [showBoxAccount, setShowBoxAccount] = React.useState(false);
  const toggleNavbarMobile = () => {
    setShowNavbarMobile(!showNavbarMobile);
  };
  const closeNavbarMobile = () => {
    setShowNavbarMobile(false);
  };

  const toggleBoxSearch = () => {
    setShowBoxSearch(!showBoxSearch);
  };
  const closeBoxSearch = () => {
    setShowBoxSearch(false);
  };
  const toggleBoxAccount = () => {
    setShowBoxAccount(!showBoxAccount);
  };
  const closeBoxAccount = () => {
    setShowBoxAccount(false);
  };
  return (
    <>
      <header className="fixed z-30 h-[70px] top-0 left-0 right-0 bg-white">
        <div className="relative h-[70px] bg-white">
          <div
            className={`transition-all duration-500 absolute top-0 left-1/2 -translate-x-1/2 container  h-full w-full flex flex-wrap items-center justify-between px-4`}
          >
            <div className="logo">
              <Link href="/">
                <Image src={Logo} alt="" priority={true} />
              </Link>
            </div>

            <NavbarDesktop />

            <ActionIcon
              toggleNavbarMobile={toggleNavbarMobile}
              toggleBoxSearch={toggleBoxSearch}
              closeBoxSearch={closeBoxSearch}
              toggleBoxAccount={toggleBoxAccount}
              closeBoxAccount={closeBoxAccount}
            />
          </div>

          <BoxSearch showBoxSearch={showBoxSearch} />
          <BoxAccount
            showBoxAccount={showBoxAccount}
            closeBoxAccount={closeBoxAccount}
          />
        </div>
      </header>
      <Overlay showOverlay={showNavbarMobile} handleClick={closeNavbarMobile} />
      <NavbarMobile
        showNavbarMobile={showNavbarMobile}
        closeNavbarMobile={closeNavbarMobile}
      />
      <ToastContainer />
    </>
  );
};

export default Header;

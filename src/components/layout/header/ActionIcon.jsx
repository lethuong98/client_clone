import React from "react";
import Notification from "../../common/Notification";
import { useQuickView } from "@/context/Context";
import {
  TfiSearch,
  TfiUser,
  TfiHeart,
  TfiBag,
  TfiAlignJustify,
} from "react-icons/tfi";
import Link from "next/link";

const ActionIcon = ({
  toggleNavbarMobile,
  toggleBoxSearch,
  toggleBoxAccount,
  closeBoxAccount,
  closeBoxSearch,
}) => {
  const { countWishlist, countCart } = useQuickView();
  return (
    <div className="icon-action h-full flex items-center gap-4">
      <TfiSearch
        className="text-[18px] hover:text-main cursor-pointer h-max"
        onClick={() => {
          closeBoxAccount();
          toggleBoxSearch();
        }}
      />
      <TfiUser
        className="text-[18px] hover:text-main cursor-pointer"
        onClick={() => {
          toggleBoxAccount();
          closeBoxSearch();
        }}
      />
      <Notification count={countWishlist}>
        <Link href="/wishlist">
          <TfiHeart className="text-[18px] hover:text-main cursor-pointer" />
        </Link>
      </Notification>
      <Notification count={countCart}>
        <Link href="/cart">
          <TfiBag className="text-[18px] hover:text-main cursor-pointer" />
        </Link>
      </Notification>
      <TfiAlignJustify
        onClick={toggleNavbarMobile}
        className="text-[18px] cursor-pointer block sm:hidden"
      />
    </div>
  );
};

export default ActionIcon;

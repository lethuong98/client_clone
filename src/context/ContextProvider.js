"use client";
import React, { useState, useEffect } from "react";
import { QuickView } from "./Context";

export const QuickViewProvider = ({ children }) => {
  const [data, setData] = useState({});
  const [show, setShow] = useState(false);
  const [countWishlist, setCounWishlist] = useState(0);
  const [dataOrder, setDataOrder] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
    coupon: 100,
  });
  const [countCart, setCounCart] = useState(0);
  const handleToggleShow = () => {
    setShow(!show);
  };
  const addData = (data) => {
    setData(data);
  };
  const setCounWishlistt = (data) => {
    setCounWishlist(data);
  };
  const setCounCartt = (data) => {
    setCounCart(data);
  };
  const setDataOrderr = (data) => {
    setDataOrder(data);
  };
  useEffect(() => {
    setCounWishlist(() => {
      let wishlist = localStorage.getItem("wishlist");
      if (!wishlist) {
        return 0;
      }
      return JSON.parse(wishlist).length;
    });
  }, []);
  useEffect(() => {
    setCounCart(() => {
      let cart = localStorage.getItem("cart");
      if (!cart) {
        return 0;
      }
      return JSON.parse(cart).length;
    });
  }, []);
  return (
    <QuickView.Provider
      value={{
        show,
        handleToggleShow,
        data,
        addData,
        countWishlist,
        setCounWishlistt,
        countCart,
        setCounCartt,
        dataOrder,
        setDataOrderr,
      }}
    >
      {children}
    </QuickView.Provider>
  );
};

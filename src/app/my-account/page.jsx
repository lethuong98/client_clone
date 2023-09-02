import Breadcrumbs from "@/components/common/Breadcrumbs";
import MyAccountClient from "@/components/account/MyAccountClient";
import React from "react";

const page = () => {
  return (
    <div className="mt-[70px]">
      <Breadcrumbs home="/" curent="my account" />
      <MyAccountClient />
    </div>
  );
};

export default page;

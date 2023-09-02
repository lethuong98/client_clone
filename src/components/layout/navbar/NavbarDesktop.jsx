import React from "react";
import Link from "next/link";


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

const NavbarDesktop = () => {
  return (
    <nav className={`hidden gap-4 sm:flex`}>
      {links.map((link) => (
        <Link key={link.id} href={link.url} className={`text-[14px] lg:text-[16px] xl:text-[18px] hover:text-main font-medium tracking-wider`}>
          {link.title}
        </Link>
      ))}
    </nav>
  );
};

export default NavbarDesktop;

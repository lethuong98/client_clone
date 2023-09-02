import React from "react";
import { limitString } from "@/utils/Convert";
import Image from "next/image";
import Link from "next/link";

const CardBlogs = ({ blog }) => {
  return (
    <div className="group cursor-pointer">
      <Link href={`/blog/${blog.id}`}>
        <div className="relative">
          <div className="banner relative w-full overflow-hidden aspect-[370/270]">
            <Image
              src={blog.banners}
              alt=""
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="group-hover:scale-110 transition-all duration-300"
            />
          </div>
          <div className="content bg-white absolute left-1/2 -translate-x-1/2 px-8 py-3 w-[300px] bottom-[-30px]">
            <h2 className="text-[20px] font-medium text-left">
              {limitString(blog.title, 40)}
            </h2>
            <p className="author mt-2 text-[14px] font-normal italic text-center ">
              By Admin
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CardBlogs;

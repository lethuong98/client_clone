import React from "react";
import Image from "next/image";
import api from "@/api/Request";
import Link from "next/link";
import { myDecode } from "@/utils/Convert";
import moment from "moment";

const CardPostBlog = ({blog, text}) => {
  return (
    <div className="shadow-md">
      <div className="banner overflow-hidden">
        <Link href={`/blog/${blog.id}`}>
        <div className="wraper relative w-full aspect-[75/44]">
          <Image
            src={blog.banners}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="hover:scale-110 transition-all duration-300 cursor-pointer"
          />
        </div>
        </Link>
      </div>
      <div className="content pt-6 px-7 pb-8">
        <p className="created-at text-xs text-[#333] uppercase">{moment(blog.createdAt).format("hh:mm - DD/MM/YYYY")}</p>
        <h3 className="text-xl font-semibold cursor-pointer hover:text-main transition-all duration-300">
          {blog.title}
        </h3>
        <p className="text-[14px] mt-2">{text}</p>
      </div>
    </div>
  );
};

const getData = async (url) => {
  const res = await api.get(url);

  if (res) {
    return res.data.data;
  }
};

const ListBlogs = async ({ filter }) => {  
  const blogs = await getData(
    `/blog/get-all?page=${
      filter.page || 0
    }&rowsPerPage=6&searchKeyword=${myDecode(filter.searchKeyword)}`
  ); 
  return (
    <div className="list-products  grid gap-6  md:grid-cols-2 ">
      {blogs.map((item, index) => {
        return (
          <CardPostBlog
            key={index}
            blog={item}
            text="Aenean sollicitudin, lorem quis on endum uctor nisi elitod the cona sequat ipsum, necas sagittis sem natoque nibh id penatibus"
          />
        );
      })}
    </div>
  );
};

export default ListBlogs;

import React from "react";
import api from "@/api/Request";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import moment from "moment";
import Image from "next/image";
import ContentBlog from "@/components/blogdetail/ContentBlog";

const getData = async (url) => {
  const res = await api.get(url);

  if (res) {
    return res.data.data;
  }
};

const DetailBlogs = async ({ params }) => {
  const blog = await getData(`/blog/get-one/${params.id}`);
  return (
    <div className="mt-[70px]">
      <Breadcrumbs home="/" blog="/blog" curent={`${params.id}`} />
      <div className="row">
        <h1 className="mt-14 text-xl font-bold text-center ">{blog.title}</h1>
        <p className="mt-2 text-center font-medium text-xs text-[#7e7e7e]">
          {moment(blog.createdAt).format("hh:mm - DD/MM/YYYY")}
        </p>
        <p className="text-center font-bold mt-2 text-sm">by {blog?.author || 'Admin'}</p>
        <div className="banner relative aspect-[750/563] mt-2">
          <Image
            src={blog.banners}
            alt="banners"
            fill
            sizes="100vw"
            priority={true}
          />
        </div>
        <ContentBlog content={JSON.stringify(blog.content)} />
      </div>
    </div>
  );
};

export default DetailBlogs;

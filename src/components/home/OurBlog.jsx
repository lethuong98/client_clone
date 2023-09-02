import React from "react";
import CardBlogs from "../common/card/CardBlogs";
import api from "@/api/Request";
const getProducts = async (url) => {
  const res = await api.get(url);

  if (res) {
    return res.data.data;
  }
};

const OurBlog = async () => {
  const blogs = await getProducts(`/blog/get-all?rowsPerPage=3`);

  return (
    <div className={`blog row  `}>
      <div className="w-max m-auto mb-3">
        <h2
          className={`relative text-[24px] md:text-[30px] m-auto font-semibold before:content-[''] before:w-[30px] before:h-[2px] before:bg-black before:block before:absolute before:top-[60%] before:left-[-42px] after:content-[''] after:w-[30px] after:h-[2px] after:bg-black after:block after:absolute after:top-[60%] after:right-[-42px]`}
        >
          BLOG
        </h2>
      </div>
      <div className="mt-8 grid gap-x-6 gap-y-24 grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 mb-[140px]">
        {blogs.map((blog, index) => (
          <CardBlogs key={index} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default OurBlog;

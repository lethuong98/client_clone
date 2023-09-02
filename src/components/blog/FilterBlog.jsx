"use client";

import React, { useState, useEffect } from "react";
import { Pagination } from "@mui/material";
import Overlay from "@/components/common/Overlay";
import { TfiFilter, TfiSearch } from "react-icons/tfi";
import { myEncode } from "@/utils/Convert";
import { useRouter } from "next/navigation";
import api from "@/api/Request";

const CardTag = ({ text }) => {
  return (
    <div className="p-3 text-[14px] transition-all duration-300 cursor-pointer text-[#424242] bg-[#f6f6f6] rounded-full hover:bg-main hover:text-white">
      {text}
    </div>
  );
};

const FilterBlog = ({ children }) => {
  const router = useRouter();
  const [showFilter, setShowFilter] = useState(false);
  const [count, setCount] = useState(6);
  const [filter, setFilter] = useState({
    searchKeyword: "",
    page: 0,
  });
  const [search, setSearch] = useState("");
  useEffect(() => {
    api
      .get(
        `/blog/get-all?page=${filter.page}&rowsPerPage=6&searchKeyword=${filter.searchKeyword}`
      )
      .then((res) => {
        setCount(res.data.total);
      });
    router.push(
      `/blog?page=${filter.page}&rowsPerPage=6&searchKeyword=${myEncode(filter.searchKeyword)}`
    );
  }, [filter]);
  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };
  const closeFilter = () => {
    setShowFilter(false);
  };
  const getCountPage = (totalItem, itemsPerPage) => {
    const division = Math.floor(totalItem / itemsPerPage);
    const remainder = totalItem % itemsPerPage;
    if (remainder > 0) {
      return division + 1;
    } else {
      return division;
    }
  };
  return (
    <>
      <Overlay showOverlay={showFilter} handleClick={closeFilter} />
      <div className="products pt-36 row px-4 flex gap-1">
        {/* FILTER */}
        <div
          className={`filter transition-all duration-300 fixed z-40 lg:z-0 top-0 bottom-0 overflow-scroll lg:overflow-auto p-5 lg:translate-y-0 min-w-[300px] max-w-[300px] ${
            showFilter ? "left-0" : "-left-full"
          } bg-white lg:static lg:p-0`}
        >
          <h2 className="font-semibold mb-4 text-[#333]">Tìm kiếm</h2>
          <div
            className={`transition-all duration-500 w-full flex items-center bg-white h-[30px] mb-8`}
          >
            <input
              type="text"
              className="h-full w-[150px] text-[14px] outline-none border border-black px-[8px]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="h-full w-[45px] bg-black px-[15px] transition-all duration-500"
              onClick={() =>
                setFilter((prev) => {
                  const newValue = { ...prev };
                  newValue.searchKeyword = search;
                  newValue.page = 0;
                  return newValue;
                })
              }
            >
              <TfiSearch className="text-[15px] cursor-pointer text-white" />
            </button>
          </div>

          <h2 className="font-semibold mb-4 text-[#333]">Danh mục</h2>
          <ul>
            <li className="h-5 w-max flex items-center gap-3 group cursor-pointer mt-1">
              <span className="h-3 w-3 block border border-solid border-black rounded-sm group-hover:bg-main"></span>
              <p className="text-[14px] font-normal">Thời trang</p>
            </li>
            <li className="h-5 w-max flex items-center gap-3 group cursor-pointer mt-1">
              <span className="h-3 w-3 block border border-solid border-black rounded-sm group-hover:bg-main"></span>
              <p className="text-[14px] font-normal">Sức khoẻ</p>
            </li>
            <li className="h-5 w-max flex items-center gap-3 group cursor-pointer mt-1">
              <span className="h-3 w-3 block border border-solid border-black rounded-sm group-hover:bg-main"></span>
              <p className="text-[14px] font-normal">Du lịch</p>
            </li>
          </ul>
          <h2 className="font-semibold mb-4 mt-8 text-[#333]">Tag</h2>
          <div className="flex w-[80%] gap-2 flex-wrap">
            <CardTag text="Clothing" />
            <CardTag text="Accessories" />
            <CardTag text="For Men" />
            <CardTag text="Women" />
            <CardTag text="Fashion" />
            <CardTag text="The Life" />
          </div>
        </div>
        <div className="">
          <div className="mb-2 flex justify-end">
            <div
              className="icon-filter lg:hidden cursor-pointer"
              onClick={toggleFilter}
            >
              <TfiFilter />
            </div>
          </div>
          {children}
          <div className="pagination mt-10 mb-[100px] w-max m-auto">
            {count > 6 && (
              <Pagination
                count={getCountPage(count, 6)}
                page={filter.page + 1}
                onChange={(e, page) =>
                  setFilter((prev) => {
                    const newValue = { ...prev };
                    newValue.page = page - 1;
                    return newValue;
                  })
                }
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterBlog;

"use client";
import React, { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import { myEncode } from "@/utils/Convert";

import { TfiAngleDown, TfiFilter, TfiSearch } from "react-icons/tfi";
import Overlay from "@/components/common/Overlay";
import api from "@/api/Request";
import { useRouter } from "next/navigation";

const FilterProducts = ({ children, color, size, category }) => {
  const router = useRouter();
  const [count, setCount] = useState(12);
  const [showFilter, setShowFilter] = useState(false);
  const dataCategory = JSON.parse(category);
  const dataColor = JSON.parse(color);
  const dataSize = JSON.parse(size);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({
    sorted: "DESC",
    sortBy: "createdAt",
    searchKeyword: "",
    category: [],
    color: [],
    size: [],
    page: 0,
  });
  const getCountPage = (totalItem, itemsPerPage) => {
    const division = Math.floor(totalItem / itemsPerPage);
    const remainder = totalItem % itemsPerPage;
    if (remainder > 0) {
      return division + 1;
    } else {
      return division;
    }
  };
  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };
  const closeFilter = () => {
    setShowFilter(false);
  };

  useEffect(() => {
    api
      .get(
        `/product/get-all/?searchKeyword=${filter.searchKeyword}&category=${filter.category}&size=${filter.size}&color=${filter.color}&page=${filter.page}&rowsPerPage=12&newProduct=&saleProduct=&sorted=${filter.sorted}&sortBy=${filter.sortBy}`
      )
      .then((res) => {
        setCount(res.data.total);
      });
    router.push(
      `/product?searchKeyword=${myEncode(filter.searchKeyword)}&category=${
        filter.category
      }&size=${filter.size}&color=${filter.color}&page=${filter.page}&sortBy=${
        filter.sortBy
      }&sorted=${filter.sorted}`
    );
  }, [filter]);
  return (
    <>
      <Overlay showOverlay={showFilter} handleClick={closeFilter} />

      <div className="products py-10 lg:py-24 row flex">
        {/* FILTER */}
        <div
          className={`filter transition-all duration-300 fixed z-40 lg:z-0 top-0 bottom-0 overflow-scroll lg:overflow-visible p-5 lg:translate-y-0 min-w-[300px] ${
            showFilter ? "left-0" : "-left-full"
          } bg-white lg:p-0 lg:static`}
        >
          <h2 className="font-semibold mb-4 text-[#333]">Tìm kiếm</h2>
          <div
            className={`transition-all duration-500 w-full flex items-center bg-white h-[30px] mb-8`}
          >
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-full w-[150px] text-[14px] outline-none border border-black px-[8px]"
            />
            <button
              className="h-full w-[45px] bg-black px-[15px] hover:bg-black transition-all duration-500"
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
            {dataCategory.map((item, index) => {
              return (
                <li
                  key={index}
                  className="h-5 w-max flex items-center gap-3 cursor-pointer mt-1 group"
                  onClick={() =>
                    setFilter((prev) => {
                      const newValue = { ...prev };
                      newValue.page = 0;
                      if (newValue.category.indexOf(item.id) === -1) {
                        newValue.category.push(item.id);
                        return newValue;
                      }
                      newValue.category.splice(
                        newValue.category.indexOf(item.id),
                        1
                      );
                      return newValue;
                    })
                  }
                >
                  <span
                    className={`h-3 w-3 block border border-solid group-hover:bg-main border-black rounded-sm  ${
                      filter.category.includes(item.id)
                        ? "bg-main"
                        : "bg-transparent"
                    }`}
                  ></span>
                  <p className="text-[14px] font-normal">{item.nameCategory}</p>
                </li>
              );
            })}
          </ul>
          <h2 className="font-semibold mb-4 mt-8 text-[#333]">Kích thước</h2>
          <ul>
            {dataSize.map((item, index) => {
              return (
                <li
                  key={index}
                  className="h-5 w-max flex items-center gap-3 cursor-pointer mt-1 group"
                  onClick={() =>
                    setFilter((prev) => {
                      const newValue = { ...prev };
                      newValue.page = 0;
                      if (newValue.size.indexOf(item.id) === -1) {
                        newValue.size.push(item.id);
                        return newValue;
                      }
                      newValue.size.splice(newValue.size.indexOf(item.id), 1);
                      return newValue;
                    })
                  }
                >
                  <span
                    className={`h-3 w-3 block border border-solid group-hover:bg-main border-black rounded-sm  ${
                      filter.size.includes(item.id)
                        ? "bg-main"
                        : "bg-transparent"
                    }`}
                  ></span>
                  <p className="text-[14px] font-normal">{item.nameSize}</p>
                </li>
              );
            })}
          </ul>
          <h2 className="font-semibold mb-4 mt-8 text-[#333]">Màu sắc</h2>
          <ul>
            {dataColor.map((item, index) => {
              return (
                <li
                  key={index}
                  className="h-5 w-max flex items-center gap-3 group cursor-pointer mt-1 group"
                  onClick={() =>
                    setFilter((prev) => {
                      const newValue = { ...prev };
                      newValue.page = 0;
                      if (newValue.color.indexOf(item.id) === -1) {
                        newValue.color.push(item.id);
                        return newValue;
                      }
                      newValue.color.splice(newValue.color.indexOf(item.id), 1);
                      return newValue;
                    })
                  }
                >
                  <span
                    className={`h-3 w-3 block border border-solid group-hover:bg-main border-black rounded-sm  ${
                      filter.color.includes(item.id)
                        ? "bg-main"
                        : "bg-transparent"
                    }`}
                  ></span>
                  <p className="text-[14px] font-normal">{item.nameColor}</p>
                </li>
              );
            })}
          </ul>
        </div>
        <div className=" flex-grow">
          <div className="sort h-8 mb-4 w-full flex gap-3 items-center justify-between">
            <div className="h-full w-max flex items-center gap-3">
              <h4 className="text-[13px] font-extralight">Sắp xếp theo</h4>
              <div className="h-full text-[13px] leading-8 pl-4 w-[174px] relative bg-[#eee] cursor-pointer group">
                {filter.sorted === "DESC" && filter.sortBy === "createdAt"
                  ? "Sản phẩm mới nhất"
                  : filter.sorted === "DESC" && filter.sortBy === "regularPrice"
                  ? "Giá từ cao đến thấp"
                  : "Giá từ thấp đến cao"}
                <TfiAngleDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px]" />
                <ul className=" absolute w-full h-0 bg-white z-50 top-full overflow-hidden left-0 group-hover:h-[96px] transition-all duration-300">
                  <li
                    className="px-4 text-[13px] hover:bg-slate-400"
                    onClick={() =>
                      setFilter((prev) => {
                        const newValue = { ...prev };
                        newValue.sorted = "ASC";
                        newValue.sortBy = "regularPrice";
                        newValue.page = 0;
                        return newValue;
                      })
                    }
                  >
                    Giá từ thấp đến cao
                  </li>
                  <li
                    className="px-4 text-[13px] hover:bg-slate-400"
                    onClick={() =>
                      setFilter((prev) => {
                        const newValue = { ...prev };
                        newValue.sorted = "DESC";
                        newValue.sortBy = "regularPrice";
                        newValue.page = 0;
                        return newValue;
                      })
                    }
                  >
                    Giá từ cao đến thấp
                  </li>
                  <li
                    className="px-4 text-[13px] hover:bg-slate-400"
                    onClick={() =>
                      setFilter((prev) => {
                        const newValue = { ...prev };
                        newValue.sorted = "DESC";
                        newValue.sortBy = "createdAt";
                        newValue.page = 0;
                        return newValue;
                      })
                    }
                  >
                    Sản phẩm mới nhất
                  </li>
                </ul>
              </div>
            </div>
            <div
              className="icon-filter lg:hidden cursor-pointer"
              onClick={toggleFilter}
            >
              <TfiFilter />
            </div>
          </div>
          {children}
          <div className="pagination my-10 w-max m-auto">
            {count > 12 && (
              <Pagination
                count={getCountPage(count, 12)}
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

export default FilterProducts;

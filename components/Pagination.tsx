"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

type Pagination = {
  href: string;
  page: number;
  limit: number;
  count: number;
};

const Pagination = ({ href, page, limit, count }: Pagination) => {
  const [isLeftVisible, SetIsLeftVisible] = useState(false);
  const [isRightVisible, SetIsRightVisible] = useState(false);

  useEffect(() => {
    if (!isLeftVisible && page > 1) {
      SetIsLeftVisible(true);
    } else if (isLeftVisible && page === 1) {
      SetIsLeftVisible(false);
    }
  }, [page]);

  useEffect(() => {
    if (!isRightVisible && page * limit < count) {
      SetIsRightVisible(true);
    } else if (isRightVisible && page * limit >= count) {
      SetIsRightVisible(false);
    }
  }, [page]);
  return (
    <div className="bg-gray-200 p-3 flex gap-1 justify-center font-bold">
      <Link
        href={`${href}?page=${page - 1}&limit=${limit}`}
        className={`${isLeftVisible ? "" : "hidden"}`}
      >
        <div className="bg-blue-950 text-slate-100 rounded-md w-[50px] h-[50px] flex justify-center items-center">
          <FaArrowLeft size={24} />
        </div>
      </Link>
      <div className="bg-blue-950 text-slate-100 rounded-md w-[50px] h-[50px] flex justify-center items-center">
        {page}
      </div>

      <Link
        href={`${href}?page=${page + 1}&limit=${limit}`}
        className={`${isRightVisible ? "" : "hidden"}`}
      >
        <div className="bg-blue-950 text-slate-100 rounded-md w-[50px] h-[50px] flex justify-center items-center">
          <FaArrowRight size={24} />
        </div>
      </Link>
    </div>
  );
};

export default Pagination;

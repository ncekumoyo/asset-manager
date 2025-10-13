import PageTitle from "@/components/PageTitle";
import Link from "next/link";
import React from "react";
import { prisma } from "@/lib/prisma";
import { FaPencil, FaX } from "react-icons/fa6";
import LinkButton from "@/components/LinkButton ";
import { getCategoriesByPage, getCategoryCount } from "@/lib/db";
import Pagination from "@/components/Pagination";

const Categories = async ({
  searchParams,
}: {
  searchParams: { page?: string; limit?: string };
}) => {
  const sp = await searchParams;
  const page = Number(sp?.page ?? 1);
  const limit = Number(sp?.limit ?? 20);

  const categories = await getCategoriesByPage(page, limit);
  const categoryCount = await getCategoryCount();

  return (
    <div className="flex flex-col gap-5 h-full w-full px-5 pt-5">
      <PageTitle title="Categories" />
      <LinkButton
        href={"/categories/create"}
        className="bg-red-400 text-slate-100"
        label={"Add"}
      />
      <div className="w-full overflow-y-scroll">
        <table className="w-full rounded-t-md overflow-hidden">
          <thead>
            <tr className=" bg-blue-100">
              <th className="p-2 text-start">Name</th>
              <th className="p-2 text-start">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((item, index) => (
              <tr key={index} className="border-b border-blue-200">
                <td className="py-1 px-2">{item?.name}</td>
                <td className="py-1 px-2">
                  <div className="flex gap-5 py-1 px-2">
                    <Link
                      href={`/categories/${item?.id}/edit`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <FaPencil size={18} />
                    </Link>
                    <Link
                      href={`categories/${item?.id}/delete`}
                      className="text-red-400 hover:text-red-500"
                    >
                      <FaX size={18} />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        page={page}
        limit={limit}
        count={categoryCount}
        href="/categories"
      />
    </div>
  );
};

export default Categories;

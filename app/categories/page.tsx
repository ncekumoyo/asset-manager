import PageTitle from "@/components/PageTitle";
import Link from "next/link";
import React from "react";
import { prisma } from "@/lib/prisma";
import { FaPencil, FaX } from "react-icons/fa6";
import LinkButton from "@/components/LinkButton ";

async function getCategories() {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return categories;
}

const Categories = async () => {
  const categories = await getCategories();
  return (
    <div className="flex flex-col gap-5">
      <PageTitle title="Categories" />
      <LinkButton
        href={"/categories/create"}
        className="bg-red-400 text-slate-100"
        label={"Add"}
      />
      <table className="table-auto border">
        <thead>
          <tr className="border bg-gray-200">
            <th className="px-2 py-1 text-start">Name</th>
            <th className="px-2 py-1 text-start">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories?.map((item, index) => (
            <tr key={index} className="border">
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
  );
};

export default Categories;

import PageTitle from "@/components/PageTitle";
import Link from "next/link";
import React from "react";
import { prisma } from "@/lib/prisma";
import { FaPencil, FaX } from "react-icons/fa6";
import LinkButton from "@/components/LinkButton ";
import { IoSwapHorizontal } from "react-icons/io5";

async function getAssets() {
  const assets = await prisma.asset.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      category: true,
      department: true,
      location: true,
    },
  });
  return assets;
}

const Assets = async () => {
  const assets = await getAssets();
  return (
    <div className="flex flex-col gap-5">
      <PageTitle title="Assets" />
      <LinkButton
        href={"/assets/create"}
        className="bg-red-400 text-slate-100"
        label={"Add"}
      />
      <table className="table-auto border">
        <thead>
          <tr className="border bg-gray-200">
            <th className="px-2 py-1 text-start">Name</th>
            <th className="px-2 py-1 text-start">Detail</th>
            <th className="px-2 py-1 text-start">Acquired</th>
            <th className="px-2 py-1 text-start">Disposed</th>
            <th className="px-2 py-1 text-start">Quantity</th>
            <th className="px-2 py-1 text-start">Category</th>
            <th className="px-2 py-1 text-start">Department</th>
            <th className="px-2 py-1 text-start">Location</th>
            <th className="px-2 py-1 text-start">Actions</th>
          </tr>
        </thead>
        <tbody>
          {assets?.map((item, index) => (
            <tr key={index} className="border">
              <td className="py-1 px-2">{item?.name}</td>
              <td className="py-1 px-2">{item?.detail}</td>
              <td className="py-1 px-2">
                {item?.acquired?.toLocaleDateString()}
              </td>
              <td className="py-1 px-2">
                {item?.disposed?.toLocaleDateString()}
              </td>
              <td className="py-1 px-2">{item?.quantity}</td>
              <td className="py-1 px-2">{item?.category?.name}</td>
              <td className="py-1 px-2">{item?.department?.name}</td>
              <td className="py-1 px-2">{item?.location?.name}</td>
              <td className="py-1 px-2">
                <div className="flex gap-5 py-1 px-2">
                  <Link
                    href={`/assets/${item?.id}/edit`}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <FaPencil size={18} />
                  </Link>
                  <Link
                    href={`assets/${item?.id}/delete`}
                    className="text-red-400 hover:text-red-500"
                  >
                    <FaX size={18} />
                  </Link>
                  <Link
                    href={`assets/${item?.id}/transfer`}
                    className="text-green-700 hover:text-green-600"
                  >
                    <IoSwapHorizontal size={18} />
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

export default Assets;

import PageTitle from "@/components/PageTitle";
import Link from "next/link";
import React from "react";
import { prisma } from "@/lib/prisma";
import { FaArrowLeft, FaArrowRight, FaPencil, FaX } from "react-icons/fa6";
import LinkButton from "@/components/LinkButton ";
import { IoSwapHorizontal } from "react-icons/io5";
import { getAssetCount, getAssetsByPage } from "@/lib/db";
import Pagination from "@/components/Pagination";

const Assets = async ({
  searchParams,
}: {
  searchParams: { page?: string; limit?: string };
}) => {
  const sp = await searchParams;
  const page = Number(sp?.page ?? 1);
  const limit = Number(sp?.limit ?? 20);

  const assets = await getAssetsByPage(page, limit);
  const assetCount = await getAssetCount();

  return (
    <div className="flex flex-col gap-5 h-full w-full px-5 pt-5">
      <PageTitle title="Assets" />
      <LinkButton
        href={"/assets/create"}
        className="bg-red-400 text-slate-100"
        label={"Add"}
      />
      <div className="w-full overflow-y-scroll">
        <table className="w-full rounded-t-md overflow-hidden">
          <thead>
            <tr className="bg-blue-100">
              <th className="p-2 text-start">Name</th>
              <th className="p-2 text-start">Detail</th>
              <th className="p-2 text-start">Acquired</th>
              <th className="p-2 text-start">Disposed</th>
              <th className="p-2 text-start">Quantity</th>
              <th className="p-2 text-start">Category</th>
              <th className="p-2 text-start">Department</th>
              <th className="p-2 text-start">Location</th>
              <th className="p-2 text-start">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assets?.map((item, index) => (
              <tr key={index} className="border-b border-blue-200">
                <td className="py-1 px-2">{item?.name}</td>
                <td className="py-1 px-2">{item?.detail}</td>
                <td className="py-1 px-2">
                  {item?.acquired?.toLocaleDateString("en-GB")}
                </td>
                <td className="py-1 px-2">
                  {item?.disposed?.toLocaleDateString("en-GB")}
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
      <Pagination href="/assets" page={page} limit={limit} count={assetCount} />
    </div>
  );
};

export default Assets;

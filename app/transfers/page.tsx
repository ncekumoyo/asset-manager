import PageTitle from "@/components/PageTitle";
import Link from "next/link";
import React from "react";
import { prisma } from "@/lib/prisma";
import LinkButton from "@/components/LinkButton ";
import Pagination from "@/components/Pagination";
import { getTransferCount, getTransfersByPage } from "@/lib/db";

async function getTransfers() {
  const transfers = await prisma.transfer.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      asset: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  return transfers;
}

const Transfers = async ({
  searchParams,
}: {
  searchParams: { page?: string; limit?: string };
}) => {
  const sp = await searchParams;
  const page = Number(sp?.page ?? 1);
  const limit = Number(sp?.limit ?? 20);

  const transfers = await getTransfersByPage(page, limit);
  const transferCount = await getTransferCount();
  return (
    <div className="flex flex-col gap-5 px-3 pt-5 h-full">
      <PageTitle title="Transfers" />
      <div className="w-full overflow-y-scroll">
        <table className="w-full rounded-t-md overflow-hidden">
          <thead>
            <tr className="bg-blue-100">
              <th className="p-2 text-start">Date</th>
              <th className="p-2 text-start">Asset</th>
              <th className="p-2 text-start">Reason</th>
              <th className="p-2 text-start">From Department</th>
              <th className="p-2 text-start">To Department</th>
              <th className="p-2 text-start">From Location</th>
              <th className="p-2 text-start">To Location</th>
            </tr>
          </thead>
          <tbody>
            {transfers?.map((item, index) => (
              <tr key={index} className="border-b border-blue-200">
                <td className="p-2">
                  {item?.createdAt.toLocaleDateString("en-GB")}
                </td>
                <td className="py-1 px-2">{item?.asset?.name}</td>
                <td className="py-1 px-2">{item?.reason}</td>
                <td className="py-1 px-2">{item?.fromDepartment}</td>
                <td className="py-1 px-2">{item?.toDepartment}</td>
                <td className="py-1 px-2">{item?.fromLocation}</td>
                <td className="py-1 px-2">{item?.toLocation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        href="/transfers"
        page={page}
        limit={limit}
        count={transferCount}
      />
    </div>
  );
};

export default Transfers;

import PageTitle from "@/components/PageTitle";
import Link from "next/link";
import React from "react";
import { prisma } from "@/lib/prisma";
import LinkButton from "@/components/LinkButton ";

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

const Transfers = async () => {
  const transfers = await getTransfers();
  return (
    <div className="flex flex-col gap-5">
      <PageTitle title="Transfers" />
      <table className="table-auto rounded-t-md overflow-hidden">
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
              <td className="py-1 px-2">
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
  );
};

export default Transfers;

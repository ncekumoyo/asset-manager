import LinkButton from "@/components/LinkButton ";
import PageTitle from "@/components/PageTitle";
import { getAsset, getTransfersByAsset } from "@/lib/db";
import React from "react";

const TransfersByAsset = async ({ params }: { params: { id: string } }) => {
  const id = Number(params.id);
  const currentAsset = await getAsset(id);
  const transfers = await getTransfersByAsset(id);
  return (
    <div className="flex flex-col gap-5">
      <PageTitle title={`Transfers: ${currentAsset?.name}`} />
      <LinkButton
        href={`/assets/${id}/transfers/transfer`}
        className="bg-red-400 text-slate-100"
        label={"Transfer"}
      />
      <table className="table-auto border">
        <thead>
          <tr className="border bg-gray-200">
            <th className="px-2 py-1 text-start">Date</th>
            <th className="px-2 py-1 text-start">Reason</th>
            <th className="px-2 py-1 text-start">From Category</th>
            <th className="px-2 py-1 text-start">To Category</th>
            <th className="px-2 py-1 text-start">From Department</th>
            <th className="px-2 py-1 text-start">To Department</th>
            <th className="px-2 py-1 text-start">From Location</th>
            <th className="px-2 py-1 text-start">To Location</th>
          </tr>
        </thead>
        <tbody>
          {transfers?.map((item, index) => (
            <tr key={index} className="border">
              <td className="py-1 px-2">
                {item?.createdAt.toLocaleDateString()}
              </td>
              <td className="py-1 px-2">{item?.reason}</td>
              <td className="py-1 px-2">{item?.fromCategory}</td>
              <td className="py-1 px-2">{item?.toCategory}</td>
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

export default TransfersByAsset;

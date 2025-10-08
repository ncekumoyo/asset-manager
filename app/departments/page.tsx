import PageTitle from "@/components/PageTitle";
import Link from "next/link";
import React from "react";
import { prisma } from "@/lib/prisma";
import { FaPencil, FaX } from "react-icons/fa6";
import LinkButton from "@/components/LinkButton ";

async function getDepartments() {
  const departments = await prisma.department.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return departments;
}

const Departments = async () => {
  const departments = await getDepartments();
  return (
    <div className="flex flex-col gap-5">
      <PageTitle title="Departments" />
      <LinkButton
        href={"/departments/create"}
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
          {departments?.map((item, index) => (
            <tr key={index} className="border">
              <td className="py-1 px-2">{item?.name}</td>
              <td className="py-1 px-2">
                <div className="flex gap-5 py-1 px-2">
                  <Link
                    href={`/departments/${item?.id}/edit`}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <FaPencil size={18} />
                  </Link>
                  <Link
                    href={`departments/${item?.id}/delete`}
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

export default Departments;

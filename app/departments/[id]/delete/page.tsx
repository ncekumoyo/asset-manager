import PageTitle from "@/components/PageTitle";
import React from "react";
import { prisma } from "@/lib/prisma";
import Button from "@/components/Button";
import LinkButton from "@/components/LinkButton ";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function getDepartment(id: number) {
  const department = await prisma.department.findUnique({ where: { id } });
  return department;
}

const DeleteDepartment = async ({ params }: { params: { id: string } }) => {
  const id = Number(params.id);
  const currentDepartment = await getDepartment(id);

  async function deleteDepartment(formData: FormData) {
    "use server";
    await prisma.department.delete({ where: { id } });
    revalidatePath("/departments");
    redirect("/departments");
  }
  return (
    <div className="flex flex-col gap-5 p-5">
      <PageTitle title={`Delete: ${currentDepartment?.name}`} />
      <form action={deleteDepartment}>
        <div className="flex flex-col gap-5 justify-center p-10">
          <p className="text-2xl">
            Are you sure you want to delete{" "}
            <span className="text-red-400 font-bold ">
              {currentDepartment?.name}
            </span>
            ?
          </p>
          <div className="flex gap-5">
            <Button
              label="Yes, Delete!"
              type="submit"
              className="bg-red-400 hover:bg-red-500 text-slate-100"
            />
            <LinkButton
              label="No, Go Back"
              href="/departments"
              className="bg-gray-200 hover:bg-gray-100"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default DeleteDepartment;

import Button from "@/components/Button";
import PageTitle from "@/components/PageTitle";
import TextInput from "@/components/TextInput";
import React from "react";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function getDepartment(id: number) {
  const department = await prisma.department.findUnique({
    where: { id },
  });
  return department;
}

const EditDepartment = async ({ params }: { params: { id: string } }) => {
  const id = Number(params.id);
  const currentDepartment = await getDepartment(id);

  async function updateDepartment(formData: FormData) {
    "use server";
    const departmentName = formData.get("department") as string;
    const department = await prisma.department.update({
      where: { id },
      data: {
        name: departmentName,
      },
    });
    revalidatePath("/departments");
    redirect("/departments");
  }
  return (
    <div className="flex flex-col gap-5">
      <PageTitle title="Edit Department" />
      <form action={updateDepartment}>
        <div className="flex flex-col gap-5">
          <h2 className="font-bold text-lg">
            Edit Department: {currentDepartment?.name}
          </h2>
          <TextInput
            label="Department Name"
            type="text"
            placeholder="Enter department name..."
            name="department"
            defaultValue={currentDepartment?.name}
          />
          <div className="flex gap-5">
            <Button
              label="Save"
              type="submit"
              className="bg-blue-950 hover:bg-blue-900 cursor-pointer text-slate-100"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditDepartment;

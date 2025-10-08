import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import React from "react";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const CreateDepartment = () => {
  async function createDepartment(formData: FormData) {
    "use server";
    const departmentName = formData.get("department") as string;
    const department = await prisma.department.create({
      data: {
        name: departmentName,
      },
    });
    revalidatePath("/departments");
    redirect("/departments");
  }

  return (
    <form action={createDepartment}>
      <div className="flex flex-col gap-5">
        <h2 className="font-bold text-lg">Add Department</h2>
        <TextInput
          label="Department Name"
          type="text"
          placeholder="Enter department name..."
          name="department"
        />
        <div className="flex gap-5">
          <Button
            label="Save"
            type="submit"
            className="bg-blue-950 hover:bg-blue-900 cursor-pointer text-slate-100"
          />
          <Button
            label="Clear"
            type="reset"
            className="bg-gray-200 hover:bg-gray-100 cursor-pointer"
          />
        </div>
      </div>
    </form>
  );
};

export default CreateDepartment;

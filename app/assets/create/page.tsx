import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import React from "react";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Select from "@/components/Select";
import { getCategories, getDepartments, getLocations } from "@/lib/db";

const CreateAsset = async () => {
  const locations = await getLocations();
  const departments = await getDepartments();
  const categories = await getCategories();

  async function createAsset(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const detail = formData.get("detail") as string;
    const acq = formData.get("acquired") as string;
    const acquired = acq ? new Date(acq) : null;
    const dis = formData.get("disposed") as string;
    const disposed = dis ? new Date(dis) : null;
    const quantity = Number(formData.get("quantity") as string);
    const cat = formData.get("category") as string;
    const categoryId = cat ? Number(cat) : null;
    const dep = formData.get("department") as string;
    const departmentId = dep ? Number(dep) : null;
    const loc = formData.get("location") as string;
    const locationId = loc ? Number(loc) : null;

    await prisma.asset.create({
      data: {
        name,
        detail,
        acquired: acquired ?? null,
        disposed: disposed ?? null,
        quantity,
        categoryId,
        departmentId,
        locationId,
      },
    });
    revalidatePath("/assets");
    redirect("/assets");
  }

  return (
    <form action={createAsset}>
      <div className="flex flex-col gap-5 p-5">
        <h2 className="font-bold text-lg">Add Asset</h2>
        <div className="flex gap-5 flex-wrap">
          <TextInput
            label="Asset Name"
            type="text"
            placeholder="Enter asset name..."
            name="name"
            required
          />
          <TextInput label="Detail" type="text" name="detail" />
        </div>

        <div className="flex gap-5 flex-wrap">
          <TextInput
            label="Acquired"
            type="date"
            name="acquired"
            className="flex-1 w-[400px]"
          />
          <TextInput
            label="Disposed"
            type="date"
            name="disposed"
            className="flex-1 w-[400px]"
          />
        </div>

        <TextInput
          label="Quantity"
          type="number"
          name="quantity"
          defaultValue={1}
          className="w-[400px]"
        />
        <div className="flex gap-5 flex-wrap">
          <Select label="Category" name="category" options={categories} />
          <Select label="Department" name="department" options={departments} />
          <Select label="Location" name="location" options={locations} />
        </div>

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

export default CreateAsset;

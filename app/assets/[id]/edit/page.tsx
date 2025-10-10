import Button from "@/components/Button";
import PageTitle from "@/components/PageTitle";
import TextInput from "@/components/TextInput";
import React from "react";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Select from "@/components/Select";
import { getCategories, getDepartments, getLocations } from "@/lib/db";

async function getAsset(id: number) {
  const asset = await prisma.asset.findUnique({
    where: { id },
  });
  return asset;
}

const EditAsset = async ({ params }: { params: { id: string } }) => {
  const id = Number(params.id);
  const currentAsset = await getAsset(id);

  const locations = await getLocations();
  const departments = await getDepartments();
  const categories = await getCategories();

  async function updateAsset(formData: FormData) {
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

    await prisma.asset.update({
      where: { id },
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
    <div className="flex flex-col gap-5">
      <PageTitle title="Edit Asset" />
      <form action={updateAsset}>
        <div className="flex flex-col gap-5">
          <h2 className="font-bold text-lg">
            Edit Asset: {currentAsset?.name}
          </h2>
          <div className="flex gap-5 flex-wrap">
            <TextInput
              label="Asset Name"
              type="text"
              defaultValue={currentAsset?.name}
              name="name"
              required
            />
            <TextInput
              label="Detail"
              type="text"
              name="detail"
              defaultValue={currentAsset?.detail ?? ""}
            />
          </div>

          <div className="flex gap-5 flex-wrap">
            <TextInput
              label="Acquired"
              type="date"
              name="acquired"
              defaultValue={currentAsset?.acquired?.toISOString().split("T")[0]}
              className="flex-1 w-[400px]"
            />
            <TextInput
              label="Disposed"
              type="date"
              name="disposed"
              defaultValue={currentAsset?.disposed?.toISOString().split("T")[0]}
              className="flex-1 w-[400px]"
            />
          </div>

          <TextInput
            label="Quantity"
            type="number"
            name="quantity"
            defaultValue={currentAsset?.quantity}
            className="w-[400px]"
          />
          <div className="flex gap-5 flex-wrap">
            <Select
              label="Category"
              name="category"
              options={categories}
              defaultValue={currentAsset?.categoryId?.toString()}
            />
            <Select
              label="Department"
              name="department"
              options={departments}
              defaultValue={currentAsset?.departmentId?.toString()}
            />
            <Select
              label="Location"
              name="location"
              options={locations}
              defaultValue={currentAsset?.locationId?.toString()}
            />
          </div>

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

export default EditAsset;

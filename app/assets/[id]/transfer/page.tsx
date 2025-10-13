import Button from "@/components/Button";
import Select from "@/components/Select";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAsset, getDepartments, getLocations } from "@/lib/db";
import { prisma } from "@/lib/prisma";
import React from "react";
import PageTitle from "@/components/PageTitle";
import TextInput from "@/components/TextInput";

const MakeTransfer = async ({ params }: { params: { id: string } }) => {
  const id = Number(params.id);
  const currentAsset = await getAsset(id);

  const locations = await getLocations();
  const departments = await getDepartments();

  const locMap = Object.fromEntries(
    locations.map((item) => [item.id, item.name])
  );
  const depMap = Object.fromEntries(
    departments.map((item) => [item.id, item.name])
  );

  async function transferAsset(formData: FormData) {
    "use server";
    const reason = formData.get("reason") as string;
    const dep = formData.get("department") as string;
    const departmentId = dep ? Number(dep) : null;
    const loc = formData.get("location") as string;
    const locationId = loc ? Number(loc) : null;

    const depsame = currentAsset?.departmentId === departmentId;
    const locsame = currentAsset?.locationId === locationId;

    if (!depsame || !locsame) {
      await prisma.transfer.create({
        data: {
          assetId: id,
          reason,
          fromDepartment: depsame ? "" : currentAsset?.department?.name,
          toDepartment: depsame ? "" : departmentId ? depMap[departmentId] : "",
          fromLocation: locsame ? "" : currentAsset?.location?.name,
          toLocation: locsame ? "" : locationId ? locMap[locationId] : "",
        },
      });
    }

    await prisma.asset.update({
      where: { id },
      data: {
        name: undefined,
        detail: undefined,
        acquired: undefined,
        disposed: undefined,
        quantity: undefined,
        categoryId: undefined,
        departmentId,
        locationId,
      },
    });

    revalidatePath("/assets");
    redirect("/assets");
  }

  return (
    <div className="flex flex-col gap-5 p-5">
      <PageTitle title="Transfer Asset" />
      <form action={transferAsset}>
        <div className="flex flex-col gap-5">
          <h2 className="font-bold text-lg">
            Transfer Asset: {currentAsset?.name}
          </h2>
          <TextInput label="Reason" type="text" name="reason" />
          <div className="flex gap-5 flex-wrap">
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

export default MakeTransfer;

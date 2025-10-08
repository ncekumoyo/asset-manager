import Button from "@/components/Button";
import PageTitle from "@/components/PageTitle";
import TextInput from "@/components/TextInput";
import React from "react";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function getLocation(id: number) {
  const location = await prisma.location.findUnique({
    where: { id },
  });
  return location;
}

const EditLocation = async ({ params }: { params: { id: string } }) => {
  const id = Number(params.id);
  const currentLocation = await getLocation(id);

  async function updateLocation(formData: FormData) {
    "use server";
    const locationName = formData.get("location") as string;
    const location = await prisma.location.update({
      where: { id },
      data: {
        name: locationName,
      },
    });
    revalidatePath("/locations");
    redirect("/locations");
  }
  return (
    <div className="flex flex-col gap-5">
      <PageTitle title="Edit Location" />
      <form action={updateLocation}>
        <div className="flex flex-col gap-5">
          <h2 className="font-bold text-lg">
            Edit Location: {currentLocation?.name}
          </h2>
          <TextInput
            label="Location Name"
            type="text"
            placeholder="Enter location name..."
            name="location"
            defaultValue={currentLocation?.name}
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

export default EditLocation;

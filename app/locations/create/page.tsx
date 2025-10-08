import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import React from "react";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const CreateLocation = () => {
  async function createLocation(formData: FormData) {
    "use server";
    const locationName = formData.get("location") as string;
    const location = await prisma.location.create({
      data: {
        name: locationName,
      },
    });
    revalidatePath("/locations");
    redirect("/locations");
  }

  return (
    <form action={createLocation}>
      <div className="flex flex-col gap-5">
        <h2 className="font-bold text-lg">Add Location</h2>
        <TextInput
          label="Location Name"
          type="text"
          placeholder="Enter location name..."
          name="location"
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

export default CreateLocation;

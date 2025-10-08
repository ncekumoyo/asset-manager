import PageTitle from "@/components/PageTitle";
import React from "react";
import { prisma } from "@/lib/prisma";
import Button from "@/components/Button";
import LinkButton from "@/components/LinkButton ";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function getLocation(id: number) {
  const location = await prisma.location.findUnique({ where: { id } });
  return location;
}

const DeleteLocation = async ({ params }: { params: { id: string } }) => {
  const id = Number(params.id);
  const currentLocation = await getLocation(id);

  async function deleteLocation(formData: FormData) {
    "use server";
    await prisma.location.delete({ where: { id } });
    revalidatePath("/locations");
    redirect("/locations");
  }
  return (
    <div className="flex flex-col gap-5">
      <PageTitle title={`Delete: ${currentLocation?.name}`} />
      <form action={deleteLocation}>
        <div className="flex flex-col gap-5 justify-center p-10">
          <p className="text-2xl">
            Are you sure you want to delete{" "}
            <span className="text-red-400 font-bold ">
              {currentLocation?.name}
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
              href="/locations"
              className="bg-gray-200 hover:bg-gray-100"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default DeleteLocation;

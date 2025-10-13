import PageTitle from "@/components/PageTitle";
import React from "react";
import { prisma } from "@/lib/prisma";
import Button from "@/components/Button";
import LinkButton from "@/components/LinkButton ";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function getAsset(id: number) {
  const asset = await prisma.asset.findUnique({ where: { id } });
  return asset;
}

const DeleteAsset = async ({ params }: { params: { id: string } }) => {
  const id = Number(params.id);
  const currentAsset = await getAsset(id);

  async function deleteAsset(formData: FormData) {
    "use server";
    await prisma.asset.delete({ where: { id } });
    revalidatePath("/assets");
    redirect("/assets");
  }
  return (
    <div className="flex flex-col gap-5 p-5">
      <PageTitle title={`Delete: ${currentAsset?.name}`} />
      <form action={deleteAsset}>
        <div className="flex flex-col gap-5 justify-center p-10">
          <p className="text-2xl">
            Are you sure you want to delete{" "}
            <span className="text-red-400 font-bold ">
              {currentAsset?.name}
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
              href="/assets"
              className="bg-gray-200 hover:bg-gray-100"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default DeleteAsset;

import PageTitle from "@/components/PageTitle";
import React from "react";
import { prisma } from "@/lib/prisma";
import Button from "@/components/Button";
import LinkButton from "@/components/LinkButton ";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function getCategory(id: number) {
  const category = await prisma.category.findUnique({ where: { id } });
  return category;
}

const DeleteCategory = async ({ params }: { params: { id: string } }) => {
  const id = Number(params.id);
  const currentCategory = await getCategory(id);

  async function deleteCategory(formData: FormData) {
    "use server";
    await prisma.category.delete({ where: { id } });
    revalidatePath("/categories");
    redirect("/categories");
  }
  return (
    <div className="flex flex-col gap-5">
      <PageTitle title={`Delete: ${currentCategory?.name}`} />
      <form action={deleteCategory}>
        <div className="flex flex-col gap-5 justify-center p-10">
          <p className="text-2xl">
            Are you sure you want to delete{" "}
            <span className="text-red-400 font-bold ">
              {currentCategory?.name}
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
              href="/categories"
              className="bg-gray-200 hover:bg-gray-100"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default DeleteCategory;

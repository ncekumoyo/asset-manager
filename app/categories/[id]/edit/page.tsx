import Button from "@/components/Button";
import PageTitle from "@/components/PageTitle";
import TextInput from "@/components/TextInput";
import React from "react";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function getCategory(id: number) {
  const category = await prisma.category.findUnique({
    where: { id },
  });
  return category;
}

const EditCategory = async ({ params }: { params: { id: string } }) => {
  const id = Number(params.id);
  const currentCategory = await getCategory(id);

  async function updateCategory(formData: FormData) {
    "use server";
    const categoryName = formData.get("category") as string;
    const category = await prisma.category.update({
      where: { id },
      data: {
        name: categoryName,
      },
    });
    revalidatePath("/categories");
    redirect("/categories");
  }
  return (
    <div className="flex flex-col gap-5 p-5">
      <PageTitle title="Edit Category" />
      <form action={updateCategory}>
        <div className="flex flex-col gap-5">
          <h2 className="font-bold text-lg">
            Edit Category: {currentCategory?.name}
          </h2>
          <TextInput
            label="Category Name"
            type="text"
            placeholder="Enter category name..."
            name="category"
            defaultValue={currentCategory?.name}
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

export default EditCategory;

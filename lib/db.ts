import { prisma } from "./prisma";

export async function getCategories() {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
    select: { id: true, name: true },
  });
  return categories;
}

export async function getDepartments() {
  const departments = await prisma.department.findMany({
    orderBy: {
      name: "asc",
    },
    select: { id: true, name: true },
  });
  return departments;
}

export async function getLocations() {
  const locations = await prisma.location.findMany({
    orderBy: {
      name: "asc",
    },
    select: { id: true, name: true },
  });
  return locations;
}

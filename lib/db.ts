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

export async function getTransfersByAsset(id: number) {
  const transfers = await prisma.transfer.findMany({ where: { id } });
  return transfers;
}

export async function getAsset(id: number) {
  const asset = await prisma.asset.findUnique({
    where: { id },
    include: {
      department: { select: { id: true, name: true } },
      location: { select: { id: true, name: true } },
    },
  });
  return asset;
}

export async function getAssetCount() {
  const count = await prisma.asset.count();
  return count;
}

export async function getDepartmentCount() {
  const count = await prisma.department.count();
  return count;
}

export async function getLocationCount() {
  const count = await prisma.location.count();
  return count;
}

export async function getCategoryCount() {
  const count = await prisma.category.count();
  return count;
}

export async function getTransferCount() {
  const count = await prisma.transfer.count();
  return count;
}

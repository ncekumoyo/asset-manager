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

export async function getAssetsByPage(page: number, limit: number) {
  const assets = await prisma.asset.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      category: true,
      department: true,
      location: true,
    },
    skip: (page - 1) * limit,
    take: limit,
  });
  return assets;
}

export async function getLocationsByPage(page: number, limit: number) {
  const locations = await prisma.location.findMany({
    orderBy: {
      name: "asc",
    },
    skip: (page - 1) * limit,
    take: limit,
  });
  return locations;
}

export async function getDepartmentsByPage(page: number, limit: number) {
  const departments = await prisma.department.findMany({
    orderBy: {
      name: "asc",
    },
    skip: (page - 1) * limit,
    take: limit,
  });
  return departments;
}

export async function getCategoriesByPage(page: number, limit: number) {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
    skip: (page - 1) * limit,
    take: limit,
  });
  return categories;
}

export async function getTransfersByPage(page: number, limit: number) {
  const transfers = await prisma.transfer.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      asset: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    skip: (page - 1) * limit,
    take: limit,
  });
  return transfers;
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

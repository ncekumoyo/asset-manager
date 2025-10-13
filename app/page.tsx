import AuthBar from "@/components/AuthBar";
import CountCard from "@/components/CountCard";
import PageTitle from "@/components/PageTitle";
import {
  getAssetCount,
  getCategoryCount,
  getDepartmentCount,
  getLocationCount,
  getTransferCount,
} from "@/lib/db";
import Image from "next/image";

export default async function Home() {
  const assetCount = await getAssetCount();
  const departmentCount = await getDepartmentCount();
  const locationCount = await getLocationCount();
  const transferCount = await getTransferCount();
  const categoryCount = await getCategoryCount();

  return (
    <div className="flex flex-col gap-5 p-5 h-full w-full">
      <PageTitle title="Dashboard" />
      <div className="flex gap-10 flex-wrap">
        <CountCard title="Assets" count={assetCount} href="/assets" />
        <CountCard title="Transfers" count={transferCount} href="/transfers" />
        <CountCard
          title="Categories"
          count={categoryCount}
          href="/categories"
        />
        <CountCard
          title="Departments"
          count={departmentCount}
          href="/departments"
        />
        <CountCard title="Locations" count={locationCount} href="/locations" />
      </div>
    </div>
  );
}

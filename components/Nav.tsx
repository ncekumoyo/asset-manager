import React from "react";
import NavLink from "./NavLink";
import {
  FaBuilding,
  FaChartLine,
  FaClipboardCheck,
  FaLayerGroup,
  FaMapLocation,
} from "react-icons/fa6";
import { IoSwapHorizontal } from "react-icons/io5";

const Nav = () => {
  return (
    <div className="flex flex-col gap-1 text-slate-100 h-full bg-gray-100 w-[200px]">
      <div className="p-5 font-bold text-xl text-center  bg-blue-950 h-[150px]">
        <h1>
          <span className=" text-red-400">BEITBRIDGE CITY COUNCIL</span>
          <br />
          <span className="text-sm">ASSET MANAGER</span>
        </h1>
      </div>
      <div className="flex flex-col gap-1 flex-1 overflow-y-scroll">
        <NavLink title="Dashboard" href="/" icon={FaChartLine} />
        <NavLink
          title="Assets"
          href="/assets?page=1&limit=20"
          icon={FaClipboardCheck}
        />
        <NavLink
          title="Transfers"
          href="/transfers?page=1&limit=20"
          icon={IoSwapHorizontal}
        />
        <NavLink
          title="Departments"
          href="/departments?page=1&limit=20"
          icon={FaBuilding}
        />
        <NavLink
          title="Locations"
          href="/locations?page=1&limit=20"
          icon={FaMapLocation}
        />
        <NavLink
          title="Categories"
          href="/categories?page=1&limit=20"
          icon={FaLayerGroup}
        />
      </div>
      <div className="bg-blue-950 p-5 text-xs font-bold">
        &copy;2025 Beitbridge City Council
      </div>
    </div>
  );
};

export default Nav;

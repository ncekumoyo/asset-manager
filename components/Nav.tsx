import React from "react";
import NavLink from "./NavLink";
import {
  FaBuilding,
  FaClipboardCheck,
  FaLayerGroup,
  FaMapLocation,
} from "react-icons/fa6";

const Nav = () => {
  return (
    <div className="flex flex-col gap-1 text-slate-100 h-full bg-gray-100 w-[200px]">
      <div className="flex  items-center justify-center p-5 font-bold text-xl bg-blue-950 h-[150px]">
        ASSET MANAGER
      </div>
      <div className="flex flex-col gap-1 flex-1 overflow-y-scroll">
        <NavLink title="Assets" href="/assets" icon={FaClipboardCheck} />
        <NavLink title="Departments" href="/departments" icon={FaBuilding} />
        <NavLink title="Locations" href="/locations" icon={FaMapLocation} />
        <NavLink title="Categories" href="/categories" icon={FaLayerGroup} />
      </div>
      <div className="bg-blue-950 p-5 text-xs font-bold">
        &copy;2025 Sintusoft Technologies
      </div>
    </div>
  );
};

export default Nav;

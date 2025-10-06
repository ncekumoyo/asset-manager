import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";

type NavLink = {
  title: string;
  href: string;
  icon: IconType;
};

const NavLink = ({ title, href, icon: Icon }: NavLink) => {
  return (
    <Link href={href}>
      <div className="p-5 bg-blue-900 hover:bg-blue-800 flex items-center gap-5 text-slate-100">
        <Icon size={24} />
        <div className=" font-bold">{title}</div>
      </div>
    </Link>
  );
};

export default NavLink;

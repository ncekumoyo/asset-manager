import Link from "next/link";
import React from "react";

type CountCard = {
  title: string;
  count: number;
  href: string;
};

const CountCard = ({ title, count, href }: CountCard) => {
  return (
    <Link href={href}>
      <div className="flex flex-col rounded-md overflow-hidden bg-blue-100 w-[200px] h-[200px]">
        <h2 className="px-3 py-2 bg-blue-200 text-lg text-center font-bold">
          {title}
        </h2>
        <div className="flex justify-center items-center p-3 text-5xl flex-1">
          {count}
        </div>
      </div>
    </Link>
  );
};

export default CountCard;

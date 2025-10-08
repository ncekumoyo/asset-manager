import Link from "next/link";
import React from "react";

type LinkButton = {
  label: string;
  href: string;
  className?: string;
};

const LinkButton = ({ label, href, className }: LinkButton) => {
  return (
    <Link
      href={href}
      className={`px-3 py-2 font-bold rounded-md w-[200px] text-center ${className}`}
    >
      {label}
    </Link>
  );
};

export default LinkButton;

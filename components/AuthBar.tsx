import React from "react";
import { FaUser } from "react-icons/fa6";

const AuthBar = () => {
  return (
    <div className="px-5 py-2 bg-gray-100 flex justify-end">
      <div className="flex items-center gap-5">
        <div className="font-bold">John Doe (Admin)</div>
        <div className="flex justify-center items-center rounded-full h-[40px] w-[40px] bg-white">
          <FaUser size={24} className="" />
        </div>
      </div>
    </div>
  );
};

export default AuthBar;

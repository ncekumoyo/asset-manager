import React, { InputHTMLAttributes } from "react";

type Option = {
  id: number;
  name: string;
};

type Select = InputHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: Option[];
};

const Select = ({
  label,
  name,
  className,
  required,
  defaultValue,
  options,
}: Select) => {
  return (
    <div className="flex border border-gray-200 w-[400px] rounded-md overflow-hidden">
      <div className="flex items-center bg-gray-200 px-3 w-[120px]">
        <label className="">{label}</label>
      </div>
      <select
        name={name}
        defaultValue={defaultValue}
        className={`px-3 py-2 border border-gray-200 flex-1 ${className}`}
        required={required}
      >
        <option value="">--- Select ---</option>
        {options?.map((item, index) => (
          <option key={index} value={item?.id}>
            {item?.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;

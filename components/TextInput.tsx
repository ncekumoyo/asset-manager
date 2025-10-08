import React from "react";

// type TextInput = {
//   label: string;
//   type: string;
//   placeholder?: string;
//   name?: string;
//   value?: string;
//   defaultValue?: string;
//   className?: string;
//   required: boolean;
// };

type TextInput = HTMLInputElement & {
  label: string;
};

const TextInput = ({
  label,
  type,
  placeholder,
  name,
  defaultValue,
  required,
  className,
}: TextInput) => {
  return (
    <div className="flex gap-5 items-center">
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        defaultValue={defaultValue}
        className={`px-3 py-2 border flex-1 rounded-md ${className}`}
        required={required}
      />
    </div>
  );
};

export default TextInput;

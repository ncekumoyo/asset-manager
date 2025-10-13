import React from "react";
import TextInput from "./TextInput";
import Button from "./Button";
import { FaSearch } from "react-icons/fa";

type Search = {
  action: (formData: FormData) => Promise<void>;
  defaultValue?: string;
};

const Search = ({ action, defaultValue }: Search) => {
  return (
    <form action={action}>
      <div className="flex  rounded-md overflow-hidden">
        <input
          type="text"
          name="search"
          placeholder="Enter search term..."
          defaultValue={defaultValue}
          className="w-[300px] border border-blue-200 px-3 py-2"
        />
        <button
          type="submit"
          className="bg-red-500 hover:bg-red-700 text-slate-100 px-3 py-2 rounded-e-md cursor-pointer"
        >
          <FaSearch size={24} />
        </button>
      </div>
    </form>
  );
};

export default Search;

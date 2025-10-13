import React from "react";

type PageTitle = {
  title: string;
};

const PageTitle = ({ title }: PageTitle) => {
  return (
    <h1 className="font-bold text-3xl border-b-4 pb-3 border-blue-200 ">
      {title}
    </h1>
  );
};

export default PageTitle;

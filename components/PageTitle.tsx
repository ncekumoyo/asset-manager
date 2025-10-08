import React from "react";

type PageTitle = {
  title: string;
};

const PageTitle = ({ title }: PageTitle) => {
  return <h1 className="font-bold text-3xl ">{title}</h1>;
};

export default PageTitle;

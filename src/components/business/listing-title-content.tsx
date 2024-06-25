import React from "react";

const ListingTitleContent = ({
  title,
  children,
}: {
  title: React.ReactNode;
  children?: React.ReactNode;
}) => {
  return (
    <div className="flex w-full flex-col gap-3">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default ListingTitleContent;

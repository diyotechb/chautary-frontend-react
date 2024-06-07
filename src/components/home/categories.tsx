import { cn } from "@/lib/utils";
import React from "react";

interface CategorySectionWithHeaderProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

const CategorySectionWithHeader = ({
  title,
  description,
  children,
  className = "",
}: CategorySectionWithHeaderProps) => {
  return (
    <div className={cn("mx-auto w-full max-w-screen-xl py-5", className)}>
      <div className="flex flex-col items-center justify-center gap-8">
        <h2 className="text-lg font-bold md:text-2xl">{title}</h2>
        <p className="mx-auto max-w-screen-md text-center text-sm font-medium text-muted-foreground">
          {description}
        </p>
        {children}
      </div>
    </div>
  );
};

export default CategorySectionWithHeader;

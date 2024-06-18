"use client";

import { type Category } from "@/types";
import { ChevronDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

const CategoryFilter = ({
  categoryId,
  categories,
}: {
  categoryId?: string;
  categories?: Category[];
}) => {
  const pathname = usePathname();
  const params = useSearchParams();
  const { replace } = useRouter();

  function categoryFilterHandler(id: string) {
    const searchParams = new URLSearchParams(params);
    searchParams.delete("searchKeyword");
    searchParams.delete("page");
    if (Number(id) < 1) {
      searchParams.delete("categoryId");
      replace(`${pathname}?${searchParams.toString()}`);
      return;
    }
    searchParams.set("categoryId", id);
    replace(`${pathname}?${searchParams.toString()}`);
  }
  return (
    <aside className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">Categories</h3>
        <ChevronDown className="size-6" />
      </div>
      <RadioGroup
        defaultValue={categoryId || "0"}
        className="space-y-1.5"
        onValueChange={(id: string) => {
          categoryFilterHandler(id);
        }}
      >
        <div className="flex items-center space-x-3">
          <RadioGroupItem value={"0"} id={"all"} />
          <label htmlFor={"all"} className="cursor-pointer text-sm font-medium">
            All
          </label>
        </div>

        {categories?.length &&
          categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-3">
              <RadioGroupItem
                value={category.id.toString()}
                id={category.id.toString()}
              />
              <label
                htmlFor={category.id.toString()}
                className="cursor-pointer text-sm font-medium"
              >
                {category.name}
              </label>
            </div>
          ))}
      </RadioGroup>
    </aside>
  );
};

export default CategoryFilter;

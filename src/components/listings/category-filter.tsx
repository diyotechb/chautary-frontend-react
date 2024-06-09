"use client";

import { LISTINGS } from "@/lib/listings";
import { ChevronDown } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const CategoryFilter = ({ categoryId }: { categoryId?: string }) => {
  const pathname = usePathname();
  const params = useSearchParams();
  const { replace } = useRouter();

  function categoryFilterHandler(id: string) {
    const searchParams = new URLSearchParams(params);
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
        {LISTINGS.map((listing) => (
          <div key={listing.id} className="flex items-center space-x-3">
            <RadioGroupItem value={listing.id} id={listing.id} />
            <label
              htmlFor={listing.id}
              className="cursor-pointer text-sm font-medium"
            >
              {listing.name}
            </label>
          </div>
        ))}
      </RadioGroup>
    </aside>
  );
};

export default CategoryFilter;

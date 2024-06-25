"use client";

import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SORT_ORDER = [
  {
    value: "alphabetical",
    label: "Alphabetical",
  },
  {
    value: "latest",
    label: "Latest",
  },
];

export const CategorySort = ({ sortBy }: { sortBy?: string }) => {
  const pathname = usePathname();
  const params = useSearchParams();
  const { replace } = useRouter();

  const changeSortBy = (value: string) => {
    const searchParams = new URLSearchParams(params);
    searchParams.set("sortBy", value);
    replace(`${pathname}?${searchParams.toString()}`);
  };

  const removeSortBy = () => {
    const searchParams = new URLSearchParams(params);
    searchParams.delete("sortBy");
    replace(`${pathname}?${searchParams.toString()}`);
  };

  return (
    <div className="flex items-center gap-4 transition-all duration-300">
      <p className="text-nowrap text-sm">Sort By:</p>
      <Select
        value={sortBy ?? ""}
        defaultValue={sortBy ?? ""}
        onValueChange={changeSortBy}
      >
        <SelectTrigger className="w-36 font-semibold !outline-none !ring-0 !ring-offset-0">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          {SORT_ORDER.map((order) => (
            <SelectItem
              key={order.value}
              value={order.value}
              className="cursor-pointer"
            >
              {order.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {sortBy && (
        <X
          role="button"
          aria-label="clear filters"
          className="size-4 duration-300 hover:text-destructive"
          onClick={removeSortBy}
        />
      )}
    </div>
  );
};

"use client";

import { cn } from "@/lib/utils";
import { type Category } from "@/types";
import { Check, ChevronDown, List, SearchIcon, XCircle } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface SearchProps {
  categories?: Category[];
  searchKeyword?: string;
  categoryId?: string;
  currentPathname?: string;
}

const Search: React.FC<SearchProps> = ({
  categories,
  searchKeyword,
  categoryId,
  currentPathname,
}) => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<
    Pick<Category, "id" | "name">
  >({
    id: 0,
    name: "",
  });

  const searchHandler = () => {
    const params = new URLSearchParams(searchParams);
    if (selectedCategory.id) {
      params.set("categoryId", selectedCategory.id.toString());
    }
    if (searchValue) {
      params.set("searchKeyword", searchValue);
    }
    push(`/listings?${params.toString()}`);
  };

  const clearSearchFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("categoryId");
    push(`${currentPathname ?? pathname}?${params.toString()}`);
  };

  useEffect(() => {
    setSearchValue(searchKeyword || "");
    if (searchKeyword) {
      setSelectedCategory({ id: Number(categoryId) || 0, name: "" });
    } else {
      setSelectedCategory({ id: 0, name: "" });
    }
  }, [searchKeyword, categoryId]);

  return (
    <search className="flex min-h-fit w-full flex-wrap items-center justify-center gap-4 rounded bg-white p-4 shadow-brandLight duration-500 focus-within:shadow-brand hover:shadow-brand xl:h-16 xl:p-0 xl:pl-8 xl:pr-4">
      <div className="flex w-full flex-1 items-center md:min-w-[300px]">
        <SearchIcon className="text-muted-foreground" />
        <Input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="What are you looking for ?"
          className="h-full flex-1 !border-none text-base font-medium text-dark !outline-none !ring-0 !ring-offset-0"
        />
      </div>
      {/* <div className="h-full w-0.5 bg-primary" /> */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between !border-none !bg-transparent p-0 text-base !outline-none !ring-0 !ring-offset-0 xl:w-1/3"
          >
            <span className="flex w-full items-center gap-4">
              <List className="shrink-0 text-muted-foreground" />
              {selectedCategory.id ? (
                <div className="flex w-full items-center justify-between">
                  <p className="w-full max-w-[180px] overflow-hidden text-ellipsis text-start">
                    {categories?.find((item) => item.id === selectedCategory.id)
                      ?.name || selectedCategory.name}
                  </p>
                  <XCircle
                    className="mr-4 size-4 text-neutral-500 duration-300 hover:text-destructive"
                    aria-label="clear category filter"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCategory({ id: 0, name: "" });
                      clearSearchFilter();
                    }}
                  />
                </div>
              ) : (
                <span className="text-muted-foreground">Select</span>
              )}
            </span>
            <ChevronDown
              className={cn(
                "ml-auto size-5 shrink-0 transform text-primary opacity-50 duration-300",
                open && "rotate-180 transform duration-300",
              )}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="h-64 p-0" side="bottom">
          <Command>
            <CommandInput placeholder="" />
            <CommandList>
              <CommandEmpty>No categories found.</CommandEmpty>
              <CommandGroup>
                {categories?.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.name}
                    onSelect={(currentValue) => {
                      setSelectedCategory((prev) => ({
                        ...prev,
                        id: item.id,
                        name: currentValue,
                      }));
                      setOpen(false);
                    }}
                    className="cursor-pointer"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedCategory.id === item.id
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                    {item.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Button
        className="w-full py-6 font-bold duration-300 hover:bg-dark xl:w-fit"
        onClick={searchHandler}
      >
        Search Now
      </Button>
    </search>
  );
};

export default Search;

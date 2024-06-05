"use client";

import { LISTINGS } from "@/lib/listings";
import { cn } from "@/lib/utils";
import {
  Check,
  ChevronDown,
  ChevronsUpDown,
  List,
  SearchIcon,
} from "lucide-react";
import React from "react";
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

const Search = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState({
    id: "",
    name: "",
  });

  return (
    <search className="flex h-16 w-full items-center rounded bg-white pl-8 pr-4 shadow-lg shadow-primary">
      <div className="flex flex-1 items-center">
        <SearchIcon className="text-muted-foreground" />
        <Input
          placeholder="What are you looking for ?"
          className="h-full flex-1 !border-none text-base font-medium text-dark !outline-none !ring-0 !ring-offset-0"
        />
      </div>
      <div className="h-full w-0.5 bg-primary" />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="h-full w-1/3 justify-between !border-none !bg-transparent text-base !outline-none !ring-0 !ring-offset-0"
          >
            <span className="flex items-center gap-4">
              <List className="shrink-0 text-muted-foreground" />
              {value.id ? (
                <p className="w-full max-w-[180px] overflow-hidden text-ellipsis">
                  {
                    LISTINGS.find((listing) => listing.name === value.name)
                      ?.name
                  }
                </p>
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
        <PopoverContent className="h-64 w-[200px] p-0" side="bottom">
          <Command>
            <CommandInput placeholder="" />
            <CommandList>
              <CommandEmpty>No categories found.</CommandEmpty>
              <CommandGroup>
                {LISTINGS.map((listing) => (
                  <CommandItem
                    key={listing.id}
                    value={listing.name}
                    onSelect={(currentValue) => {
                      setValue((prev) => ({
                        ...prev,
                        id: listing.id,
                        name: currentValue,
                      }));
                      setOpen(false);
                    }}
                    className="cursor-pointer"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value.id === listing.id ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {listing.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Button className="py-6 font-bold duration-300 hover:bg-dark">
        Search Now
      </Button>
    </search>
  );
};

export default Search;

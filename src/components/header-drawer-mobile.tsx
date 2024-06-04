"use client";

import { cn } from "@/lib/utils";
import { ChevronRight, Menu, XIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_LINKS, REGIONS } from "./header";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const HeaderDrawerMobile = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    function widthChange() {
      if (window.innerWidth > 1024) {
        setIsOpen(false);
      }
    }
    window.addEventListener("resize", widthChange);
    return () => window.removeEventListener("resize", widthChange);
  }, []);
  return (
    <Sheet onOpenChange={setIsOpen} open={isOpen}>
      <SheetTrigger asChild>
        {isOpen ? (
          <XIcon className="size-8 lg:hidden" />
        ) : (
          <Menu className="size-8 lg:hidden" />
        )}
      </SheetTrigger>
      <SheetContent side={"top"} className="top-16 space-y-4 !outline-none">
        <nav>
          <ul className="flex list-none flex-col items-start justify-start space-y-4">
            {NAV_LINKS.map((item) => (
              <li
                key={item.title}
                className={cn(
                  "cursor-pointer px-4 font-medium transition-colors duration-300 hover:text-primary",
                  pathname.includes(item.link) && "text-primary",
                )}
              >
                <Link href={item.link} onClick={() => setIsOpen(false)}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button
            variant="outline"
            className="rounded-full border border-primary px-8 py-6 text-primary duration-500 hover:bg-primary hover:text-white"
          >
            Dashboard <ChevronRight />
          </Button>
          <Select defaultValue={"usa"}>
            <SelectTrigger className="w-24 px-2 text-xs font-medium tracking-wide !outline-none !ring-0 !ring-offset-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="font-medium">
              {REGIONS.map((region) => (
                <SelectItem
                  key={region.value}
                  value={region.value}
                  className="cursor-pointer !text-xs focus:bg-primary focus:text-white"
                >
                  {region.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default HeaderDrawerMobile;

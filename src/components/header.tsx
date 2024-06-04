"use client";

import { cn } from "@/lib/utils";
import { ChevronRight, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const NAV_LINKS = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Business",
    link: "/listings",
  },
  {
    title: "About us",
    link: "/about",
  },
];

const REGIONS = [
  {
    title: "UK",
    value: "uk",
  },
  {
    title: "USA",
    value: "usa",
  },
  {
    title: "Australia",
    value: "aus",
  },
];

const Header = () => {
  const pathname = usePathname();
  return (
    <header className="flex items-center justify-between px-3 py-4 text-base shadow-md lg:px-24">
      <Link href="/">
        <Image
          src="/assets/img/logo.png"
          height={45}
          width={130}
          alt="chautary"
          className="shrink-0 object-contain"
          quality={100}
        />
      </Link>
      <nav className="hidden lg:block">
        <ul className="flex list-none items-center justify-center space-x-4">
          {NAV_LINKS.map((item) => (
            <li
              key={item.title}
              className={cn(
                "cursor-pointer px-4 font-medium transition-colors duration-300 hover:text-primary",
                pathname.includes(item.link) && "text-primary",
              )}
            >
              <Link href={item.link}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="hidden items-center justify-center space-x-4 lg:flex">
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
      <Menu className="size-8 lg:hidden" role="button" />
    </header>
  );
};

export default Header;

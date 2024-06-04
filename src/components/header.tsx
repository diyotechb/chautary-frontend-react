"use client";

import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
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
import HeaderDrawerMobile from "./header-drawer-mobile";
import { useEffect, useState } from "react";

export const NAV_LINKS = [
  {
    title: "Home",
    link: "",
  },
  {
    title: "Business",
    link: "listings",
  },
  {
    title: "About us",
    link: "about",
  },
];

export const REGIONS = [
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
  const [showFloatingHeader, setShowFloatingHeader] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setShowFloatingHeader(true);
      } else {
        setShowFloatingHeader(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <header
      className={cn(
        "flex w-full -translate-y-1 items-center justify-between bg-white px-3 py-4 text-base shadow-md lg:px-24",
        showFloatingHeader &&
          "fixed top-0 z-50 translate-y-0 bg-white !shadow-md duration-300 slide-in-from-top-4",
      )}
    >
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
          className="rounded-full border border-primary px-8 py-6 text-primary !ring-0 duration-500 hover:bg-primary hover:text-white"
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
      <HeaderDrawerMobile />
    </header>
  );
};

export default Header;

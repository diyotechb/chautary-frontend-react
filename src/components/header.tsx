"use client";

import { isActive } from "@/lib/pathname-util";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import HeaderDrawerMobile from "./header-drawer-mobile";
import dynamic from "next/dynamic";

const CountrySelector = dynamic(() => import("./country-selector"), {
  ssr: false,
});

export const NAV_LINKS = [
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
        "z-[100] flex w-full -translate-y-1 items-center justify-between bg-white px-3 py-4 text-base shadow-md duration-300 lg:px-24",
        showFloatingHeader &&
          "fixed top-0 z-[100] translate-y-0 !shadow-md slide-in-from-top-4",
      )}
    >
      <Link href="/">
        <Image
          src="/assets/img/logo.png"
          height={45}
          width={130}
          alt="chautary"
          className="h-full w-full shrink-0 object-contain"
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
                isActive(pathname, item.link) && "text-primary",
              )}
            >
              <Link href={item.link}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="hidden items-center justify-center gap-8 lg:flex">
        {/* hide dashboard button */}
        {/* <Button
          variant="outline"
          className="rounded-full border border-primary px-8 py-6 text-primary !ring-0 duration-500 hover:bg-primary hover:text-white"
        >
          Dashboard <ChevronRight />
        </Button> */}
        <CountrySelector />
      </div>
      <HeaderDrawerMobile />
    </header>
  );
};

export default Header;

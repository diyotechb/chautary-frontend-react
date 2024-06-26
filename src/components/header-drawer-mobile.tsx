"use client";

import { isActive } from "@/lib/pathname-util";
import { cn } from "@/lib/utils";
import { Menu, XIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import CountrySelector from "./country-selector";
import { NAV_LINKS } from "./header";
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
          <ul className="flex list-none flex-col items-start justify-start gap-4">
            {NAV_LINKS.map((item) => (
              <li
                key={item.title}
                className={cn(
                  "cursor-pointer px-4 py-1 font-medium transition-colors duration-300 hover:text-primary",
                  isActive(pathname, item.link) && "text-primary",
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
          {/* <Button
            variant="outline"
            className="rounded-full border border-primary px-8 py-6 text-primary duration-500 hover:bg-primary hover:text-white"
          >
            Dashboard <ChevronRight />
          </Button> */}
          <CountrySelector />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default HeaderDrawerMobile;

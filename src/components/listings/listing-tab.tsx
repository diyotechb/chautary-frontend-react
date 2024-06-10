"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const TABS = [
  {
    key: "overview",
    label: "Overview",
  },
  {
    key: "gallery",
    label: "Gallery",
  },
];
const ListingTab = () => {
  const [currentTab, setCurrentTab] = useState("overview");

  return (
    <div className="mt-2 h-[70px] w-full bg-gray-100">
      <div className="mx-auto h-full w-full max-w-screen-xl space-x-4">
        {TABS.map((tab) => (
          <Button
            key={tab.key}
            variant="ghost"
            className={cn(
              "h-full rounded-none border-b-2 border-transparent !bg-transparent text-sm font-semibold !outline-none hover:border-primary",
              currentTab === tab.key && "border-primary",
            )}
            onClick={() => setCurrentTab(tab.key)}
          >
            {tab.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ListingTab;

"use client";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/storage.utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { BusinessService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { BusinessCountry } from "@/types";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

const CountrySelector = () => {
  const { refresh } = useRouter();
  const [selectedRegion, setSelectedRegion] = useState(
    () => getFromLocalStorage("country") || "USA",
  );

  const { data: countries, isLoading } = useQuery<BusinessCountry[]>({
    queryKey: ["countries"],
    queryFn: async () => {
      return BusinessService.getBusinessCountries().then((res) => res.data);
    },
  });

  const changeCountry = (country: string) => {
    setSelectedRegion(country);
    setToLocalStorage("country", country);
    refresh();
  };
  return (
    <Select
      defaultValue={selectedRegion || "USA"}
      onValueChange={(e) => changeCountry(e)}
    >
      <SelectTrigger
        className="w-36 text-xs font-semibold tracking-wide text-dark/70 !ring-0 !ring-offset-0"
        showChevron={false}
      >
        {isLoading ? (
          <Loader className="size-4 animate-spin text-dark/40" />
        ) : (
          <SelectValue />
        )}
      </SelectTrigger>
      <SelectContent className="z-[110] font-medium" position="item-aligned">
        {countries?.map((country) => (
          <SelectItem
            key={country.name}
            value={country.alpha3Code}
            className="my-1 cursor-pointer !text-xs focus:bg-primary focus:text-white"
          >
            {country.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CountrySelector;

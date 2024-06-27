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
import Image from "next/image";

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
        className="w-44 text-xs font-semibold tracking-wide !ring-0 !ring-offset-0"
        showChevron={false}
      >
        {isLoading ? (
          <Loader className="size-4 animate-spin text-dark/40" />
        ) : (
          <SelectValue />
        )}
      </SelectTrigger>
      <SelectContent className="z-[110] font-medium" position="item-aligned">
        {countries &&
          countries.length > 0 &&
          countries.map((country) => (
            <SelectItem
              key={country.name}
              value={country.alpha3Code}
              className="my-1 !flex cursor-pointer !text-xs focus:bg-primary focus:text-white"
            >
              <div className="flex flex-wrap items-center justify-start gap-2">
                <Image
                  src={`https://chautary-images-dev.s3.amazonaws.com/countries/${country.alpha3Code.toLowerCase()}/flag.png`}
                  alt={country.name}
                  height={20}
                  width={20}
                  className="shrink-0 object-contain"
                />
                <span>{country.name}</span>
              </div>
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

export default CountrySelector;

"use client";

import { BusinessService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { BedIcon, FolderX, Loader, MapPinned } from "lucide-react";
import BusinessCard from "../home/business-card";
import { CategorySort } from "./category-sort";
import { getImageofBusiness } from "@/lib/constants";
import Pagination from "./pagination";

export const BusinessGrid = ({
  categoryId,
  page,
  sortBy,
}: {
  categoryId?: string;
  sortBy?: string;
  page?: number;
}) => {
  const { data: businesses, isLoading } = useQuery({
    queryKey: ["paginatedBusinesses", categoryId, sortBy, page],
    queryFn: async () => {
      return BusinessService.getPaginatedBusinesses(
        page,
        10,
        categoryId,
        sortBy,
      );
    },
  });

  if (isLoading) {
    return (
      <div className="flex w-full items-center justify-center">
        <Loader className="size-6 animate-spin stroke-dark" />
      </div>
    );
  }

  if (businesses?.data && businesses?.data.length === 0) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <FolderX className="size-24 text-muted" />
        <p className="text-center text-sm font-semibold text-dark/80">
          No businesses found
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8">
      <div className="flex flex-col-reverse justify-between gap-4 md:flex-row md:items-center md:gap-0">
        <p className="text-sm font-semibold text-dark">
          We found {businesses?.totalElement} listings available for you.
        </p>
        <CategorySort sortBy={sortBy} />
      </div>
      <ul className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
        {businesses?.data &&
          businesses?.data.length > 0 &&
          businesses.data.map((business) => (
            <li
              key={business.name}
              className="h-full w-full cursor-pointer rounded-md border shadow-brandLight transition-shadow duration-200 ease-linear hover:shadow-brand"
            >
              <BusinessCard
                imageUrl={getImageofBusiness(business.id)}
                name={business.name}
                linkUrl={`/listings/${business.id}`}
                businessDescriptors={[
                  {
                    icon: <BedIcon className="size-4" />,
                    label: `${business.category?.name}`,
                  },
                  {
                    icon: <MapPinned className="size-4" />,
                    label: `${business.address.city}, ${business.address.country}`,
                  },
                ]}
              />
            </li>
          ))}
      </ul>
      {businesses?.totalPages && (
        <div className="flex items-center justify-center pt-4">
          <Pagination totalPages={Number(businesses?.totalPages)} />
        </div>
      )}
    </div>
  );
};

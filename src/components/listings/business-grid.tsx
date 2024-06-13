"use client";

import { BusinessService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { FolderX, Loader } from "lucide-react";
import BusinessCard from "../home/business-card";
import { CategorySort } from "./category-sort";

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
        6,
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
    <div className="w-full space-y-6">
      <div className="flex flex-col-reverse justify-between gap-4 md:flex-row md:items-center md:gap-0">
        <p className="text-sm font-semibold text-dark">
          We found {businesses?.totalElement} listings available for you.
        </p>
        <CategorySort sortBy={sortBy} />
      </div>
      <ul className="grid grid-cols-1 items-start gap-12 md:grid-cols-2">
        {businesses?.data &&
          businesses?.data.length > 0 &&
          businesses.data.map((business) => (
            <li
              key={business.name}
              className="h-full w-full cursor-pointer rounded-md border shadow-md shadow-primary transition-shadow duration-200 ease-linear hover:shadow-lg hover:shadow-primary"
            >
              <BusinessCard
                imageUrl={`https://chautary-images-dev.s3.amazonaws.com/business/${business.id}/bannerimage.jpg`}
                name={business.name}
                linkUrl={`/listings/${business.id}`}
                location={`${business.address.city}, ${business.address.country}`}
                category={business.category?.name}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};

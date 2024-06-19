"use client";

import useGeolocation from "@/hooks/useGeolocation";
import { getImageofBusiness } from "@/lib/constants";
import { BusinessService } from "@/services";
import { type Business } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { BedIcon, MapPinned, Waypoints } from "lucide-react";
import Link from "next/link";
import { Shimmer } from "../shimmers/shimmer";
import BusinessCard from "./business-card";
import CategorySectionWithHeader from "./categories";
import { getFromLocalStorage } from "@/utils/storage.utils";

const Business = () => {
  const country = getFromLocalStorage("country") ?? "USA";
  const { isLocationAllowed, latitude, longitude } = useGeolocation();
  const { data: featuredBusinesses, isLoading: isFetchingFeaturedBusiness } =
    useQuery<Business[]>({
      queryKey: ["featuredBusinesses", country],
      queryFn: () =>
        BusinessService.getFeaturedBusinesses().then((res) => res.data),
      enabled: !isLocationAllowed,
    });
  const { data: nearbyBusinesses, isLoading: isFetchingNearbyBusiness } =
    useQuery<Business[]>({
      queryKey: ["nearbyBusinesses"],
      queryFn: () =>
        BusinessService.getNearbyBusinesses({ latitude, longitude }).then(
          (res) => res.data,
        ),
      enabled: isLocationAllowed,
    });
  return (
    <div>
      {isFetchingFeaturedBusiness || isFetchingNearbyBusiness ? (
        <div className="space-y-8 bg-gray-50 px-4 py-12 duration-500 animate-in animate-out fade-in-0 fade-out-100 slide-in-from-bottom-2 md:py-20">
          <Shimmer className="mx-auto w-full max-w-52" />
          <Shimmer className="mx-auto h-24 w-full max-w-screen-lg" />
          <div className="mx-auto grid max-w-screen-lg gap-8 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <Shimmer
                key={`shimmer_item_${item}`}
                className="aspect-h-1 aspect-w-1 h-full w-full"
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 px-4 py-12 duration-500 animate-in fade-in-0 slide-in-from-bottom-2 md:py-20">
          {isLocationAllowed ? (
            <CategorySectionWithHeader
              title={"Nearby Businesses"}
              description="Discover nearby businesses for all your needs. From coffee shops to services, find everything close by. Support your community and explore local gems today!"
            >
              <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                {nearbyBusinesses && nearbyBusinesses?.length > 0
                  ? nearbyBusinesses.map((business) => (
                      <li
                        key={business.name}
                        className="cursor-pointer rounded-md border shadow-brandLight transition-shadow duration-200 ease-linear hover:shadow-brand"
                      >
                        <BusinessCard
                          imageUrl={getImageofBusiness(business.id)}
                          name={business.name}
                          linkUrl={`/listings/${business.id}`}
                          businessDescriptors={[
                            {
                              icon: <MapPinned className="size-4" />,
                              label: `${business.address.city}, ${business.address.state}`,
                            },
                            {
                              icon: <Waypoints className="size-4" />,
                              label: `${business.distance} miles away`,
                            },
                          ]}
                        />
                      </li>
                    ))
                  : null}
              </ul>
              <Link
                href="/listings"
                className="rounded p-4 text-sm font-semibold ring ring-primary duration-500 hover:bg-primary hover:text-white hover:ring-offset-2"
              >
                More Listings
              </Link>
            </CategorySectionWithHeader>
          ) : (
            <CategorySectionWithHeader
              title={"Featured Businesses"}
              description="Explore the top businesses in your area! From highly recommended eateries to top-rated services, discover what's trending nearby. Whether you're looking for recommendations or staying updated on local favorites, explore our featured businesses today."
            >
              <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                {featuredBusinesses && featuredBusinesses?.length > 0
                  ? featuredBusinesses.map((business) => (
                      <li
                        key={business.name}
                        className="cursor-pointer rounded-md border shadow-[] transition-shadow duration-200 ease-linear"
                      >
                        <BusinessCard
                          imageUrl={getImageofBusiness(business.id)}
                          name={business.name}
                          linkUrl={`/listings/${business.id}`}
                          businessDescriptors={[
                            {
                              icon: <BedIcon className="size-4" />,
                              label: `${business.category.name}`,
                            },
                            {
                              icon: <MapPinned className="size-4" />,
                              label: `${business.address.city},${business.address.country}`,
                            },
                          ]}
                        />
                      </li>
                    ))
                  : null}
              </ul>
              <Link
                href="/listings"
                className="rounded p-4 text-sm font-semibold ring ring-primary duration-500 hover:bg-primary hover:text-white hover:ring-offset-2"
              >
                More Listings
              </Link>
            </CategorySectionWithHeader>
          )}
        </div>
      )}
    </div>
  );
};

export default Business;

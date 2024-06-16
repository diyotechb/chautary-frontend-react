"use client";

import useGeolocation from "@/hooks/useGeolocation";
import { BusinessService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import Link from "next/link";
import CategorySectionWithHeader from "./categories";
import FeaturedBusinessList from "./featured-business-list";

const Business = () => {
  const { isLocationAllowed, latitude, longitude } = useGeolocation();
  const { data: featuredBusinesses } = useQuery({
    queryKey: ["featuredBusinesses"],
    queryFn: () =>
      BusinessService.getFeaturedBusinesses().then((res) => res.data),
    enabled: !isLocationAllowed,
  });
  const { data: nearbyBusinesses, isLoading: isFetchingNearbyBusiness } =
    useQuery({
      queryKey: ["nearbyBusinesses"],
      queryFn: () =>
        BusinessService.getNearbyBusinesses({ latitude, longitude }).then(
          (res) => res.data,
        ),
      enabled: isLocationAllowed,
    });
  return (
    <div>
      <div className="bg-gray-50 px-4 py-12 md:py-20">
        <CategorySectionWithHeader
          title={
            isLocationAllowed ? "Nearby Businesses" : "Featured Businesses"
          }
          description="Explore the top businesses in your area! From highly recommended eateries to top-rated services, discover what's trending nearby. Whether you're looking for recommendations or staying updated on local favorites, explore our featured businesses today."
        >
          {isFetchingNearbyBusiness ? (
            <Loader className="size-10 animate-spin stroke-dark/80" />
          ) : (
            <>
              <FeaturedBusinessList
                featuredBusinesses={
                  isLocationAllowed ? nearbyBusinesses : featuredBusinesses
                }
              />
              <Link
                href="/listings"
                className="rounded p-4 text-sm font-semibold ring ring-primary duration-500 hover:bg-primary hover:text-white hover:ring-offset-2"
              >
                More Listings
              </Link>
            </>
          )}
        </CategorySectionWithHeader>
      </div>
    </div>
  );
};

export default Business;

"use client";

import useGeolocation from "@/hooks/useGeolocation";
import { getImageofBusiness } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { BusinessService } from "@/services";
import { type Business } from "@/types";
import { useQuery } from "@tanstack/react-query";
import {
  GlobeIcon,
  LucideLoader,
  MapPin,
  MapPinned,
  PhoneCall,
  Waypoints,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import BusinessCard from "../home/business-card";
import { Button } from "../ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import ListingTitleContent from "./listing-title-content";

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
const ListingTab = ({ businessId }: { businessId: string }) => {
  const [currentTab, setCurrentTab] = useState("overview");
  const { isLocationAllowed, latitude, longitude } = useGeolocation();

  const { data: business } = useQuery<Business>({
    queryKey: ["business", businessId],
    queryFn: async () => {
      return BusinessService.getBusinessByID(businessId).then(
        (res) => res.data,
      );
    },
  });

  const { data: nearbyBusinesses, isLoading: isFetchingNearbyBusiness } =
    useQuery<Business[]>({
      queryKey: ["nearbyBusinesses"],
      queryFn: () =>
        BusinessService.getNearbyBusinesses({
          latitude,
          longitude,
          count: 8,
        }).then((res) => res.data),
      enabled: isLocationAllowed,
    });

  return (
    <div className="flex flex-col items-center gap-12">
      <div className="h-[70px] w-full bg-gray-100">
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
      <section className="mx-auto flex w-full max-w-screen-xl flex-wrap gap-12 px-4">
        <div className="flex w-full flex-col gap-12 xl:w-2/3">
          <ListingTitleContent title="Details">
            <p className="text-sm font-medium text-dark/70 text-gray-800">
              {business?.description}
            </p>
          </ListingTitleContent>
          <ListingTitleContent title="Gallery">
            <Carousel
              opts={{
                slidesToScroll: 2,
              }}
            >
              <CarouselContent>
                {[1, 2, 3, 4, 5].map((i) => (
                  <CarouselItem
                    key={`business_${businessId}_gallery_${i}`}
                    className="basis-full sm:basis-1/2"
                  >
                    <Image
                      alt=""
                      src={`https://chautary-images-dev.s3.amazonaws.com/business/${businessId}/gallery/gallery${i}.jpg`}
                      height={255}
                      width={400}
                      className="w-full rounded object-cover"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="translate-x-20 !text-primary shadow-brandLight hover:shadow-brand" />
              <CarouselNext className="-translate-x-24 !text-primary shadow-brandLight hover:shadow-brand" />
            </Carousel>
          </ListingTitleContent>
          {isLocationAllowed && (
            <ListingTitleContent title="Other Nearby Business">
              {isFetchingNearbyBusiness ? (
                <LucideLoader className="mx-auto size-8 animate-spin text-primary" />
              ) : (
                <div className="inline-flex w-full flex-col">
                  {nearbyBusinesses && nearbyBusinesses?.length > 0 ? (
                    <Carousel
                      opts={{
                        slidesToScroll: 2,
                      }}
                    >
                      <CarouselContent className="my-4 mr-4">
                        {nearbyBusinesses.map((business) => (
                          <CarouselItem
                            key={`{business.name}_${business.id}`}
                            className="ml-4 basis-full cursor-pointer rounded-md border shadow-brandLight transition-shadow duration-200 ease-linear hover:shadow-brand sm:basis-1/2"
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
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="translate-x-20 !text-primary shadow-brandLight hover:shadow-brand" />
                      <CarouselNext className="-translate-x-24 !text-primary shadow-brandLight hover:shadow-brand" />
                    </Carousel>
                  ) : null}
                  <Link
                    href="/listings"
                    className="mx-auto mt-2 max-w-fit rounded p-2 text-sm font-semibold ring ring-primary duration-500 hover:bg-primary hover:text-white hover:ring-offset-2"
                  >
                    Show more
                  </Link>
                </div>
              )}
            </ListingTitleContent>
          )}
        </div>
        <article className="flex h-full min-w-full flex-col divide-y divide-gray-200 rounded-md border bg-gray-50 p-6 md:min-w-72">
          <h4 className="pb-5 text-xl font-semibold">Contact Details</h4>
          <div className="flex items-center space-x-4 py-4 text-sm">
            <GlobeIcon className="size-5 text-neutral-500" />
            {business?.website && (
              <a
                target="_blank"
                href={business.website}
                className="text-xs font-semibold text-primary hover:underline"
              >
                {business.website}
              </a>
            )}
          </div>
          <div className="flex items-center space-x-4 py-4 text-sm">
            <PhoneCall className="size-5 text-neutral-500" />
            <p className="text-xs font-semibold">{business?.phone}</p>
          </div>
          <div className="flex items-center space-x-4 py-4 text-sm">
            <Waypoints className="size-5 text-neutral-500" />
            {business?.website && (
              <a
                target="_blank"
                href={business.website}
                className="text-xs font-semibold text-primary hover:underline"
              >
                Get Directions
              </a>
            )}
          </div>
          <div className="flex items-center space-x-4 py-4 text-sm">
            <MapPin className="size-5 text-neutral-500" />
            <p className="text-xs font-semibold">
              {(business?.address.state, business?.address.country)}
            </p>
          </div>
        </article>
      </section>
    </div>
  );
};

export default ListingTab;

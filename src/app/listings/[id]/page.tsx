import ListingTab from "@/components/listings/listing-tab";
import { BusinessService } from "@/services";
import { type Address, type Business } from "@/types";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { BedIcon, MapPin, PhoneCall } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const ListingPage = async ({
  params,
}: {
  params: {
    id: number;
  };
}) => {
  const queryClient = new QueryClient();
  const businessId = params?.id ? params.id.toString() : 0;
  if (!businessId) redirect("/listings");

  await queryClient.prefetchQuery({
    queryKey: ["business", businessId],
    queryFn: async () => {
      return BusinessService.getBusinessByID(businessId).then(
        (res) => res.data,
      );
    },
  });

  const business: Business | undefined = queryClient.getQueryData([
    "business",
    businessId,
  ]);

  const formatAddress = (address: Address) => {
    const { streetAddress, city, state, country } = address;

    const addressParts = [streetAddress, city, state, country];

    const filteredAddressParts = addressParts.filter((part) => part);

    return filteredAddressParts.join(", ");
  };

  return (
    <div className="flex w-full flex-col items-center">
      <section className="relative h-[500px] w-full">
        <Image
          src={`https://chautary-images-dev.s3.amazonaws.com/business/${businessId}/coverimage.jpg`}
          alt=""
          fill
          priority
          className="pointer-events-none object-fill"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute bottom-36 space-y-4 px-6 sm:bottom-12 lg:left-1/4">
          <span className="flex items-center gap-2 uppercase">
            <BedIcon className="size-8 rounded-full bg-white stroke-primary p-1" />
            <span className="text-sm font-semibold text-primary">
              {business?.category?.name}
            </span>
          </span>
          <h2 className="text-[35px] font-bold text-white">{business?.name}</h2>
          <div className="flex flex-wrap items-center gap-6">
            {business?.phone && (
              <Link
                href={business.phone}
                className="flex max-w-fit items-center justify-center gap-3 rounded-full bg-primary p-6 font-semibold text-white"
              >
                <PhoneCall />
                {business.phone}
              </Link>
            )}
            <div className="flex items-center gap-2">
              <MapPin className="size-12 text-gray-300" />
              <span className="space-y-1">
                <p className="font-semibold text-white">Location</p>
                <address className="text-sm font-semibold not-italic text-primary">
                  {business?.address && formatAddress(business.address)}
                </address>
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ListingTab businessId={businessId} />
        </HydrationBoundary>
      </section>
    </div>
  );
};

export default ListingPage;

import { featuredBusiness } from "@/lib/featured-business";
import { HeartIcon, MapIcon, MapPin, MapPinned } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const FeaturedBusinessList = () => {
  return (
    <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
      {featuredBusiness.slice(0, 15).map((listing) => (
        <li
          key={listing.name}
          className="w-96 cursor-pointer rounded-md border shadow-md shadow-primary transition-shadow duration-200 ease-linear hover:shadow-lg hover:shadow-primary"
        >
          <Link
            href={`/listings/${listing.id}`}
            className="flex h-full w-full flex-col items-start justify-center"
          >
            <div className="relative size-full">
              <Image
                src={listing.imgUrl}
                alt={listing.name}
                height={252}
                width={382}
                className="object-cover"
              />
              <div className="absolute right-6 top-6 flex size-8 items-center justify-center rounded-full bg-black/50 duration-300 hover:bg-primary">
                <HeartIcon className="size-4 text-white" />
              </div>
            </div>
            <div className="flex flex-col gap-2 p-6">
              <span className="flex items-center gap-2">
                <MapPinned className="size-4" />
                <span className="text-xs font-semibold text-muted-foreground">
                  {listing.location}
                </span>
              </span>
              <p className="line-clamp-2 overflow-hidden text-ellipsis text-wrap text-start text-base font-semibold leading-relaxed">
                {listing.name}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default FeaturedBusinessList;

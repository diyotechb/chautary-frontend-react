import ListingTab from "@/components/listings/listing-tab";
import { BedIcon, MapPin, PhoneCall } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ListingPage = () => {
  return (
    <div className="flex w-full flex-col items-center">
      <section className="relative h-[500px] w-full">
        <Image
          src="https://chautary-images-dev.s3.amazonaws.com/business/2/coverimage.jpg"
          alt=""
          fill
          className="pointer-events-none object-fill"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute bottom-12 left-1/4 space-y-4">
          <span className="flex items-center gap-2 uppercase">
            <BedIcon className="size-8 rounded-full bg-white stroke-primary p-1" />
            <span className="text-sm font-semibold text-primary">
              Restaurants
            </span>
          </span>
          <h2 className="text-[35px] font-bold text-white">
            Royal Nepal Bistro
          </h2>
          <div className="flex items-center gap-6">
            <Link
              href="tel:+1-157-140-7725"
              className="flex max-w-fit items-center justify-center gap-3 rounded-full bg-primary p-6 font-semibold text-white"
            >
              <PhoneCall />
              +1-157-140-7725
            </Link>
            <div className="flex items-center gap-2">
              <MapPin className="size-12 text-gray-300" />
              <span className="space-y-1">
                <p className="font-semibold text-white">Location</p>
                <address className="text-sm font-semibold not-italic text-primary">
                  1234, 5th Ave, New York, NY 10029
                </address>
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="h-[70px] w-full bg-gray-100">
        <ListingTab />
      </section>
    </div>
  );
};

export default ListingPage;

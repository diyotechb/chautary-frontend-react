import { LISTINGS } from "@/lib/listings";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CategoryList = () => {
  return (
    <ul className="grid w-full grid-cols-1 gap-8 sm:w-fit sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      {LISTINGS.slice(0, 11).map((listing) => (
        <li
          key={listing.id}
          className="h-40 w-full cursor-pointer rounded-md border px-8 shadow-md shadow-primary transition-shadow duration-200 ease-linear hover:shadow-lg hover:shadow-primary sm:w-48"
        >
          <Link
            href={`/listings/${listing.id}`}
            className="flex h-full w-full flex-col items-center justify-center gap-4"
          >
            <Image
              src={listing.imageUrl}
              alt={listing.name}
              height={55}
              width={55}
              className="rounded-full"
            />
            <p className="max-w-36 overflow-hidden text-ellipsis text-nowrap text-start text-base font-semibold leading-relaxed">
              {listing.name}
            </p>
          </Link>
        </li>
      ))}
      <li className="h-40 w-full cursor-pointer rounded-md bg-primary px-8 text-white shadow-md shadow-primary transition-shadow duration-200 ease-linear hover:shadow-lg hover:shadow-primary sm:w-48">
        <Link
          href={"/listings"}
          className="flex h-full w-full flex-col items-center justify-center gap-4"
        >
          <PlusCircle className="size-12" />
          <p className="max-w-36 overflow-hidden text-ellipsis text-nowrap text-start text-base font-semibold leading-relaxed">
            More Categories
          </p>
        </Link>
      </li>
    </ul>
  );
};

export default CategoryList;

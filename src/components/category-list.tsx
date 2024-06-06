import { LISTINGS } from "@/lib/listings";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CategoryList = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <h2 className="text-2xl font-bold">Browse Businesses by Category</h2>
      <p className="text-sm font-medium text-muted-foreground">
        Discover a variety of businesses sorted by category for your
        convenience. Find everything from restaurants for special occasions to
        reliable home services. Our directory makes it easy to find what you
        need. Start exploring today!
      </p>
      <ul className="flex flex-wrap gap-8">
        <>
          {LISTINGS.slice(0, 11).map((listing) => (
            <li
              key={listing.id}
              className="size-40 cursor-pointer rounded-md border px-8 shadow-md shadow-primary transition-shadow duration-200 ease-linear hover:shadow-lg hover:shadow-primary"
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
          <li className="size-40 cursor-pointer rounded-md bg-primary px-8 text-white shadow-md shadow-primary transition-shadow duration-200 ease-linear hover:shadow-lg hover:shadow-primary">
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
        </>
      </ul>
    </div>
  );
};

export default CategoryList;

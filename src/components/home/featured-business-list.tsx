import { featuredBusiness } from "@/lib/featured-business";
import BusinessCard from "./business-card";

const FeaturedBusinessList = () => {
  return (
    <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
      {featuredBusiness.slice(0, 15).map((listing) => (
        <li
          key={listing.name}
          className="w-96 cursor-pointer rounded-md border shadow-md shadow-primary transition-shadow duration-200 ease-linear hover:shadow-lg hover:shadow-primary"
        >
          <BusinessCard
            imageUrl={listing.imgUrl}
            name={listing.name}
            linkUrl={`/listings/${listing.id}`}
            location={listing.location}
            isFeatured
          />
        </li>
      ))}
    </ul>
  );
};

export default FeaturedBusinessList;

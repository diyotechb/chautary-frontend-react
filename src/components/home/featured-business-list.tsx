import { featuredBusiness } from "@/lib/featured-business";
import BusinessCard from "./business-card";
import { Business } from "@/types";

const FeaturedBusinessList = ({
  featuredBusinesses,
}: {
  featuredBusinesses: Business[];
}) => {
  return (
    <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
      {featuredBusinesses.map((business) => (
        <li
          key={business.name}
          className="w-96 cursor-pointer rounded-md border shadow-md shadow-primary transition-shadow duration-200 ease-linear hover:shadow-lg hover:shadow-primary"
        >
          <BusinessCard
            imageUrl={business.coverImage}
            name={business.name}
            linkUrl={`/listings/${business.id}`}
            location={`${business.address.city},${business.address.country}`}
            isFeatured
            category={business.category.name}
          />
        </li>
      ))}
    </ul>
  );
};

export default FeaturedBusinessList;

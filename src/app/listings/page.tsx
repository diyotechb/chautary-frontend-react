import BusinessCard from "@/components/home/business-card";
import CategoryFilter from "@/components/listings/category-filter";
import { CategorySort } from "@/components/listings/category-sort";
import Search from "@/components/search";
import { featuredBusiness } from "@/lib/featured-business";

const ListingsPage = ({
  searchParams,
}: {
  searchParams: {
    categoryId?: string;
    sortBy?: string;
  };
}) => {
  return (
    <div className="flex flex-col gap-8">
      <section className="bg-gray-50 px-4 py-20">
        <div className="mx-auto max-w-screen-lg space-y-8">
          <h1 className="text-center text-3xl font-bold">
            Find Popular Businesses
          </h1>
          <Search />
        </div>
      </section>
      <section className="mx-auto flex w-full max-w-screen-xl justify-between gap-8">
        <div className="w-full max-w-[280px]">
          <CategoryFilter categoryId={searchParams.categoryId} />
        </div>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p>We found 234 listings available for you.</p>
            <CategorySort sortBy={searchParams.sortBy} />
          </div>
          <ul className="grid grid-cols-1 items-start gap-12 md:grid-cols-2">
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
                  category={listing.location}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default ListingsPage;

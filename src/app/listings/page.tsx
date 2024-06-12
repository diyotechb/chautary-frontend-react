import BusinessCard from "@/components/home/business-card";
import CategoryFilter from "@/components/listings/category-filter";
import { CategorySort } from "@/components/listings/category-sort";
import Search from "@/components/search";
import { BusinessService, CategoriesService } from "@/services";
import { type IPaginatedBusiness, type Category } from "@/types";
import { QueryClient } from "@tanstack/react-query";

const ListingsPage = async ({
  searchParams,
}: {
  searchParams: {
    categoryId?: string;
    sortBy?: string;
    page?: number;
  };
}) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      return CategoriesService.getAllCategories().then((res) => res.data);
    },
  });

  const categories: Category[] | undefined = queryClient.getQueryData([
    "categories",
  ]);

  await queryClient.prefetchQuery({
    queryKey: [
      "paginatedBusinesses",
      searchParams.categoryId,
      searchParams.sortBy,
      searchParams.page,
    ],
    queryFn: () => {
      return BusinessService.getPaginatedBusinesses(
        searchParams.page,
        6,
        searchParams.categoryId,
        searchParams.sortBy,
      );
    },
  });

  const businesses: IPaginatedBusiness | undefined = queryClient.getQueryData([
    "paginatedBusinesses",
    searchParams.categoryId,
    searchParams.sortBy,
    searchParams.page,
  ]);

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
      <section className="mx-auto flex w-full max-w-screen-xl flex-col justify-between gap-8 px-8 sm:flex-row">
        <div className="w-full md:max-w-[280px]">
          <CategoryFilter
            categoryId={searchParams.categoryId}
            categories={categories}
          />
        </div>
        <div className="w-full space-y-6">
          <div className="flex flex-col-reverse justify-between gap-4 md:flex-row md:items-center md:gap-0">
            <p className="text-sm font-semibold text-dark">
              We found {businesses?.totalElement} listings available for you.
            </p>
            <CategorySort sortBy={searchParams.sortBy} />
          </div>
          <ul className="grid grid-cols-1 items-start gap-12 md:grid-cols-2">
            {businesses?.data &&
              businesses?.data.length > 0 &&
              businesses.data.map((business) => (
                <li
                  key={business.name}
                  className="h-full w-full cursor-pointer rounded-md border shadow-md shadow-primary transition-shadow duration-200 ease-linear hover:shadow-lg hover:shadow-primary"
                >
                  <BusinessCard
                    imageUrl={business.coverImage}
                    name={business.name}
                    linkUrl={`/listings/${business.id}`}
                    location={`${business.address.city}, ${business.address.country}`}
                    category={business.category?.name}
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

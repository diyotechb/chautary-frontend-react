import { BusinessGrid } from "@/components/listings/business-grid";
import CategoryFilter from "@/components/listings/category-filter";
import Search from "@/components/search";
import { BusinessService, CategoriesService } from "@/services";
import { type Category } from "@/types";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

const ListingsPage = async ({
  searchParams,
}: {
  searchParams: {
    categoryId?: string;
    sortBy?: string;
    page?: number;
    searchKeyword?: string;
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
      searchParams.searchKeyword,
      "USA",
    ],
    queryFn: () => {
      return BusinessService.getPaginatedBusinesses(
        searchParams.searchKeyword,
        searchParams.page,
        6,
        searchParams.categoryId,
        searchParams.sortBy,
      );
    },
  });

  return (
    <div className="flex flex-col gap-8">
      <section className="bg-gray-50 px-4 py-20">
        <div className="mx-auto max-w-screen-lg space-y-8">
          <h1 className="text-center text-3xl font-bold">
            Find Popular Businesses
          </h1>
          <Search
            categoryId={searchParams?.categoryId}
            searchKeyword={searchParams?.searchKeyword}
            categories={categories}
          />
        </div>
      </section>
      <section className="mx-auto flex w-full max-w-screen-xl flex-col justify-between gap-8 px-8 md:flex-row">
        <div className="w-full md:max-w-[280px]">
          <CategoryFilter
            categoryId={searchParams.categoryId}
            categories={categories}
          />
        </div>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <BusinessGrid
            categoryId={searchParams.categoryId}
            page={searchParams.page}
            sortBy={searchParams.sortBy}
            searchKeyword={searchParams.searchKeyword}
          />
        </HydrationBoundary>
      </section>
    </div>
  );
};

export default ListingsPage;

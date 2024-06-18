import Business from "@/components/home/business";
import CategorySectionWithHeader from "@/components/home/categories";
import CategoryList from "@/components/home/category-list";
import { HowItWorks } from "@/components/home/how-it-works";
import Search from "@/components/search";
import { TypeWriterComponent } from "@/components/type-writer";
import { BusinessService, CategoriesService } from "@/services";
import type { Category } from "@/types";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import Image from "next/image";

export default async function Home() {
  const queryClient = new QueryClient();

  await Promise.allSettled([
    queryClient.prefetchQuery({
      queryKey: ["categories"],
      queryFn: async () => {
        return CategoriesService.getAllCategories().then((res) => res.data);
      },
    }),
    queryClient.prefetchQuery({
      queryKey: ["featuredBusinesses"],
      queryFn: async () => {
        return BusinessService.getFeaturedBusinesses().then((res) => res.data);
      },
    }),
  ]);

  const categories: Category[] | undefined = queryClient.getQueryData([
    "categories",
  ]);

  return (
    <main className="flex w-full flex-col gap-12 md:gap-20">
      <div className="relative flex h-[90vh]">
        <Image
          src="/assets/img/main-banner-bg.jpg"
          alt=""
          fill
          className="pointer-events-none -z-10 -mt-2 min-h-full w-full select-none object-cover object-left"
          draggable={false}
          priority
        />
        <section className="mx-auto mt-32 flex w-full flex-col gap-8 px-2 sm:mx-20 lg:w-2/3 xl:ml-40 xl:mt-52 xl:w-1/2">
          <div className="w-full">
            <div className="flex space-x-2 text-wrap text-start text-3xl font-bold leading-relaxed sm:text-4xl xl:text-[50px]">
              <span>Find</span>
              <span className="!break-words text-primary">
                <TypeWriterComponent />
              </span>
            </div>
            <p className="mt-2 text-start text-base text-[#666] sm:mt-4 sm:text-lg">
              Explore your favorites effortlessly! Find businesses for every
              occasion, right here, right now.
            </p>
          </div>
          <Search categories={categories} currentPathname="/" />
        </section>
      </div>
      {categories && (
        <div className="w-full px-4">
          <CategorySectionWithHeader
            title="Browse Businesses by Category"
            description="Discover a variety of businesses sorted by category for your
        convenience. Find everything from restaurants for special occasions to
        reliable home services. Our directory makes it easy to find what you
        need. Start exploring today!"
          >
            <CategoryList categories={categories} />
          </CategorySectionWithHeader>
        </div>
      )}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Business />
      </HydrationBoundary>
      <div className="px-4">
        <CategorySectionWithHeader
          title="How It Works"
          description="Explore our simple three-step process to discover and reserve the perfect places for your next adventure."
        >
          <HowItWorks />
        </CategorySectionWithHeader>
      </div>
    </main>
  );
}

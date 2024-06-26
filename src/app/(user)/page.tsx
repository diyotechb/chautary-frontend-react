import BannerCarousel from "@/components/home/banner-carousel";
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
import dynamic from "next/dynamic";
import { Suspense } from "react";

const Business = dynamic(() => import("@/components/home/business"), {
  ssr: false,
});
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
      <div className="relative flex flex-col">
        <BannerCarousel />
        <section className="top-14 mx-auto mt-2 flex w-full flex-col gap-8 px-2 lg:absolute lg:mx-20 lg:max-w-[900px] xl:top-36 xl:ml-40">
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
          <Suspense>
            <Search categories={categories} currentPathname="/" />
          </Suspense>
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

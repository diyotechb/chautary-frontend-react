import CategorySectionWithHeader from "@/components/home/categories";
import CategoryList from "@/components/home/category-list";
import FeaturedBusinessList from "@/components/home/featured-business-list";
import { HowItWorks } from "@/components/home/how-it-works";
import Search from "@/components/search";
import { TypeWriterComponent } from "@/components/type-writer";
import { Button } from "@/components/ui/button";
import { CategoriesService } from "@/services";
import { Category } from "@/types";
import { QueryClient } from "@tanstack/react-query";
import Image from "next/image";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["categories"],
    queryFn: () => {
      return CategoriesService.getAllCategories();
    },
  });

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
        <section className="ml-40 mt-52 flex w-1/2 flex-col gap-8">
          <div className="w-full">
            <h3 className="flex space-x-2 text-wrap text-start text-[50px] font-bold leading-relaxed">
              <span>Find</span>
              <span className="text-primary">
                <TypeWriterComponent />
              </span>
            </h3>
            <p className="text-start text-lg text-[#666]">
              Explore your favorites effortlessly! Find businesses for every
              occasion, right here, right now.
            </p>
          </div>
          <Search />
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
      <div className="bg-gray-50 px-4 py-12 md:py-20">
        <CategorySectionWithHeader
          title="Featured Businesses"
          description="Explore the top businesses in your area! From highly recommended eateries to top-rated services, discover what's trending nearby. Whether you're looking for recommendations or staying updated on local favorites, explore our featured businesses today."
        >
          <FeaturedBusinessList />
          <Button className="px-8 py-6 font-semibold duration-500 hover:shadow-sm hover:shadow-primary">
            More Listings
          </Button>
        </CategorySectionWithHeader>
      </div>
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

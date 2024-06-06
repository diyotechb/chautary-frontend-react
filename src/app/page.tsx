import CategoryList from "@/components/category-list";
import Search from "@/components/search";
import { TypeWriterComponent } from "@/components/type-writer";
import Image from "next/image";
export default function Home() {
  return (
    <main className="flex w-full flex-col gap-20">
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
      <div className="mx-auto w-full max-w-screen-xl px-8">
        <CategoryList />
      </div>
    </main>
  );
}

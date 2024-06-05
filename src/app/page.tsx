import Search from "@/components/search";
import { TypeWriterComponent } from "@/components/type-writer";
import Image from "next/image";
export default function Home() {
  return (
    <main className="relative flex h-[90vh] w-full">
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
          <h3 className="flex space-x-2 text-[50px] font-bold leading-relaxed">
            <span>Find</span>
            <span className="text-primary">
              <TypeWriterComponent />
            </span>
          </h3>
          <p className="-ml-4 text-center text-lg text-[#666]">
            Explore your favorites effortlessly! Find businesses for every
            occasion, right here, right now.
          </p>
        </div>
        <Search />
      </section>
    </main>
  );
}

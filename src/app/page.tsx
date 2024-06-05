import Search from "@/components/search";
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
      <section className="w-1/2">
        <h3>Find IT Consulting</h3>
        <p>
          Explore your favorites effortlessly! Find businesses for every
          occasion, right here, right now.
        </p>
        <Search />
      </section>
    </main>
  );
}

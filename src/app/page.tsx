import Image from "next/image";

export default function Home() {
  return (
    <main className="relative flex h-[90vh] w-full items-center justify-start">
      <Image
        src="/assets/img/main-banner-bg.jpg"
        alt=""
        fill
        className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
        sizes="100vw"
        draggable={false}
      />
      <search className="px-48">
        <h3 className="text-4xl font-bold leading-10 tracking-wide">
          Explore your favorites effortlessly!
        </h3>
      </search>
    </main>
  );
}

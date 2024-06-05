import Image from "next/image";

export default function Home() {
  return (
    <main className="flex h-[90vh] w-full items-center justify-start">
      <Image
        src="/assets/img/main-banner-bg.jpg"
        alt=""
        height={1080}
        width={1920}
        className="-mt-2 min-h-full w-full object-cover object-left"
        draggable={false}
        priority
      />
    </main>
  );
}

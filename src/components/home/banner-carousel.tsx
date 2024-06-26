"use client";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

const BannerCarousel = () => {
  return (
    <Carousel>
      <CarouselContent>
        <CarouselItem>
          <Image
            src="/assets/img/main-banner-bg.jpg"
            alt=""
            sizes="100vw"
            height={850}
            width={1920}
            className="h-full w-full"
            draggable={false}
            priority
          />
        </CarouselItem>
        <CarouselItem>
          <Image
            src="/assets/img/main-banner-bg.jpg"
            alt=""
            sizes="100vw"
            height={850}
            width={1920}
            className="h-full w-full"
            draggable={false}
            priority
          />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious className="left-8 shadow-brandLight hover:shadow-brandLight lg:size-12" />
      <CarouselNext className="right-8 shadow-brandLight hover:shadow-brandLight lg:size-12" />
    </Carousel>
  );
};

export default BannerCarousel;

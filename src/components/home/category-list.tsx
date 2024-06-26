import { type Category } from "@/types";
import { GalleryVerticalEnd, PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CategoryList = ({ categories }: { categories: Category[] }) => {
  return (
    <ul className="grid w-full grid-cols-1 gap-8 sm:w-fit sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      {categories.slice(0, 11).map((category) => (
        <li
          key={category.id}
          className="group h-40 w-full cursor-pointer rounded-md border px-8 shadow-brandLight transition-shadow duration-200 ease-linear hover:shadow-brand sm:w-48"
        >
          <Link
            href={`/business?categoryId=${category.id}`}
            className="flex h-full w-full flex-col items-center justify-center gap-4"
          >
            {category?.imageUrl ? (
              <Image
                src={category?.imageUrl}
                alt={category.name}
                height={55}
                width={55}
                className="rounded-full"
              />
            ) : (
              <GalleryVerticalEnd className="size-10 stroke-gray-300 duration-500 group-hover:animate-bounce-back group-hover:stroke-primary" />
            )}

            <p className="max-w-36 overflow-hidden text-ellipsis text-nowrap text-start text-base font-semibold leading-relaxed">
              {category.name}
            </p>
          </Link>
        </li>
      ))}
      <li className="h-40 w-full cursor-pointer rounded-md bg-primary px-8 text-white shadow-brandLight transition-shadow duration-200 ease-linear hover:shadow-brand sm:w-48">
        <Link
          href={"/business"}
          className="flex h-full w-full flex-col items-center justify-center gap-4"
        >
          <PlusCircle className="size-12" />
          <p className="max-w-36 overflow-hidden text-ellipsis text-nowrap text-start text-base font-semibold leading-relaxed">
            More Categories
          </p>
        </Link>
      </li>
    </ul>
  );
};

export default CategoryList;

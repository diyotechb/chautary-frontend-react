import { BedIcon, HeartIcon, ImageIcon, MapPinned } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BusinessCardProps {
  imageUrl: string | null;
  name: string;
  category?: string;
  location?: string;
  isFeatured?: boolean;
  linkUrl: string;
}

const BusinessCard = ({
  name,
  category,
  imageUrl,
  isFeatured,
  location,
  linkUrl,
}: BusinessCardProps) => {
  return (
    <Link href={linkUrl} className="flex flex-col items-start justify-center">
      <div className="relative size-full">
        <div className="aspect-h-9 aspect-w-16 relative overflow-hidden">
          {imageUrl ? (
            <Image
              src={
                "https://via.placeholder.com/380x252?text=The+Gourmet+Kitchen"
              }
              alt={name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center bg-muted">
              <ImageIcon className="size-16 stroke-gray-200" />
            </div>
          )}
        </div>
        {isFeatured && (
          <div className="absolute right-6 top-6 flex size-8 items-center justify-center rounded-full bg-black/50 duration-300 hover:bg-primary">
            <HeartIcon className="size-4 text-white" />
          </div>
        )}
      </div>
      <div className="flex w-full flex-col gap-6 p-6">
        <div className="flex items-center gap-4">
          {category && (
            <span className="group flex items-center gap-2">
              <div className="rounded-full bg-gray-100 p-2 text-primary duration-500 group-hover:bg-primary group-hover:text-white">
                <BedIcon className="size-4" />
              </div>
              <span className="text-xs font-semibold text-muted-foreground">
                {category}
              </span>
            </span>
          )}
          <span className="group flex items-center gap-2">
            <div className="rounded-full bg-gray-100 p-2 text-primary duration-500 group-hover:bg-primary group-hover:text-white">
              <MapPinned className="size-4" />
            </div>
            <p className="text-ellipsis text-xs font-semibold text-muted-foreground">
              {location}
            </p>
          </span>
        </div>
        <abbr
          className="line-clamp-2 w-full text-start text-base font-bold leading-relaxed no-underline"
          title={name}
        >
          {name}
        </abbr>
      </div>
    </Link>
  );
};

export default BusinessCard;

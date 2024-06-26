import { cn } from "@/lib/utils";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface businessDescriptor {
  icon?: React.ReactNode;
  label?: string;
}

interface BusinessCardProps {
  imageUrl: string | null;
  name: string;
  linkUrl: string;
  businessDescriptors?: businessDescriptor[];
}

const BusinessCard = ({
  name,
  imageUrl,
  linkUrl,
  businessDescriptors,
}: BusinessCardProps) => {
  const [imageError, setImageError] = useState(false);
  return (
    <Link
      href={linkUrl}
      className="flex flex-col items-start justify-center"
      prefetch={false}
    >
      <div className="relative size-full">
        <div className="aspect-h-9 aspect-w-16 relative overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageError ? "/assets/img/placeholder-image.png" : imageUrl}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={cn(
                "object-cover",
                imageError &&
                  "pointer-events-none scale-50 object-contain opacity-30 grayscale",
              )}
              onError={() => {
                setImageError(true);
              }}
            />
          ) : (
            <div className="flex items-center justify-center bg-muted">
              <ImageIcon className="size-16 stroke-gray-200" />
            </div>
          )}
        </div>
        {/* uncomment this to show favourite icon */}
        {/* <div className="absolute right-6 top-6 flex size-8 items-center justify-center rounded-full bg-black/50 duration-300 hover:bg-primary">
          <HeartIcon className="size-4 text-white" />
        </div> */}
      </div>
      <div className="flex w-full flex-col gap-6 p-6">
        <div className="flex flex-nowrap items-center gap-3">
          {businessDescriptors && businessDescriptors?.length > 0
            ? businessDescriptors.map(({ icon, label }, index) => (
                <span key={index} className="group flex items-center gap-1">
                  <div className="rounded-full bg-gray-100 p-2 text-primary duration-500 group-hover:bg-primary group-hover:text-white">
                    {icon}
                  </div>
                  <span className="text-ellipsis text-xs font-semibold text-muted-foreground">
                    {label}
                  </span>
                </span>
              ))
            : null}
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

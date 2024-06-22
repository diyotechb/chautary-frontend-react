import { cn } from "@/lib/utils";

export const Shimmer = ({ className = "" }: { className?: string }) => {
  return (
    <span
      className={cn(
        "block h-10 w-full animate-pulse rounded-md bg-neutral-200 duration-1000",
        className,
      )}
    />
  );
};

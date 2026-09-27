import { cn } from "@/lib/utils";

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: "default" | "wide" | "narrow";
};

export function Container({ className, size = "default", ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8 lg:px-12",
        size === "default" && "max-w-[1240px]",
        size === "wide" && "max-w-[1440px]",
        size === "narrow" && "max-w-[880px]",
        className,
      )}
      {...props}
    />
  );
}

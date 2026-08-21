import Image from "next/image";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * The official badge. It is only ever resized — never recoloured, cropped or
 * redrawn — and always keeps its 1:1 ratio.
 */
export function Logo({
  size = 64,
  alt,
  className,
  priority = false,
}: {
  size?: number;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={siteConfig.logo.src}
      alt={alt}
      width={siteConfig.logo.width}
      height={siteConfig.logo.height}
      priority={priority}
      sizes={`${size}px`}
      className={cn("h-auto w-auto select-none", className)}
      style={{ width: size, height: size }}
      draggable={false}
    />
  );
}

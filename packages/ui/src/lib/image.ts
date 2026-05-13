import type { StaticImageData } from "next/image";

/**
 * Normalizes an image or SVG import from Next.js (which defaults to `any` for SVGs)
 * into a strict, safe URL string.
 *
 * @param imageSrc The imported image/SVG asset
 * @returns The resolved URL string
 */
export function getImageUrl(imageSrc: string | StaticImageData | any): string {
  if (typeof imageSrc === "string") {
    return imageSrc;
  }
  if (imageSrc && typeof imageSrc === "object" && "src" in imageSrc) {
    return (imageSrc as StaticImageData).src;
  }
  return "";
}

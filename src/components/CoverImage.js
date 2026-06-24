import Image from "next/image";

export default function CoverImage({ src, alt, objectPosition, sizes, priority, quality }) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes || "100vw"}
      priority={priority}
      quality={quality || 90}
      style={{ objectFit: "cover", objectPosition: objectPosition || "center" }}
    />
  );
}

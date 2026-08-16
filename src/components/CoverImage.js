import Image from "next/image";

export default function CoverImage({ src, alt, objectPosition, sizes, priority, quality }) {
  const cacheSafeSrc = typeof src === "string" && src.startsWith("/") ? `${src}?v=20260728-2` : src;

  return (
    <Image
      src={cacheSafeSrc}
      alt={alt}
      fill
      sizes={sizes || "100vw"}
      priority={priority}
      quality={quality || 75}
      style={{ objectFit: "cover", objectPosition: objectPosition || "center" }}
    />
  );
}

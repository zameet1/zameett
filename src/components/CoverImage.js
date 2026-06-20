import Image from "next/image";

export default function CoverImage({ src, alt, objectPosition, sizes, priority }) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes || "100vw"}
      priority={priority}
      style={{ objectFit: "cover", objectPosition: objectPosition || "center" }}
    />
  );
}

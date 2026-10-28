import JsonLd from "@/components/JsonLd";
import { createBreadcrumbSchema } from "@/lib/seo";

export default function BreadcrumbJsonLd({ items }) {
  return <JsonLd data={createBreadcrumbSchema(items)} />;
}

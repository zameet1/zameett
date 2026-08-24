import PolicyPage from "@/components/PolicyPage";
import { getPolicy } from "@/lib/policyContent";
import { createPageMetadata } from "@/lib/seo";
const policy = getPolicy("digital-product-licence");
export const metadata = createPageMetadata({ title: policy.title, description: policy.description, path: "/digital-product-licence" });
export default function Page() { return <PolicyPage {...policy} />; }

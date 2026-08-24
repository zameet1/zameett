import PolicyPage from "@/components/PolicyPage";
import { getPolicy } from "@/lib/policyContent";
import { createPageMetadata } from "@/lib/seo";
const policy = getPolicy("digital-product-refund");
export const metadata = createPageMetadata({ title: policy.title, description: policy.description, path: "/digital-product-refund" });
export default function Page() { return <PolicyPage {...policy} />; }

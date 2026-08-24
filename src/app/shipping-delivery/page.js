import PolicyPage from "@/components/PolicyPage";
import { getPolicy } from "@/lib/policyContent";
import { createPageMetadata } from "@/lib/seo";
const policy = getPolicy("shipping-delivery");
export const metadata = createPageMetadata({ title: policy.title, description: policy.description, path: "/shipping-delivery" });
export default function Page() { return <PolicyPage {...policy} />; }

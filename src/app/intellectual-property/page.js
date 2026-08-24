import PolicyPage from "@/components/PolicyPage";
import { getPolicy } from "@/lib/policyContent";
import { createPageMetadata } from "@/lib/seo";
const policy = getPolicy("intellectual-property");
export const metadata = createPageMetadata({ title: policy.title, description: policy.description, path: "/intellectual-property" });
export default function Page() { return <PolicyPage {...policy} />; }

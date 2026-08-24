import PolicyPage from "@/components/PolicyPage";
import { getPolicy } from "@/lib/policyContent";
import { createPageMetadata } from "@/lib/seo";
const policy = getPolicy("manufacturing-terms");
export const metadata = createPageMetadata({ title: policy.title, description: policy.description, path: "/manufacturing-terms" });
export default function Page() { return <PolicyPage {...policy} />; }

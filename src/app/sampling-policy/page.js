import PolicyPage from "@/components/PolicyPage";
import { getPolicy } from "@/lib/policyContent";
import { createPageMetadata } from "@/lib/seo";
const policy = getPolicy("sampling-policy");
export const metadata = createPageMetadata({ title: policy.title, description: policy.description, path: "/sampling-policy" });
export default function Page() { return <PolicyPage {...policy} />; }

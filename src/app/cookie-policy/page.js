import PolicyPage from "@/components/PolicyPage";
import { getPolicy } from "@/lib/policyContent";
import { createPageMetadata } from "@/lib/seo";
const policy = getPolicy("cookie-policy");
export const metadata = createPageMetadata({ title: policy.title, description: policy.description, path: "/cookie-policy" });
export default function Page() { return <PolicyPage {...policy} />; }

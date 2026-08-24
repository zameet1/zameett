import PolicyPage from "@/components/PolicyPage";
import { getPolicy } from "@/lib/policyContent";
import { createPageMetadata } from "@/lib/seo";
const policy = getPolicy("revision-policy");
export const metadata = createPageMetadata({ title: policy.title, description: policy.description, path: "/revision-policy" });
export default function Page() { return <PolicyPage {...policy} />; }

import PolicyPage from "@/components/PolicyPage";
import { getPolicy } from "@/lib/policyContent";
import { createPageMetadata } from "@/lib/seo";
const policy = getPolicy("refund-cancellation");
export const metadata = createPageMetadata({ title: policy.title, description: policy.description, path: "/refund-cancellation" });
export default function Page() { return <PolicyPage {...policy} />; }

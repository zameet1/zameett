import PolicyPage from "@/components/PolicyPage";
import { getPolicy } from "@/lib/policyContent";
const policy = getPolicy("refund-cancellation");
export const metadata = { title: policy.title, description: policy.description, alternates: { canonical: "/refund-cancellation" } };
export default function Page() { return <PolicyPage {...policy} />; }

import PolicyPage from "@/components/PolicyPage";
import { getPolicy } from "@/lib/policyContent";
const policy = getPolicy("manufacturing-terms");
export const metadata = { title: policy.title, description: policy.description, alternates: { canonical: "/manufacturing-terms" } };
export default function Page() { return <PolicyPage {...policy} />; }

import PolicyPage from "@/components/PolicyPage";
import { getPolicy } from "@/lib/policyContent";
const policy = getPolicy("disclaimer");
export const metadata = { title: policy.title, description: policy.description, alternates: { canonical: "/disclaimer" } };
export default function Page() { return <PolicyPage {...policy} />; }

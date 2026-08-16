import PolicyPage from "@/components/PolicyPage";
import { getPolicy } from "@/lib/policyContent";
const policy = getPolicy("sampling-policy");
export const metadata = { title: policy.title, description: policy.description, alternates: { canonical: "/sampling-policy" } };
export default function Page() { return <PolicyPage {...policy} />; }

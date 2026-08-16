import PolicyPage from "@/components/PolicyPage";
import { getPolicy } from "@/lib/policyContent";
const policy = getPolicy("revision-policy");
export const metadata = { title: policy.title, description: policy.description, alternates: { canonical: "/revision-policy" } };
export default function Page() { return <PolicyPage {...policy} />; }

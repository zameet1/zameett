import PolicyPage from "@/components/PolicyPage";
import { getPolicy } from "@/lib/policyContent";
const policy = getPolicy("cookie-policy");
export const metadata = { title: policy.title, description: policy.description, alternates: { canonical: "/cookie-policy" } };
export default function Page() { return <PolicyPage {...policy} />; }

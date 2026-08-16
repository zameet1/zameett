import PolicyPage from "@/components/PolicyPage";
import { getPolicy } from "@/lib/policyContent";
const policy = getPolicy("intellectual-property");
export const metadata = { title: policy.title, description: policy.description, alternates: { canonical: "/intellectual-property" } };
export default function Page() { return <PolicyPage {...policy} />; }

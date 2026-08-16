import PolicyPage from "@/components/PolicyPage";
import { getPolicy } from "@/lib/policyContent";
const policy = getPolicy("shipping-delivery");
export const metadata = { title: policy.title, description: policy.description, alternates: { canonical: "/shipping-delivery" } };
export default function Page() { return <PolicyPage {...policy} />; }

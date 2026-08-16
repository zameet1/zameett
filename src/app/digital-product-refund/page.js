import PolicyPage from "@/components/PolicyPage";
import { getPolicy } from "@/lib/policyContent";
const policy = getPolicy("digital-product-refund");
export const metadata = { title: policy.title, description: policy.description, alternates: { canonical: "/digital-product-refund" } };
export default function Page() { return <PolicyPage {...policy} />; }

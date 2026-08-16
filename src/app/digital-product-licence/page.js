import PolicyPage from "@/components/PolicyPage";
import { getPolicy } from "@/lib/policyContent";
const policy = getPolicy("digital-product-licence");
export const metadata = { title: policy.title, description: policy.description, alternates: { canonical: "/digital-product-licence" } };
export default function Page() { return <PolicyPage {...policy} />; }

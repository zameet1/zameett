import { redirect } from "next/navigation";

export const metadata = {
  title: "Checkout unavailable",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  redirect("/pricing");
}

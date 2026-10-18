import LegalPage from "@/components/LegalPage";
import { policyMetadata } from "@/data/legal-policies";

export const metadata = policyMetadata("refund-cancellation-policy");

export default function Page() {
  return <LegalPage slug="refund-cancellation-policy" />;
}

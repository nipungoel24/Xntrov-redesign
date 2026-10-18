import LegalPage from "@/components/LegalPage";
import { policyMetadata } from "@/data/legal-policies";

export const metadata = policyMetadata("disclaimer");

export default function Page() {
  return <LegalPage slug="disclaimer" />;
}

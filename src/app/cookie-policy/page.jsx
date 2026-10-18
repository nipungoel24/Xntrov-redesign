import LegalPage from "@/components/LegalPage";
import { policyMetadata } from "@/data/legal-policies";

export const metadata = policyMetadata("cookie-policy");

export default function Page() {
  return <LegalPage slug="cookie-policy" />;
}

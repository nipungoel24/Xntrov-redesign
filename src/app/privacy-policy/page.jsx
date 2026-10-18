import LegalPage from "@/components/LegalPage";
import { policyMetadata } from "@/data/legal-policies";

export const metadata = policyMetadata("privacy-policy");

export default function Page() {
  return <LegalPage slug="privacy-policy" />;
}

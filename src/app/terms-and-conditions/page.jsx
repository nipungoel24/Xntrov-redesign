import LegalPage from "@/components/LegalPage";
import { policyMetadata } from "@/data/legal-policies";

export const metadata = policyMetadata("terms-and-conditions");

export default function Page() {
  return <LegalPage slug="terms-and-conditions" />;
}

import JSONValidator from "@/components/json/JSONValidator";

export const metadata = {
  title: "JSON Validator - Validate JSON Against Standards",
  description: "Validate your JSON against industry standards (RFC 8259).",
  openGraph: {
    title: "JSON Validator - Validate JSON Against Standards",
    description: "Validate your JSON against industry standards (RFC 8259).",
    url: "https://shashi.dev/toolkit/json-validator",
  },
};

export default function JSONValidatorPage() {
  return <JSONValidator />;
}

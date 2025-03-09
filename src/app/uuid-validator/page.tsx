import UUIDGenerator from "@/components/uuid/UUIDGenerator";

export const metadata = {
  title: "UUID Validator - Check UUID Validity",
  description: "Check if a given string is a valid UUID.",
  openGraph: {
    title: "UUID Validator - Check UUID Validity",
    description: "Check if a given string is a valid UUID.",
    url: "https://shashi.dev/toolkit/uuid-validator",
  },
};

export default function UUIDValidatorPage() {
  return <UUIDGenerator />;
}
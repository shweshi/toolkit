import UUIDGenerator from "@/components/uuid/UUIDGenerator";

export const metadata = {
  title: "UUID Generator - Generate Unique UUIDs Online",
  description: "Generate unique UUIDs (v4) instantly for your applications.",
  openGraph: {
    title: "UUID Generator - Generate Unique UUIDs Online",
    description: "Generate unique UUIDs (v4) instantly for your applications.",
    url: "https://shashi.dev/toolkit/uuid-generator",
  },
};

export default function UUIDGeneratorPage() {
  return <UUIDGenerator />;
}
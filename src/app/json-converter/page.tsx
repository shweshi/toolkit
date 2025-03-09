import JSONConverter from "@/components/json/JSONConverter";

export const metadata = {
  title: "JSON Converter - Convert JSON to YAML, XML, CSV",
  description: "Convert JSON into YAML, XML, and CSV formats effortlessly.",
  openGraph: {
    title: "JSON Converter - Convert JSON to YAML, XML, CSV",
    description: "Convert JSON into YAML, XML, and CSV formats effortlessly.",
    url: "https://shashi.dev/toolkit/json-converter",
  },
};

export default function JSONConverterPage() {
  return <JSONConverter />;
}

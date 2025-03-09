import JSONFormatter from "@/components/json/JSONFormatter";

export const metadata = {
  title: "JSON Formatter - Beautify and Format JSON Online",
  description: "Instantly beautify and format your JSON for better readability.",
  openGraph: {
    title: "JSON Formatter - Beautify and Format JSON Online",
    description: "Instantly beautify and format your JSON for better readability.",
    url: "https://shashi.dev/toolkit/json-formatter",
  },
};

export default function JSONFormatterPage() {
  return <JSONFormatter />;
}

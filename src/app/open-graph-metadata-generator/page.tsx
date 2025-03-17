import OpenGraphMetadataGenerator from "@/components/url/OpenGraphMetadataGenerator";

export const metadata = {
  title: "Open Graph Metadata Generator",
  description: "Generator Open Graph Metadata for the URL.",
  openGraph: {
    title: "Open Graph Metadata Generator",
    description: "Generator Open Graph Metadata for the URL.",
    url: "https://shashi.dev/toolkit/open-graph-metadata-generator",
  },
};

export default function OpenGraphMetadataGeneratorPage() {
  return <OpenGraphMetadataGenerator />;
}

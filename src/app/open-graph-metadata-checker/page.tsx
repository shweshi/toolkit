import OpenGraphMetadataExtractor from "@/components/url/OpenGraphMetadataExtractor";

export const metadata = {
  title: "Open Graph Metadata Checker",
  description: "Fetch Open Graph Metadata of the URL.",
  openGraph: {
    title: "Open Graph Metadata Checker",
    description: "Fetch Open Graph Metadata of the URL.",
    url: "https://shashi.dev/toolkit/open-graph-metadata-checker",
  },
};

export default function OpenGraphMetadataExtractorPage() {
  return <OpenGraphMetadataExtractor />;
}
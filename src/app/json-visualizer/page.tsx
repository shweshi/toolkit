import JSONVisualizer from "@/components/json/JSONVisualizer";

export const metadata = {
  title: "JSON Visualizer - View JSON in Tree Structure",
  description: "View JSON data interactively in a structured tree format.",
  openGraph: {
    title: "JSON Visualizer - View JSON in Tree Structure",
    description: "View JSON data interactively in a structured tree format.",
    url: "https://shashi.dev/toolkit/json-visualizer",
  },
};

export default function JSONVisualizerPage() {
  return <JSONVisualizer />;
}

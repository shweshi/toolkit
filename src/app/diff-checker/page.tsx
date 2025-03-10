import DiffChecker from "@/components/text/DiffChecker";

export const metadata = {
  title: "Diff Checker",
  description: "Compare text, JSON, and code side by side.",
  openGraph: {
    title: "Diff Checker",
    description: "Compare text, JSON, and code side by side.",
    url: "https://shashi.dev/toolkit/diff-checker",
  },
};

export default function DiffCheckerPage() {
  return <DiffChecker />;
}
import { X } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Button from "./Button";
import { JSONTree } from "react-json-tree";

interface JsonFullScreenProps {
  json: string;
  visualize?: boolean;
  isOpen: boolean;
  onClose: () => void;
}

const customTheme = {
  scheme: "shashi",
  author: "Shashi Prakash Gautam (http://github.com/shweshi)",
  base00: "#1e2431",
  base01: "#282a2e",
  base02: "#373b41",
  base03: "#969896",
  base04: "#b4b7b4",
  base05: "#c5c8c6",
  base06: "#e0e0e0",
  base07: "#ffffff",
  base08: "#CC342B",
  base09: "#F96A38",
  base0A: "#FBA922",
  base0B: "#198844",
  base0C: "#3971ED",
  base0D: "#3971ED",
  base0E: "#A36AC7",
  base0F: "#3971ED",
};

export default function JsonFullScreen({
  json,
  visualize,
  isOpen,
  onClose,
}: JsonFullScreenProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="relative w-full h-full max-h-screen overflow-auto p-4 bg-gray-900 rounded-lg">
        <Button
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-700 p-2 rounded-lg"
        >
          <X size={20} />
        </Button>
        {visualize ? (
          <JSONTree data={json} theme={customTheme} invertTheme={false} />
        ) : (
          <SyntaxHighlighter
            language="json"
            style={atomDark}
            customStyle={{
              backgroundColor: "#1e2431",
              borderRadius: "0.75rem",
              marginTop: "0rem",
            }}
            className="font-mono text-sm whitespace-pre-wrap h-full"
          >
            {String(json || "")}
          </SyntaxHighlighter>
        )}
      </div>
    </div>
  );
}

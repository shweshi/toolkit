"use client";
import { useState, useEffect, useRef } from "react";
import Header from "@/components/ui/Header";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";
import {
  Code,
  Braces,
  AlertTriangle,
  CheckCircle,
  Download,
  Copy,
  Trash2,
  UploadIcon,
  Expand,
} from "lucide-react";
import yaml from "js-yaml";
import { json2xml } from "xml-js";
import { parse as json2csv } from "json2csv";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { getSampleJson } from "@/utils/SampleJson";
import Back from "../ui/Back";
import JsonFullScreen from "@/components/ui/JsonFullScreen";

export default function JsonConverter() {
  const [jsonInput, setJsonInput] = useState("");
  const [convertedOutput, setConvertedOutput] = useState<string | undefined>(
    undefined
  );
  const [selectedFormat, setSelectedFormat] = useState("json");
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean;
    message: string;
  }>({
    isValid: false,
    message: "",
  });
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    if (jsonInput.trim().startsWith("http")) {
      handleLoadFromUrl(jsonInput.trim());
    } else {
      convertJson();
    }
  }, [jsonInput, selectedFormat]);

  const convertJson = () => {
    if (!jsonInput.trim()) {
      setConvertedOutput(undefined);
      setValidationResult({ isValid: false, message: "JSON is empty" });
      return;
    }

    try {
      const parsedJson = JSON.parse(jsonInput);
      let result = "";

      switch (selectedFormat) {
        case "yaml":
          result = yaml.dump(parsedJson);
          break;
        case "xml":
          result = json2xml(JSON.stringify(parsedJson), {
            compact: true,
            spaces: 2,
          });
          break;
        case "csv":
          if (Array.isArray(parsedJson)) {
            // If JSON is an array of objects (valid CSV structure)
            result = json2csv(parsedJson);
          } else if (typeof parsedJson === "object" && parsedJson !== null) {
            // Convert object to array before converting to CSV
            result = json2csv([parsedJson]);
          } else {
            throw new Error("CSV conversion requires an array or object.");
          }
          break;
        default:
          result = JSON.stringify(parsedJson, null, 2);
      }

      setConvertedOutput(result);
      setValidationResult({
        isValid: true,
        message: "Valid JSON (RFC 8259 Compliant)",
      });
    } catch (e: any) {
      setConvertedOutput(undefined);
      setValidationResult({ isValid: false, message: e.message });
    }
  };

  const loadSampleJson = () => {
    const sample = getSampleJson();
    setJsonInput(sample);
    setConvertedOutput(sample);
  };

  const handleCopy = () => {
    if (convertedOutput) {
      navigator.clipboard.writeText(convertedOutput).then(() => {
        alert("JSON copied to clipboard!");
      });
    }
  };

  const handleDelete = () => {
    if (jsonInput) {
      setJsonInput("");
    }
  };

  const handleDownload = () => {
    if (convertedOutput) {
      let type = "json";
      switch (selectedFormat) {
        case "yaml":
          type = "yaml";
          break;
        case "xml":
          type = "xml";
          break;
        case "csv":
          type = "csv";
          break;
        default:
          type = "json";
      }
      const blob = new Blob([convertedOutput], { type: `application/${type}` });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `formatted.${type}`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Get the first file from the input

    if (!file) {
      alert("No file selected.");
      return;
    }

    const reader = new FileReader();

    // This function will run when the file is successfully read
    reader.onload = () => {
      try {
        const fileContent = reader.result as string;

        // Try parsing the file content into JSON
        const parsedJson = JSON.parse(fileContent);

        // If successful, set the parsed JSON to jsonInput
        setJsonInput(JSON.stringify(parsedJson, null, 2));
        setConvertedOutput(JSON.stringify(parsedJson, null, 2)); // Update formatted JSON as well
        setValidationResult({ isValid: true, message: "Valid JSON" });
      } catch (error) {
        // Handle parsing errors (invalid JSON)
        setConvertedOutput(undefined);
        setValidationResult({ isValid: false, message: "Invalid JSON file." });
        alert("Error: The file is not a valid JSON.");
      }
    };

    // This function will run if there's an error reading the file
    reader.onerror = () => {
      setConvertedOutput(undefined);
      setValidationResult({
        isValid: false,
        message: "Error reading the file.",
      });
      alert("Error: Could not read the file.");
    };

    // Read the file as a text
    reader.readAsText(file);
  };

  const handleLoadFromUrl = async (url: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch JSON.");
      const jsonData = await response.json();
      setJsonInput(JSON.stringify(jsonData, null, 2));
      setConvertedOutput(JSON.stringify(jsonData, null, 2));
      setValidationResult({ isValid: true, message: "Valid JSON from URL" });
    } catch (error) {
      setConvertedOutput(undefined);
      setValidationResult({
        isValid: false,
        message: "Invalid JSON from URL.",
      });
      alert("Error: Could not fetch valid JSON from the URL.");
    }
  };

  const inputButtons = [
    {
      icon: <UploadIcon size={20} />,
      onClick: () => fileInputRef.current?.click(),
    },
    {
      icon: <Trash2 size={20} />,
      onClick: handleDelete,
    },
  ];

  const resultButtons = [
    {
      icon: <Copy size={20} />,
      onClick: handleCopy,
    },
    {
      icon: <Download size={20} />,
      onClick: handleDownload,
    },
    {
      icon: <Expand size={20} />,
      onClick: () => setIsFullScreen(true)
    },
  ];

  return (
    <div className="min-h-screen bg-custom-dark text-white">
      <main className="p-6 max-w-6xl mx-auto">
        <Back />
        <Header
          title="JSON Converter"
          description="Convert JSON to CSV, XML, YAML instantly."
          icon={Code}
        />
        <div className="flex justify-between mt-4">
          <Button
            className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-gray-400 hover:text-white backdrop-blur-sm flex items-center gap-2"
            onClick={loadSampleJson}
          >
            <Braces />
            <span className="text-sm sm:text-base">Load Sample JSON</span>
          </Button>

          <select
            value={selectedFormat}
            onChange={(e) => setSelectedFormat(e.target.value)}
            className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-white focus:border-blue-400 outline-none appearance-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 1rem center",
              backgroundSize: "1.5em",
              paddingRight: "2.5rem",
            }}
          >
            <option value="json" className="bg-[#0A0F1C] text-white">
              JSON
            </option>
            <option value="yaml" className="bg-[#0A0F1C] text-white">
              YAML
            </option>
            <option value="xml" className="bg-[#0A0F1C] text-white">
              XML
            </option>
            <option value="csv" className="bg-[#0A0F1C] text-white">
              CSV
            </option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Card title="JSON Input" buttons={inputButtons}>
            <input
              type="file"
              accept=".json" // Restrict file type to JSON
              ref={fileInputRef} // Reference to trigger file input programmatically
              onChange={handleUpload} // Handle file change (upload)
              className="hidden" // Make the file input invisible
            />
            <div className="h-[200px] sm:h-[600px] relative">
              <Textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder="Paste your JSON or URL here..."
              />
            </div>
          </Card>

          <Card title={"Converted Output"} buttons={resultButtons}>
            <div className="h-[200px] sm:h-[600px] relative">
              <div
                className={`flex flex-col rounded-xl border h-[200px] sm:h-[600px] ${validationResult.isValid
                    ? "bg-card-dark text-green-400 border-green-400/20"
                    : "bg-card-dark text-red-400 border-red-400/20"
                  }`}
              >
                {!validationResult.isValid && (
                  <div className="flex inline-block mt-2">
                    <AlertTriangle className="inline-block ml-2 mr-2" />
                    {validationResult.message}
                  </div>
                )}

                <SyntaxHighlighter
                  language="json"
                  style={atomDark}
                  customStyle={{
                    backgroundColor: "#1e2431",
                    borderRadius: "0.75rem",
                    marginTop: "0rem",
                  }}
                  className="flex-1 p-6 font-mono text-sm whitespace-pre-wrap h-[200px] sm:h-[600px]"
                >
                  {String(convertedOutput || "")}
                </SyntaxHighlighter>
              </div>
            </div>
          </Card>
        </div>
      </main>
      <JsonFullScreen json={convertedOutput || ""} isOpen={isFullScreen} onClose={() => setIsFullScreen(false)} />
    </div>
  );
}

"use client";

import { useState, useEffect, SetStateAction, useRef } from "react";
import yaml from "js-yaml";
import { json2xml } from "xml-js";
import { parse as json2csv } from "json2csv";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Header from "@/components/ui/Header";
import Tabs from "@/components/ui/Tabs";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";
import { AlertTriangle, Braces, CheckCircle, Code, Copy, Download, Expand, RefreshCcw, ShieldCheck, Trash2, UploadIcon, X } from "lucide-react";
import { getSampleJson } from "@/utils/SampleJson";
import { JSONTree } from "react-json-tree";
import Back from "../ui/Back";
import JsonFullScreen from "@/components/ui/JsonFullScreen";

export default function JsonPage() {
  const [jsonInput, setJsonInput] = useState("");
  const [parsedJson, setParsedJson] = useState<any>(null);
  const [formattedJson, setFormattedJson] = useState<string | undefined>(undefined);
  const [convertedOutput, setConvertedOutput] = useState<string | undefined>(undefined);
  const [validationResult, setValidationResult] = useState<{ isValid: boolean; message: string }>({
    isValid: false,
    message: "",
  });
  const [activeTab, setActiveTab] = useState(0);
  const [selectedFormat, setSelectedFormat] = useState("json");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Auto-format/convert on text input change
  useEffect(() => {
    if (activeTab === 1) {
      if (jsonInput.trim().startsWith("http")) {
        handleLoadFromUrl(jsonInput.trim());
      } else {
        convertJson();
      }
    } else {
      if (jsonInput.trim().startsWith("http")) {
        handleLoadFromUrl(jsonInput.trim());
      } else {
        formatJson();
      }
    }
  }, [jsonInput, selectedFormat]);

  const setActiveTabAction = (activeTab: SetStateAction<number>) => {
    setActiveTab(activeTab);
    if (activeTab === 0) {
      formatJson();
    } else if (activeTab === 1) {
      convertJson();
    } else if (activeTab === 2) {
      formatJson();
    } else if (activeTab === 3) {
      formatJson()
    }
  }

  const formatJson = () => {
    if (!jsonInput.trim()) {
      setFormattedJson(undefined);
      setValidationResult({ isValid: false, message: "JSON is empty" });
      return;
    }
    try {
      const parsedJson = JSON.parse(jsonInput);
      setParsedJson(parsedJson);
      setFormattedJson(JSON.stringify(parsedJson, null, 2));
      setValidationResult({ isValid: true, message: "Valid JSON (RFC 8259 Compliant)" });
    } catch (e: any) {
      setFormattedJson(undefined);
      setValidationResult({ isValid: false, message: e.message });
    }
  };

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
          result = json2xml(JSON.stringify(parsedJson), { compact: true, spaces: 2 });
          break;
        case "csv":
          result = json2csv(parsedJson);
          break;
        default:
          result = JSON.stringify(parsedJson, null, 2);
      }

      setConvertedOutput(result);
      setValidationResult({ isValid: true, message: "Valid JSON (RFC 8259 Compliant)" });
    } catch (e: any) {
      setConvertedOutput(undefined);
      setValidationResult({ isValid: false, message: e.message });
    }
  };

  const loadSampleJson = () => {
    const sample = getSampleJson();
    setJsonInput(sample);
    formatJson();
    convertJson();
  };

  const tabs = [
    { label: "JSON Formatter", icon: <Code />, desc: "Formatted JSON" },
    { label: "JSON Converter", icon: <RefreshCcw />, desc: "Converted Output" },
    { label: "JSON Visualizer", icon: <Braces />, desc: "Visualized JSON" },
    { label: "JSON Validator", icon: <ShieldCheck />, desc: "Result" }
  ];

  const handleCopy = () => {
    const data = activeTab === 1 ? String(convertedOutput || "") : String(formattedJson || "")
    if (data) {
      navigator.clipboard.writeText(data).then(() => {
        alert("Copied to clipboard!");
      });
    }
  };

  const handleDelete = () => {
    if (jsonInput) {
      setJsonInput("");
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
        setFormattedJson(JSON.stringify(parsedJson, null, 2)); // Update formatted JSON as well
        setValidationResult({ isValid: true, message: "Valid JSON" });
      } catch (error) {
        // Handle parsing errors (invalid JSON)
        setFormattedJson(undefined);
        setValidationResult({ isValid: false, message: "Invalid JSON file." });
        alert("Error: The file is not a valid JSON.");
      }
    };

    // This function will run if there's an error reading the file
    reader.onerror = () => {
      setFormattedJson(undefined);
      setValidationResult({ isValid: false, message: "Error reading the file." });
      alert("Error: Could not read the file.");
    };

    // Read the file as a text
    reader.readAsText(file);
  };

  const handleDownload = () => {
    const data = activeTab === 1 ? String(convertedOutput || "") : String(formattedJson || "")
    if (data) {
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
      const blob = new Blob([data], { type: `application/${type}` });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `formatted.${type}`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleLoadFromUrl = async (url: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch JSON.");
      const jsonData = await response.json();
      setJsonInput(JSON.stringify(jsonData, null, 2));
      setParsedJson(JSON.stringify(jsonData, null, 2));
      setValidationResult({ isValid: true, message: "Valid JSON from URL" });
    } catch (error) {
      setParsedJson(undefined);
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

  const customTheme = {
    scheme: 'shashi',
    author: 'Shashi Prakash Gautam (http://github.com/shweshi)',
    base00: '#1e2431',
    base01: '#282a2e',
    base02: '#373b41',
    base03: '#969896',
    base04: '#b4b7b4',
    base05: '#c5c8c6',
    base06: '#e0e0e0',
    base07: '#ffffff',
    base08: '#CC342B',
    base09: '#F96A38',
    base0A: '#FBA922',
    base0B: '#198844',
    base0C: '#3971ED',
    base0D: '#3971ED',
    base0E: '#A36AC7',
    base0F: '#3971ED'
  };

  return (
    <div className="min-h-screen bg-custom-dark text-white">
      <main className="p-6 max-w-6xl mx-auto">
        <Back />
        <Header title="JSON Tools" description="Powerful JSON visualization and formatting tools with multiple export options." icon={ShieldCheck} />
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTabAction} />

        <div className="flex justify-between mt-4 gap-2">
          <Button
            className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-gray-400 hover:text-white backdrop-blur-sm flex items-center gap-2"
            onClick={loadSampleJson}
          >
            <Braces /> <span className="text-sm sm:text-base">Load Sample JSON</span>
          </Button>

          {activeTab === 1 && (
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-white focus:border-blue-400 outline-none appearance-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 1rem center",
                backgroundSize: "1.5em",
                paddingRight: "2.5rem"
              }}
            >
              <option value="json" className="bg-[#0A0F1C] text-white">JSON</option>
              <option value="yaml" className="bg-[#0A0F1C] text-white">YAML</option>
              <option value="xml" className="bg-[#0A0F1C] text-white">XML</option>
              <option value="csv" className="bg-[#0A0F1C] text-white">CSV</option>
            </select>
          )}


          {activeTab === 0 && (
            <Button
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all flex items-center gap-2"
              onClick={formatJson}
            >
              <Code /><span className="text-sm sm:text-base">{"Format JSON"}</span>
            </Button>
          )}
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

          <Card title={tabs[activeTab]?.desc || "Output"} buttons={resultButtons}>

            <div className="h-[200px] sm:h-[600px] relative">
              <div
                className={`flex flex-col rounded-xl border h-[200px] sm:h-[600px] ${validationResult.isValid
                  ? "bg-card-dark text-green-400 border-green-400/20"
                  : "bg-card-dark text-red-400 border-red-400/20"
                  }`}
              >
                {!validationResult.isValid && (
                  <div className="flex inline-block mt-2" ><AlertTriangle className="inline-block ml-2 mr-2" />{validationResult.message}</div>
                )}
                {(activeTab === 3 && validationResult.isValid) ? (
                  <div className="flex inline-block mt-2" ><CheckCircle className="inline-block ml-2 mr-2" />{validationResult.message}</div>
                ) : (<></>)}

                {activeTab === 2 ? (
                  <div
                    className="p-4"
                    style={{
                      backgroundColor: "#1e2431",
                      borderRadius: "0.75rem",  // Add border-radius
                      padding: "16px",
                      overflow: "hidden", // Ensures rounded corners are visible
                    }}
                  >
                    <JSONTree data={parsedJson} theme={customTheme} invertTheme={false} />
                  </div>
                ) : (
                  <SyntaxHighlighter
                    key={activeTab + selectedFormat + jsonInput.length} // Ensures rerender
                    language={selectedFormat}
                    style={atomDark}
                    customStyle={{ backgroundColor: "#1e2431", borderRadius: "0.75rem", marginTop: "0rem" }}
                    className="flex-1 p-6 font-mono text-sm whitespace-pre-wrap h-[200px] sm:h-[600px]"
                  >
                    {activeTab === 1 ? String(convertedOutput || "") : String(formattedJson || "")}
                  </SyntaxHighlighter>
                )}
              </div>

            </div>
          </Card>
        </div>
      </main>
      <JsonFullScreen json={activeTab === 1 ? String(convertedOutput || "") : String(formattedJson || "")} isOpen={isFullScreen} onClose={() => setIsFullScreen(false)} />
    </div>
  );
}

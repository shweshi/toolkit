"use client";
import { useState, useEffect } from "react";
import Header from "@/components/ui/Header";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";
import { Code, Braces, AlertTriangle, CheckCircle } from "lucide-react";
import yaml from "js-yaml";
import { json2xml } from "xml-js";
import { parse as json2csv } from "json2csv";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { getSampleJson } from "@/utils/SampleJson";
import Back from "../ui/Back";

export default function JsonConverter() {
  const [jsonInput, setJsonInput] = useState("");
  const [convertedOutput, setConvertedOutput] = useState<string | undefined>(undefined);
  const [selectedFormat, setSelectedFormat] = useState("json");
  const [validationResult, setValidationResult] = useState<{ isValid: boolean; message: string }>({
    isValid: false,
    message: "",
  });

  useEffect(() => {
    convertJson();
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
          result = json2xml(JSON.stringify(parsedJson), { compact: true, spaces: 2 });
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
      setValidationResult({ isValid: true, message: "Valid JSON (RFC 8259 Compliant)" });
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

  return (
    <div className="min-h-screen bg-custom-dark text-white">
      <main className="p-6 max-w-6xl mx-auto">
        <Back />
        <Header title="JSON Converter" description="Convert JSON to CSV, XML, YAML instantly." icon={Code} />
        <div className="flex justify-between mt-4">
          <Button
            className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-gray-400 hover:text-white backdrop-blur-sm flex items-center gap-2"
            onClick={loadSampleJson}
          >
            <Braces /> Load Sample JSON
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
              paddingRight: "2.5rem"
            }}
          >
            <option value="json" className="bg-[#0A0F1C] text-white">JSON</option>
            <option value="yaml" className="bg-[#0A0F1C] text-white">YAML</option>
            <option value="xml" className="bg-[#0A0F1C] text-white">XML</option>
            <option value="csv" className="bg-[#0A0F1C] text-white">CSV</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Card title="JSON Input">
            <div className="h-[200px] sm:h-[600px] relative">
              <Textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder="Paste your JSON here..."
              />
            </div>
          </Card>

          <Card title={"Converted Output"}>
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

                <SyntaxHighlighter
                  language="json"
                  style={atomDark}
                  customStyle={{ backgroundColor: "#1e2431", borderRadius: "0.75rem", marginTop: "0rem" }}
                  className="flex-1 p-6 font-mono text-sm whitespace-pre-wrap h-[200px] sm:h-[600px]"
                >
                  {String(convertedOutput || "")}
                </SyntaxHighlighter>

              </div>

            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
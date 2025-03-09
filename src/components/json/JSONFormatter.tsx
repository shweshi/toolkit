"use client";
import { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";
import { AlertTriangle, Braces, CheckCircle, Code } from "lucide-react";
import { getSampleJson } from "@/utils/SampleJson";

export default function JsonFormatter() {
  const [jsonInput, setJsonInput] = useState("");
  const [formattedJson, setFormattedJson] = useState<string | undefined>(undefined);
  const [validationResult, setValidationResult] = useState<{ isValid: boolean; message: string }>({
    isValid: false,
    message: "",
  });
  const [selectedFormat, setSelectedFormat] = useState("json");

  useEffect(() => {
    formatJson();
  }, [jsonInput]);

  const formatJson = () => {
    if (!jsonInput.trim()) {
      setFormattedJson(undefined);
      setValidationResult({ isValid: false, message: "JSON is empty" });
      return;
    }
    try {
      const parsedJson = JSON.parse(jsonInput);
      setFormattedJson(JSON.stringify(parsedJson, null, 2));
      setValidationResult({ isValid: true, message: "Valid JSON (RFC 8259 Compliant)" });
    } catch (e: any) {
      setFormattedJson(undefined);
      setValidationResult({ isValid: false, message: e.message });
    }
  };

  const loadSampleJson = () => {
    const sample = getSampleJson();
    setJsonInput(sample);
    setFormattedJson(JSON.stringify(JSON.parse(sample), null, 2));
  };

  return (
    <div className="min-h-screen bg-custom-dark text-white">
      <main className="p-6 max-w-6xl mx-auto">
        <Header title="JSON Formatter" description="Format and beautify your JSON instantly." icon={Braces} />
        <div className="flex justify-between mt-4">
          <Button
            className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-gray-400 hover:text-white backdrop-blur-sm flex items-center gap-2"
            onClick={loadSampleJson}
          >
            <Braces /> Load Sample JSON
          </Button>

          <Button onClick={formatJson} className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all flex items-center gap-2">
            <Braces /> Format JSON
          </Button>
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

          <Card title={"Formatted JSON"}>
            <div className="h-[200px] sm:h-[600px] relative">
              <div
                className={`rounded-xl border h-[200px] sm:h-[600px] ${validationResult.isValid
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
                  className="p-6 font-mono text-sm whitespace-pre-wrap h-[200px] sm:h-[600px]"
                >
                  {String(formattedJson || "")}
                </SyntaxHighlighter>
              </div>

            </div>
          </Card>
        </div>
        <Footer />
      </main>
    </div>
  );
}
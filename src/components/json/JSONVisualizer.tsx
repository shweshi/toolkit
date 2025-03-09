"use client";
import { useState, useEffect } from "react";
import Header from "@/components/ui/Header";
import Card from "@/components/ui/Card";
import Textarea from "@/components/ui/Textarea";
import { JSONTree } from "react-json-tree";
import { getSampleJson } from "@/utils/SampleJson";
import Button from "@/components/ui/Button";
import { AlertTriangle, CheckCircle, Code, MonitorSpeakerIcon } from "lucide-react";
import { Braces } from "lucide-react";

export default function JsonVisualizer() {
  const [jsonInput, setJsonInput] = useState("");
  const [parsedJson, setParsedJson] = useState<any>(null);
  const [validationResult, setValidationResult] = useState<{ isValid: boolean; message: string }>({
    isValid: false,
    message: "",
  });

  useEffect(() => {
    visualizeJson();
  }, [jsonInput]);

  const visualizeJson = () => {
    if (!jsonInput.trim()) {
      setParsedJson(undefined);
      setValidationResult({ isValid: false, message: "JSON is empty" });
      return;
    }
    try {
      const parsedJson = JSON.parse(jsonInput);
      setParsedJson(parsedJson);
      setValidationResult({ isValid: true, message: "Valid JSON (RFC 8259 Compliant)" });
    } catch (e: any) {
      setParsedJson(null);
      setValidationResult({ isValid: false, message: e.message });
    }
  };

  const loadSampleJson = () => {
    const sample = getSampleJson();
    setJsonInput(sample);
  };

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
        <Header title="JSON Visualizer" description="Visually explore your JSON structure" icon={Braces} />
        <div className="flex justify-between mt-4">
          <Button
            className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-gray-400 hover:text-white backdrop-blur-sm flex items-center gap-2"
            onClick={loadSampleJson}
          >
            <Braces /> Load Sample JSON
          </Button>

          <Button onClick={visualizeJson} className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all flex items-center gap-2">
            <Code /> Visualize JSON
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
          <Card title="Visualized JSON">
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

                {parsedJson && (
                  <div
                    className="p-4 h-[200px] sm:h-[600px]"
                    style={{
                      backgroundColor: "#1e2431",
                      borderRadius: "0.75rem",  // Add border-radius
                      padding: "16px",
                      overflow: "hidden", // Ensures rounded corners are visible
                    }}
                  >
                    <JSONTree data={parsedJson} theme={customTheme} invertTheme={false} />
                  </div>
                )}
              </div>

            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
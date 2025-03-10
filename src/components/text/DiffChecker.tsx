"use client";

import { useEffect, useState } from "react";
import DiffViewer from "react-diff-viewer";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Text, Code, FileText } from "lucide-react";
import Header from "@/components/ui/Header";
import Card from "@/components/ui/Card";
import Textarea from "@/components/ui/Textarea";
import Back from "../ui/Back";
import SimpleCard from "../ui/SimpleCard";

export default function DiffChecker() {
    const [input1, setInput1] = useState("");
    const [input2, setInput2] = useState("");
    const [format, setFormat] = useState("text");
    const [splitView, setSplitView] = useState(true);

    // Syntax highlighting for JSON, Code
    const renderSyntaxHighlight = (str: string) => (
        <SyntaxHighlighter
            language={format === "json" ? "json" : "javascript"}
            style={atomDark}
            customStyle={{ backgroundColor: "#121826", borderRadius: "0.75rem", marginTop: "0rem" }}
            className="flex-1 p-6 font-mono text-sm whitespace-pre-wrap h-[200px] sm:h-[600px]"
        >
            {str}
        </SyntaxHighlighter>
    );

    return (
        <div className="min-h-screen bg-custom-dark text-white">
            <main className="p-6 max-w-6xl mx-auto">
                <Back />
                <Header title="Diff Checker" description="Compare text, JSON, and code side by side." icon={FileText} />

                <div className="flex justify-between mt-4">
                    <SimpleCard title="Select Format">
                        <select
                            value={format}
                            onChange={(e) => setFormat(e.target.value)}
                            className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-white focus:border-blue-400 outline-none appearance-none"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "right 1rem center",
                                backgroundSize: "1.5em",
                                paddingRight: "2.5rem"
                            }}
                        >
                            <option value="text" className="bg-[#0A0F1C] text-white">Text</option>
                            <option value="json" className="bg-[#0A0F1C] text-white">JSON</option>
                            <option value="code" className="bg-[#0A0F1C] text-white">Code</option>
                        </select>
                    </SimpleCard>
                    <SimpleCard title="Select View">
                        <select
                            value={splitView ? "split" : "inline"}
                            onChange={(e) => setSplitView(e.target.value === "split")}
                            className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-white focus:border-blue-400 outline-none appearance-none"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "right 1rem center",
                                backgroundSize: "1.5em",
                                paddingRight: "2.5rem"
                            }}
                        >
                            <option value="split" className="bg-[#0A0F1C] text-white">Side-by-Side (Split View)</option>
                            <option value="inline" className="bg-[#0A0F1C] text-white">Inline (Unified View)</option>
                        </select>
                    </SimpleCard>
                </div>
                {/* Input Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <SimpleCard title="Input 1">
                        <Textarea value={input1} onChange={(e) => setInput1(e.target.value)} placeholder="Enter text/code..." />
                    </SimpleCard>
                    <SimpleCard title="Input 2">
                        <Textarea value={input2} onChange={(e) => setInput2(e.target.value)} placeholder="Enter text/code..." />
                    </SimpleCard>
                </div>

                <div className="mt-8 max-w-6xl mx-auto">

                    {/* Diff Viewer */}
                    <Card title="Comparison Result">
                        <div className="mt-8 max-w-6xl mx-auto">
                            <DiffViewer
                                oldValue={input1}
                                newValue={input2}
                                splitView={splitView}
                                useDarkTheme
                                renderContent={format !== "text" ? renderSyntaxHighlight : undefined}
                                styles={{
                                    variables: {
                                        dark: {
                                            highlightBackground: '#fefed5',
                                            highlightGutterBackground: '#ffcd3c'
                                        }
                                    },
                                    contentText: { color: "#c5c8c6" },
                                }}
                            />
                        </div>
                    </Card>
                </div>
            </main>
        </div>
    );
}

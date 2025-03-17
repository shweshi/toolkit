"use client";

import { useState } from "react";
import { Globe, Search, AlertTriangle } from "lucide-react";
import Header from "@/components/ui/Header";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Back from "../ui/Back";
import SimpleCard from "../ui/SimpleCard";

export default function OpenGraphMetadataExtractor() {
    const [url, setUrl] = useState("");
    const [ogData, setOgData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchOpenGraph = async () => {
        setError(null);
        setOgData(null);

        if (!url.trim()) {
            setError("Please enter a valid URL.");
            return;
        }

        try {
            const response = await fetch(url); // Fetch HTML content
            const text = await response.text();

            // Extract Open Graph metadata using regex
            const metaTags = text.match(/<meta\s+property="og:([^"]+)"\s+content="([^"]+)"\s*\/?>/gi) || [];

            if (metaTags.length === 0) {
                setError("No Open Graph metadata found.");
                return;
            }

            const metadata: Record<string, string> = {};
            metaTags.forEach((tag) => {
                const match = tag.match(/property="og:([^"]+)"\s+content="([^"]+)"/i);
                if (match) metadata[match[1]] = match[2];
            });

            setOgData(metadata);
        } catch (err) {
            setError("Failed to fetch Open Graph data. CORS might be blocking the request.");
        }
    };

    return (
        <div className="min-h-screen bg-custom-dark text-white">
            <main className="p-6 max-w-6xl mx-auto">
                <Back />
                <Header title="Open Graph Extractor" description="Fetch and view Open Graph metadata from any URL." icon={Globe} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {/* URL Input */}
                    <SimpleCard title="Enter URL">
                        <Input
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://example.com"
                        />
                        <Button onClick={fetchOpenGraph} className="px-6 py-3 mt-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                            <Search /> Extract
                        </Button>
                    </SimpleCard>

                    {/* Output Display */}
                    <SimpleCard title="Metadata Result">
                        <div className="h-[200px] sm:h-[600px] relative">
                            <div className={`rounded-xl border ${error ? "bg-card-dark text-red-400 border-red-400/20" : "bg-card-dark text-green-400 border-green-400/20"}`}>
                                {error && (
                                    <div className="p-4 flex items-center text-red-400">
                                        <AlertTriangle className="mr-2" /> {error}
                                    </div>
                                )}
                                <pre className="p-6 font-mono text-sm whitespace-pre-wrap">{ogData ? JSON.stringify(ogData, null, 2) : ""}</pre>
                            </div>
                        </div>
                    </SimpleCard>
                </div>
            </main>
        </div>
    );
}

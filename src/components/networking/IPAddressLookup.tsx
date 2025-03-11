"use client";

import { useState } from "react";
import { Globe, Search, AlertTriangle } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Header from "@/components/ui/Header";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Back from "../ui/Back";
import SimpleCard from "../ui/SimpleCard";

export default function IPAddressLookup() {
    const [ip, setIp] = useState("");
    const [ipData, setIpData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const lookupIP = async () => {
        setError(null);
        setIpData(null);

        if (!ip.trim()) {
            setError("Please enter a valid IP address.");
            return;
        }

        try {
            const response = await fetch(`https://ipapi.co/${ip}/json/`);
            const data = await response.json();

            if (data.error) {
                setError("Invalid IP address or no data found.");
                return;
            }
            setIpData(JSON.stringify(data, null, 2));
        } catch (err) {
            setError("An error occurred while fetching IP details.");
        }
    };

    return (
        <div className="min-h-screen bg-custom-dark text-white">
            <main className="p-6 max-w-6xl mx-auto">
                <Back />
                <Header title="IP Address Lookup" description="Find details about any IP address, including location and ISP." icon={Globe} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {/* IP Address Input */}
                    <SimpleCard title="Enter IP Address">
                        <div className="h-[200px] sm:h-[600px] relative">
                            <Input
                                value={ip}
                                onChange={(e) => setIp(e.target.value)}
                                placeholder="192.168.1.1"
                            />
                            <Button onClick={lookupIP} className="px-6 py-3 mt-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all flex items-center gap-2">
                                <Search /> Lookup
                            </Button>
                        </div>
                    </SimpleCard>

                    {/* Output Display */}
                    <SimpleCard title="Lookup Result">
                        <div className="h-[200px] sm:h-[600px] relative">
                            <div className={`flex flex-col rounded-xl border ${error ? "bg-card-dark text-red-400 border-red-400/20" : "bg-card-dark text-green-400 border-green-400/20"}`}>
                                {error && (
                                    <div className="p-4 flex items-center text-red-400">
                                        <AlertTriangle className="mr-2" /> {error}
                                    </div>
                                )}
                                <SyntaxHighlighter
                                    language="json"
                                    style={atomDark}
                                    customStyle={{ backgroundColor: "#1e2431", borderRadius: "0.75rem", marginTop: "0rem" }}
                                    className="flex-1 p-6 font-mono text-sm whitespace-pre-wrap"
                                >
                                    {ipData || ""}
                                </SyntaxHighlighter>
                            </div>
                        </div>
                    </SimpleCard>
                </div>
            </main>
        </div>
    );
}

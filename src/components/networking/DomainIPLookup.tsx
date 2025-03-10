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

export default function DomainToIPLookup() {
    const [domain, setDomain] = useState("");
    const [ipData, setIpData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const lookupIP = async () => {
        setError(null);
        setIpData(null);

        if (!domain.trim()) {
            setError("Please enter a valid domain.");
            return;
        }

        try {
            const ipv4Response = await fetch(`https://dns.google/resolve?name=${domain}&type=A`);
            const ipv6Response = await fetch(`https://dns.google/resolve?name=${domain}&type=AAAA`);

            const ipv4Data = await ipv4Response.json();
            const ipv6Data = await ipv6Response.json();

            if (ipv4Data.Status !== 0 && ipv6Data.Status !== 0) {
                setError("Invalid domain or no IP address found.");
                return;
            }

            // Extract IPv4 and IPv6 addresses
            const ipv4Addresses = ipv4Data.Answer ? ipv4Data.Answer.map((a: any) => a.data) : [];
            const ipv6Addresses = ipv6Data.Answer ? ipv6Data.Answer.map((a: any) => a.data) : [];

            setIpData(JSON.stringify({ ipv4: ipv4Addresses, ipv6: ipv6Addresses }, null, 2));
        } catch (err) {
            setError("An error occurred while fetching IP addresses.");
        }
    };

    return (
        <div className="min-h-screen bg-custom-dark text-white">
            <main className="p-6 max-w-6xl mx-auto">
                <Back />
                <Header title="Domain to IP Lookup" description="Find the IP address of any domain name (IPv4 & IPv6)." icon={Globe} />
                <div className="max-w-6xl sm:max-w-3xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-4">
                    {/* Domain Input */}
                    <SimpleCard title="Enter Domain">
                        <div className="h-[150px] sm:h-[150px] relative">
                            <Input
                                value={domain}
                                onChange={(e) => setDomain(e.target.value)}
                                placeholder="example.com"
                            />
                            <Button onClick={lookupIP} className="px-6 py-3 mt-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all flex items-center gap-2">
                                <Search /> Lookup
                            </Button>
                        </div>
                    </SimpleCard>

                    {/* Output Display */}
                    <SimpleCard title="Lookup Result">
                        <div className="h-[200px] sm:h-[200px] relative">
                            <div className={`flex flex-col rounded-xl border h-full ${error ? "bg-card-dark text-red-400 border-red-400/20" : "bg-card-dark text-green-400 border-green-400/20"}`}>
                                {error && (
                                    <div className="p-4 flex items-center text-red-400">
                                        <AlertTriangle className="mr-2" /> {error}
                                    </div>
                                )}
                                <SyntaxHighlighter
                                    language="json"
                                    style={atomDark}
                                    customStyle={{ backgroundColor: "#1e2431", borderRadius: "0.75rem", marginTop: "0rem", height: "100%" }}
                                    className="flex-1 p-6 font-mono text-sm whitespace-pre-wrap"
                                >
                                    {ipData || ""}
                                </SyntaxHighlighter>
                            </div>
                        </div>
                    </SimpleCard>
                </div>
                </div>
            </main>
        </div>
    );
}

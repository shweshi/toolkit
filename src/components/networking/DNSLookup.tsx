"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Header from "@/components/ui/Header";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Back from "../ui/Back";
import SimpleCard from "../ui/SimpleCard";

export default function DNSLookup() {
    const [domain, setDomain] = useState("");
    const [dnsData, setDnsData] = useState<any>(null);
    const [validationResult, setValidationResult] = useState<{ isValid: boolean; message: string }>({
        isValid: false,
        message: "Enter Domain.",
    });
    const [selectedType, setSelectedType] = useState("A");

    // Mapping record types to DNS API values
    const recordTypeMap: Record<string, number> = {
        "A": 1,       // IPv4 address record
        "AAAA": 28,   // IPv6 address record
        "CAA": 257,   // Certification Authority Authorization
        "CNAME": 5,   // Canonical Name record
        "DNAME": 39,  // Delegation Name record
        "NAPTR": 35,  // Naming Authority Pointer
        "SOA": 6,     // Start of Authority
        "TLSA": 52,   // TLS Authentication
        "MX": 15,     // Mail Exchange
        "NS": 2,      // Name Server
        "PTR": 12,    // Pointer record
        "SRV": 33,    // Service Locator
        "TXT": 16,    // Text record
        "ALL": 255,   // Fetch all records
    };

    // DNS Lookup Function
    const lookupDNS = async () => {
        setValidationResult({ isValid: false, message: "" });
        setDnsData(null);

        if (!domain.trim()) {
            setValidationResult({ isValid: false, message: "Please enter a valid domain." });
            return;
        }

        const recordType = recordTypeMap[selectedType] || 255; // Default to ALL if not found
        const apiUrl = `https://dns.google/resolve?name=${domain}&type=${recordType}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.Status !== 0 || !data.Answer) {
                setValidationResult({ isValid: false, message: "Invalid domain or no DNS records found." });
                return;
            }

            setValidationResult({ isValid: true, message: "DNS records fetched successfully." });
            setDnsData(JSON.stringify(data, null, 2)); // Show only the Answer section
        } catch (err: any) {
            setValidationResult({ isValid: false, message: "An error occurred while fetching DNS records." });
        }
    };

    return (
        <div className="min-h-screen bg-custom-dark text-white">
            <main className="p-6 max-w-6xl mx-auto">
                <Back />
                <Header title="DNS Lookup" description="Fetch DNS records like A, AAAA, CNAME, and more." icon={Search} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {/* Input Section */}
                    <SimpleCard title="Domain Lookup">
                        <div className="h-[200px] sm:h-[400px] relative">
                            <Input
                                value={domain}
                                onChange={(e) => setDomain(e.target.value)}
                                placeholder="example.com"
                            />
                            <select
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                                className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-white focus:border-blue-400 outline-none appearance-none mt-4"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "right 1rem center",
                                    backgroundSize: "1.5em",
                                    paddingRight: "2.5rem"
                                  }}
                            >
                                {Object.keys(recordTypeMap).map((type) => (
                                    <option key={type} value={type} className="bg-[#0A0F1C] text-white">
                                        {type}
                                    </option>
                                ))}
                            </select>
                            <Button onClick={lookupDNS} className="px-6 py-3 mt-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all flex items-center gap-2 mt-4">
                                <Search /> Lookup
                            </Button>
                        </div>
                    </SimpleCard>

                    {/* Output Section */}
                    <SimpleCard title="DNS Records">
                        <div className="h-[200px] sm:h-[600px] relative">
                            <div
                                className={`flex flex-col rounded-xl border h-full ${validationResult.isValid
                                    ? "bg-card-dark text-green-400 border-green-400/20"
                                    : "bg-card-dark text-red-400 border-red-400/20"
                                    }`}
                            >
                                <SyntaxHighlighter
                                    language="json"
                                    style={atomDark}
                                    customStyle={{ backgroundColor: "#1e2431", borderRadius: "0.75rem", marginTop: "0rem" }}
                                    className="flex-1 p-6 font-mono text-sm whitespace-pre-wrap"
                                >
                                    {dnsData || validationResult.message}
                                </SyntaxHighlighter>
                            </div>
                        </div>
                    </SimpleCard>
                </div>
            </main>
        </div>
    );
}

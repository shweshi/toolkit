"use client";

import { useState, useEffect } from "react";
import { Globe, Search, AlertTriangle, AlignLeft } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Header from "@/components/ui/Header";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Back from "../ui/Back";
import SimpleCard from "../ui/SimpleCard";
import CardWithoutTitle from "../ui/CardWithoutTitle";

export default function MyIPLookup() {
    const [ipData, setIpData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getMyIP();
    }, []);

    const getMyIP = async () => {
        setError(null);
        setIpData(null);

        try {
            // Get the user's public IP address
            const ipResponse = await fetch("https://api64.ipify.org?format=json");
            const ipResult = await ipResponse.json();
            const userIP = ipResult.ip;
            setIpData(ipResult.ip);
        } catch (err) {
            setError("An error occurred while fetching IP information.");
        }
    };

    return (
        <div className="min-h-screen bg-custom-dark text-white">
            <main className="p-6 max-w-6xl mx-auto">
                <Back />
                <Header title="What's My IP?" description="Find your public IP address and location details." icon={Globe} />
                <main className="p-6 max-w-3xl mx-auto">
                    <SimpleCard>
                        <CardWithoutTitle title="IP" icon={<Globe className="text-blue-400" />}>
                            <p className="text-2xl font-semibold text-blue-400">{ipData}</p>
                        </CardWithoutTitle>
                    </SimpleCard>
                </main>
            </main>
        </div>
    );
}

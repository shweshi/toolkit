"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/ui/Header";
import Tabs from "@/components/ui/Tabs";
import Card from "@/components/ui/Card";
import Textarea from "@/components/ui/Textarea";
import { Link, Link2 } from "lucide-react";
import Back from "../ui/Back";

export default function URLEncoderDecoder() {
    const pathname = usePathname(); // Get current route
    const [textInput, setTextInput] = useState("");
    const [urlOutput, setUrlOutput] = useState("");
    const [validationMessage, setValidationMessage] = useState("");
    const [activeTab, setActiveTab] = useState(0);

    // Set activeTab based on the route when component mounts
    useEffect(() => {
        if (pathname === "/url-decoder") {
            setActiveTab(1);
        } else {
            setActiveTab(0);
        }
    }, [pathname]);

    useEffect(() => {
        if (activeTab === 0) {
            encodeUrl();
        } else {
            decodeUrl();
        }
    }, [textInput, activeTab]);

    const setActiveTabAction = (tabIndex: number) => {
        setActiveTab(tabIndex);
        if (tabIndex === 0) {
            encodeUrl();
        } else {
            decodeUrl();
        }
    };

    const encodeUrl = () => {
        try {
            const encoded = encodeURIComponent(textInput);
            setUrlOutput(encoded);
            setValidationMessage("Valid input. Encoded successfully.");
        } catch (error) {
            setUrlOutput("");
            setValidationMessage("Error encoding input.");
        }
    };

    const decodeUrl = () => {
        try {
            const decoded = decodeURIComponent(textInput);
            setUrlOutput(decoded);
            setValidationMessage("Valid URL. Decoded successfully.");
        } catch (error) {
            setUrlOutput("");
            setValidationMessage("Invalid URL encoding.");
        }
    };

    const tabs = [
        { label: "URL Encoder", icon: <Link />, desc: "Encoded URL" },
        { label: "URL Decoder", icon: <Link2 />, desc: "Decoded URL" }
    ];

    return (
        <div className="min-h-screen bg-custom-dark text-white">
            <main className="p-6 max-w-6xl mx-auto">
                <Back />
                <Header title="URL Encoder & Decoder" description="Convert text to a URL-safe format and decode it back." icon={Link2} />
                <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTabAction} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <Card title="Input URL">
                        <Textarea
                            value={textInput}
                            onChange={(e) => setTextInput(e.target.value)}
                            placeholder={activeTab === 0 ? "Enter text to encode..." : "Enter URL to decode..."}
                        />
                    </Card>
                    <Card title={tabs[activeTab]?.desc || "Output"}>
                        <Textarea value={urlOutput} isReadOnly />
                    </Card>
                </div>
            </main>
        </div>
    );
}

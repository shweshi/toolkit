"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/ui/Header";
import Tabs from "@/components/ui/Tabs";
import Card from "@/components/ui/Card";
import Textarea from "@/components/ui/Textarea";
import { ShieldCheck, Code } from "lucide-react";
import Back from "../ui/Back";

export default function Base64Tool() {
    const pathname = usePathname(); // Get current route
    const [textInput, setTextInput] = useState("");
    const [base64Output, setBase64Output] = useState("");
    const [validationMessage, setValidationMessage] = useState("");
    const [activeTab, setActiveTab] = useState(0);

    // Set activeTab based on the route when component mounts
    useEffect(() => {
        if (pathname === "/base-64-decoder") {
            setActiveTab(1);
        } else {
            setActiveTab(0);
        }
    }, [pathname]);

    useEffect(() => {
        if (activeTab === 0) {
            encodeBase64();
        } else {
            decodeBase64();
        }
    }, [textInput, activeTab]);

    const setActiveTabAction = (tabIndex: number) => {
        setActiveTab(tabIndex);
        if (tabIndex === 0) {
            encodeBase64();
        } else {
            decodeBase64();
        }
    };

    const encodeBase64 = () => {
        try {
            const encoded = btoa(unescape(encodeURIComponent(textInput)));
            setBase64Output(encoded);
            setValidationMessage("Valid input. Encoded successfully.");
        } catch (error) {
            setBase64Output("");
            setValidationMessage("Error encoding input.");
        }
    };

    const decodeBase64 = () => {
        try {
            const decoded = decodeURIComponent(escape(atob(textInput)));
            setBase64Output(decoded);
            setValidationMessage("Valid Base64. Decoded successfully.");
        } catch (error) {
            setBase64Output("");
            setValidationMessage("Invalid Base64 string.");
        }
    };

    const tabs = [
        { label: "Base64 Encoder", icon: <Code />, desc: "Encoded Output" },
        { label: "Base64 Decoder", icon: <ShieldCheck />, desc: "Decoded Output" }
    ];

    return (
        <div className="min-h-screen bg-custom-dark text-white">
            <main className="p-6 max-w-6xl mx-auto">
                <Back />
                <Header title="Base64 Encoder & Decoder" description="Convert text to Base64 and vice versa." icon={ShieldCheck} />
                <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTabAction} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <Card title="Input">
                        <Textarea
                            value={textInput}
                            onChange={(e) => setTextInput(e.target.value)}
                            placeholder={activeTab === 0 ? "Enter text to encode..." : "Enter Base64 to decode..."}
                        />
                    </Card>
                    <Card title={tabs[activeTab]?.desc || "Output"}>
                        <Textarea value={base64Output} isReadOnly />
                    </Card>
                </div>
            </main>
        </div>
    );
}

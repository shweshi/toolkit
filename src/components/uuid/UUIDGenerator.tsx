"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/ui/Header";
import Tabs from "@/components/ui/Tabs";
import Card from "@/components/ui/Card";
import Textarea from "@/components/ui/Textarea";
import { ShieldCheck, Code, Braces, AlertTriangle, CheckCircle } from "lucide-react";
import { v4 as uuidv4, validate as validateUUID } from "uuid";
import Button from "../ui/Button";

export default function UUIDGenerator() {
    const pathname = usePathname();
    const [uuid, setUuid] = useState("");
    const [validationResult, setValidationResult] = useState<{ isValid: boolean; message: string }>({
        isValid: false,
        message: "",
    });
    const [activeTab, setActiveTab] = useState(0);

    // Set activeTab based on route
    useEffect(() => {
        if (pathname === "/uuid-validator") {
            setActiveTab(1);
        } else {
            setActiveTab(0);
            generateUUID(); // Generate UUID only when coming to the generator tab
        }
    }, [pathname]);

    const setActiveTabAction = (tabIndex: number) => {
        setActiveTab(tabIndex);
        if (tabIndex === 0) {
            generateUUID(); // Generate UUID only when switching to Generator tab
        } else {
            setUuid(""); // Clear input for validation
            setValidationResult({ isValid: false, message: "" });
        }
    };

    const generateUUID = () => {
        setUuid(uuidv4());
        setValidationResult({ isValid: true, message: "New UUID v4 generated successfully." });
    };

    const validateInput = () => {
        if (validateUUID(uuid)) {
            setValidationResult({ isValid: true, message: "Valid UUID format." });
        } else {
            setValidationResult({ isValid: false, message: "Invalid UUID format." });
        }
    };

    useEffect(() => {
        if (activeTab === 1) {
            validateInput(); // Validate only when user is on the validation tab
        }
    }, [uuid, activeTab]);

    const tabs = [
        { label: "UUID v4 Generator", icon: <Code />, desc: "Output" },
        { label: "Validate UUID", icon: <ShieldCheck />, desc: "Validation Result" }
    ];

    return (
        <div className="min-h-screen bg-custom-dark text-white">
            <main className="p-6 max-w-6xl mx-auto">
                <Header title="UUID Generator & Validator" description="Generate and validate UUIDs instantly." icon={ShieldCheck} />
                <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTabAction} />
                <div className="flex justify-between mt-4">

                    {
                        activeTab === 1 ? (
                            <><Button onClick={generateUUID} className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all flex items-center gap-2">
                                <Braces /> Generate Sample UUID
                            </Button><Button onClick={validateInput} className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all flex items-center gap-2">
                                    <Braces /> Validate UUID
                                </Button></>
                        ) : (
                            <Button onClick={generateUUID} className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all flex items-center gap-2">
                                <Braces /> Generate UUID
                            </Button>
                        )
                    }
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <Card title="Generated UUID">
                        <Textarea
                            value={uuid}
                            onChange={(e) => setUuid(e.target.value)}
                            placeholder={activeTab === 0 ? "Click to generate a UUID..." : "Enter UUID to validate..."}
                            isReadOnly={activeTab === 0} // Read-only in generator mode
                        />
                    </Card>
                    <Card title={tabs[activeTab]?.desc || "Output"}>
                        <div className="h-[100px] sm:h-[100px] relative">
                            <div
                                className={`rounded-xl border h-[100px] sm:h-[100px] ${validationResult.isValid
                                    ? "bg-card-dark text-green-400 border-green-400/20"
                                    : "bg-card-dark text-red-400 border-red-400/20"
                                    }`}
                            >
                                {validationResult.isValid ? (
                                    <div className="flex inline-block mt-2" ><AlertTriangle className="inline-block ml-2 mr-2" />{validationResult.message}</div>
                                ) : (
                                    <div className="flex inline-block mt-2" ><CheckCircle className="inline-block ml-2 mr-2" />{validationResult.message}</div>
                                )}
                            </div>

                        </div>

                    </Card>
                </div>
            </main>
        </div>
    );
}

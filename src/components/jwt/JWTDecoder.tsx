"use client";

import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { usePathname } from "next/navigation";
import Header from "@/components/ui/Header";
import Tabs from "@/components/ui/Tabs";
import Card from "@/components/ui/Card";
import Textarea from "@/components/ui/Textarea";
import Input from "@/components/ui/Input";
import { ShieldCheck, Code, Braces, AlertTriangle, CheckCircle } from "lucide-react";
import Back from "../ui/Back";
import Button from "../ui/Button";
import { jwtVerify } from "jose";

export default function JWTDecoder() {
    const pathname = usePathname();
    const [jwtInput, setJwtInput] = useState("");
    const [secretKey, setSecretKey] = useState("");
    const [decodedOutput, setDecodedOutput] = useState("");
    const [validationResult, setValidationResult] = useState<{ isValid: boolean; message: string }>({
        isValid: false,
        message: "",
    });
    const [activeTab, setActiveTab] = useState(0);

    const setActiveTabAction = (tabIndex: number) => {
        setActiveTab(tabIndex);
        if (tabIndex === 0) {
            decodeJWT();
        } else {
            validateJWT();
        }
        setDecodedOutput("");
        setValidationResult({ isValid: false, message: "" });
    };

    useEffect(() => {
        if (pathname === "/jwt-decoder") {
            setActiveTab(0);
        } else {
            setActiveTab(1);
        }
    }, []);

    useEffect(() => {
        if (activeTab === 0) {
            decodeJWT();
        } else {
            validateJWT();
        }
    }, [jwtInput, activeTab]);

    // Function to decode JWT
    const decodeJWT = () => {
        try {
            if (!jwtInput.trim()) {
                throw new Error("Invalid JWT");
            }
            const decoded = jwt.decode(jwtInput, { complete: true });

            if (!decoded) {
                throw new Error("Invalid JWT");
            }

            setDecodedOutput(JSON.stringify(decoded, null, 2));
            setValidationResult({ isValid: true, message: "JWT decoded successfully." });
        } catch (error: any) {
            setDecodedOutput("");
            setValidationResult({ isValid: false, message: error.message });
        }
    };

    // Function to validate JWT signature
    const validateJWT = async () => {
        if (!jwtInput.trim()) {
            setValidationResult({ isValid: false, message: "Invalid JWT." });
            return;
        }
        if (!secretKey) {
            setValidationResult({ isValid: false, message: "Enter a secret/public key for validation." });
            return;
        }

        try {
            const secret = new TextEncoder().encode(secretKey);
            const { payload } = await jwtVerify(jwtInput, secret);

            setDecodedOutput(JSON.stringify(payload, null, 2));
            setValidationResult({ isValid: true, message: "JWT is valid. Signature verified." });
        } catch (error) {
            setDecodedOutput("");
            setValidationResult({ isValid: false, message: "Invalid JWT signature." });
        }
    };

    const tabs = [
        { label: "JWT Decoder", icon: <Code />, desc: "Decoded JWT" },
        { label: "JWT Validator", icon: <ShieldCheck />, desc: "Validation Result" }
    ];

    const loadSampleJWT = () => {
        const sample = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiSm9obiBEb2UiLCJpYXQiOjE3NDE1MzkwMTB9.voHgL5XFT0zbKUnAjktHtbjgJ6LSNua-3sfbS670Yj0";
        setJwtInput(sample);
        setSecretKey('mysecretkey')
    };

    return (
        <div className="min-h-screen bg-custom-dark text-white">
            <main className="p-6 max-w-6xl mx-auto">
                <Back />
                <Header title="JWT Decoder & Validator" description="Decode and validate JSON Web Tokens (JWTs)." icon={ShieldCheck} />
                <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTabAction} />
                <div className="flex justify-between mt-4 gap-2">
                    <Button
                        className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-gray-400 hover:text-white backdrop-blur-sm flex items-center gap-2"
                        onClick={loadSampleJWT}
                    >
                        <Braces /> Load Sample JWT
                    </Button>
                    {
                        activeTab === 1 ? (
                            <Button onClick={validateJWT} className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all flex items-center gap-2">
                                <ShieldCheck /> Validate JWT
                            </Button>
                        ) : (
                            <Button onClick={decodeJWT} className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all flex items-center gap-2">
                                <Braces /> Decode JWT
                            </Button>
                        )
                    }
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <Card title="Encoded JWT">
                        {activeTab === 1 && (
                            <Input
                                className="mb-2"
                                value={secretKey}
                                onChange={(e) => setSecretKey(e.target.value)}
                                placeholder="Enter secret/public key..."
                            />
                        )}
                        <Textarea
                            value={jwtInput}
                            onChange={(e) => setJwtInput(e.target.value)}
                            placeholder="Enter JWT..."
                        />
                    </Card>

                    <Card title={tabs[activeTab]?.desc || "Output"}>
                        <div className="h-[200px] sm:h-[600px] relative">
                            <div
                                className={`rounded-xl border h-[200px] sm:h-[600px] ${validationResult.isValid
                                    ? "bg-card-dark text-green-400 border-green-400/20"
                                    : "bg-card-dark text-red-400 border-red-400/20"
                                    }`}
                            >
                                {validationResult.isValid ? (
                                    <div className="flex inline-block mt-2" ><AlertTriangle className="inline-block ml-2 mr-2" />{validationResult.message}</div>
                                ) : (
                                    <div className="flex inline-block mt-2" ><CheckCircle className="inline-block ml-2 mr-2" />{validationResult.message}</div>
                                )}

                                <SyntaxHighlighter
                                    language="json"
                                    style={atomDark}
                                    customStyle={{ backgroundColor: "#1e2431", borderRadius: "0.75rem", marginTop: "0rem" }}
                                    className="p-6 font-mono text-sm whitespace-pre-wrap h-[200px] sm:h-[400px]"
                                >
                                    {String(decodedOutput || "")}
                                </SyntaxHighlighter>
                            </div>
                        </div>
                    </Card>
                </div>
            </main>
        </div>
    );
}

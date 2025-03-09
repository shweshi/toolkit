"use client";

import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import Header from "@/components/ui/Header";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Code, QrCode } from "lucide-react";
import Textarea from "../ui/Textarea";
import Back from "../ui/Back";
import SimpleCard from "../ui/SimpleCard";

export default function QRCodeGenerator() {
    const [textInput, setTextInput] = useState("");
    const [qrData, setQrData] = useState("");

    const generateQRCode = () => {
        if (textInput.trim() !== "") {
            setQrData(textInput);
        }
    };

    return (
        <div className="min-h-screen bg-custom-dark text-white">
            <main className="p-6 max-w-6xl mx-auto">
                <Back />
                <Header title="QR Code Generator" description="Generate a QR Code from any text or URL." icon={Code} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <SimpleCard>
                        <Input
                            value={textInput}
                            onChange={(e) => setTextInput(e.target.value)}
                            placeholder="Enter text or URL..."
                        />
                        <div className="flex justify-center mt-4">
                            <Button onClick={generateQRCode} className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all flex items-center gap-2">
                                <QrCode /> Generate
                            </Button>
                        </div>
                    </SimpleCard>
                    <SimpleCard>
                        {qrData ? (
                            <div className="flex justify-center items-center p-4 bg-white rounded-xl">
                                <QRCodeCanvas
                                    value={qrData}
                                    size={240}
                                    bgColor="#ffffff"  // White background
                                    fgColor="#000000"  // Black QR code
                                    style={{ padding: "10px", borderRadius: "10px" }}
                                />
                            </div>
                        ) : (
                            <div className="flex justify-center items-center p-4 bg-card-dark rounded-xl">
                                <p className="text-gray-400 text-center">QR Code will appear here.</p>
                            </div>

                        )}
                    </SimpleCard>
                </div>
            </main>
        </div>
    );
}

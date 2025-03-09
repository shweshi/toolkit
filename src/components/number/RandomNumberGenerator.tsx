"use client";

import { useState } from "react";
import Header from "@/components/ui/Header";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Braces, Code } from "lucide-react";
import Back from "../ui/Back";

export default function RandomNumberTool() {
    const [minValue, setMinValue] = useState("");
    const [maxValue, setMaxValue] = useState("");
    const [randomNumber, setRandomNumber] = useState("");

    const generateRandomNumber = () => {
        const min = parseInt(minValue, 10);
        const max = parseInt(maxValue, 10);

        if (!isNaN(min) && !isNaN(max) && min <= max) {
            const random = Math.floor(Math.random() * (max - min + 1)) + min;
            setRandomNumber(random.toString());
        } else {
            setRandomNumber("Invalid range");
        }
    };

    return (
        <div className="min-h-screen bg-custom-dark text-white">
            <main className="p-6 max-w-6xl mx-auto">
                <Back />
                <Header
                    title="Random Number Generator"
                    description="Generate a random number between a min and max value."
                    icon={Code}
                />

                <Card title="Generate Random Number">
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            type="number"
                            value={minValue}
                            onChange={(e) => setMinValue(e.target.value)}
                            placeholder="Min value"
                        />
                        <Input
                            type="number"
                            value={maxValue}
                            onChange={(e) => setMaxValue(e.target.value)}
                            placeholder="Max value"
                        />
                    </div>

                    <div className="flex justify-center mt-4">
                        <Button onClick={generateRandomNumber} className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all flex items-center gap-2">
                            <Braces /> Generate
                        </Button>
                    </div>

                    <div className="mt-4 text-center text-lg font-semibold">

                        {randomNumber && <Input
                            type="number"
                            value={randomNumber}
                            readOnly
                            placeholder="Random Number"
                        />}
                    </div>
                </Card>
            </main>
        </div>
    );
}

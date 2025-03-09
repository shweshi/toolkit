"use client";
import ToolCard from "./ToolCard";
import { Code, Text, Search, Braces, Wrench, ShieldCheck, Eye, Shuffle, Barcode, Fingerprint, QrCode, Link, Link2 } from "lucide-react";

const iconMap: Record<string, any> = {
    Braces,
    Code,
    ShieldCheck,
    Eye,
    Shuffle,
    Barcode,
    Fingerprint,
    QrCode,
    Link,
    Link2,
    Text
};

// Tools List Data
interface ToolGridProps {
    tools: { title: string; description: string; href: string; icon: any }[];
}

export default function ToolGrid({ tools }: ToolGridProps) {
    return (
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
            {tools.map((tool) => (
                <ToolCard key={tool.href} title={tool.title} description={tool.description} href={tool.href} icon={iconMap[tool.icon]} />
            ))}
        </div>
    );
}

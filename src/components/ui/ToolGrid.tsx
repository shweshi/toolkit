"use client";
import ToolCard from "./ToolCard";
import { FileText, Globe, Code, Text, Search, Braces, Wrench, ShieldCheck, Eye, Shuffle, Barcode, Fingerprint, QrCode, Link, Link2, Crop } from "lucide-react";

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
    Text,
    Search,
    Globe,
    FileText,
    Crop
};

// Tools List Data
interface ToolGridProps {
    tools: { title: string; description: string; href: string; icon: any }[];
}

export default function ToolGrid({ tools }: ToolGridProps) {
    return (
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
            {tools.map((tool) => (
                <ToolCard key={tool.href} title={tool.title} description={tool.description} href={tool.href} icon={iconMap[tool.icon]} />
            ))}
        </div>
    );
}

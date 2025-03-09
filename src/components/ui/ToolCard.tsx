"use client";
import { LucideIcon, Braces } from "lucide-react";
import Link from "next/link";

interface HeaderProps {
    title: string;
    description: string;
    href: string;
    icon?: LucideIcon; // Accepts any Lucide icon component
}

// Reusable ToolCard Component
export default function ToolCard({ title, description, href, icon: Icon }: HeaderProps) {
    return (
        <Link
            className="p-4 sm:p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-all group text-left border border-white/10 hover:border-white-500"
            href={href}
            data-discover="true"
        >
            <div className="flex items-start gap-4">
                <div className="p-2 sm:p-3 bg-white/5 rounded-xl">
                    {Icon && (<Icon />)}
                </div>
                <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all">
                        {title}
                    </h3>
                    <p className="text-gray-400 mb-4">{description}</p>
                </div>
            </div>
        </Link>
    );
}

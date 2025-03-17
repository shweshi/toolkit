"use client";

import { useState } from "react";
import { Copy, FileText, Info } from "lucide-react";
import Header from "@/components/ui/Header";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Back from "../ui/Back";
import SimpleCard from "../ui/SimpleCard";
import SyntaxHighlighter from "react-syntax-highlighter";
import atomDark from "react-syntax-highlighter/dist/esm/styles/prism/atom-dark";
import Textarea from "../ui/Textarea";

export default function OpenGraphGenerator() {
    const [metaData, setMetaData] = useState({
        title: "",
        description: "",
        url: "",
        image: "",
        domain: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setMetaData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };


    const generatedMetaTags = `
<!-- HTML Meta Tags -->
<title>${metaData.title}</title>
<meta name="description" content="${metaData.description}">

<!-- Facebook Meta Tags -->
<meta property="og:url" content="${metaData.url}">
<meta property="og:type" content="website">
<meta property="og:title" content="${metaData.title}">
<meta property="og:description" content="${metaData.description}">
<meta property="og:image" content="${metaData.image}">

<!-- Twitter Meta Tags -->
<meta name="twitter:card" content="summary_large_image">
<meta property="twitter:domain" content="${metaData.domain}">
<meta property="twitter:url" content="${metaData.url}">
<meta name="twitter:title" content="${metaData.title}">
<meta name="twitter:description" content="${metaData.description}">
<meta name="twitter:image" content="${metaData.image}">

<!-- Meta Tags Generated via Open Graph Generator -->
`.trim();

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedMetaTags);
    };

    return (
        <div className="min-h-screen bg-custom-dark text-white">
            <main className="p-6 max-w-6xl mx-auto">
                <Back />
                <Header
                    title="Open Graph Metadata Generator"
                    description="Generate Open Graph and Twitter meta tags for your webpage."
                    icon={FileText}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {/* Input Fields */}
                    <SimpleCard title="Enter Metadata">
                        <Input
                            name="title"
                            value={metaData.title}
                            onChange={handleChange}
                            placeholder="Title"
                        />
                        <p className="text-xs text-gray-400 flex items-center gap-1 mt-1 mb-2">
                            <Info size={12} /> Recommended: 60 characters ({metaData.title.length})
                        </p>

                        <textarea
                            name="description"
                            value={metaData.description}
                            onChange={handleChange}
                            placeholder="Description"
                            rows={3}
                            className="w-full p-2 border border-gray-700 bg-card-dark rounded-md text-white resize-none"
                        ></textarea>
                        <p className="text-xs text-gray-400 flex items-center gap-1 mt-1 mb-2">
                            <Info size={12} /> Recommended: 155 - 160 characters ({metaData.description.length})
                        </p>

                        <Input
                            name="url"
                            value={metaData.url}
                            onChange={handleChange}
                            placeholder="https://example.com/path"
                            className="my-2"
                        />
                        <Input
                            name="image"
                            value={metaData.image}
                            onChange={handleChange}
                            placeholder="https://example.com/og-image.jpg"
                            className="my-2"
                        />
                        <Input
                            name="domain"
                            value={metaData.domain}
                            onChange={handleChange}
                            placeholder="example.com"
                            className="my-2"
                        />
                    </SimpleCard>

                    {/* Generated Meta Tags */}
                    <SimpleCard title="Generated Meta Tags">
                        <div className="relative bg-card-dark p-4 rounded-xl text-sm font-mono whitespace-pre-wrap border border-gray-700">
                            <SyntaxHighlighter
                                language="html"
                                style={atomDark}
                                customStyle={{
                                    backgroundColor: "#1e2431",
                                    borderRadius: "0.75rem",
                                    marginTop: "0rem",
                                }}
                                className="flex-1 font-mono text-sm whitespace-pre-wrap h-full"
                            >
                                {String(generatedMetaTags || "")}
                            </SyntaxHighlighter>
                            <Button
                                onClick={copyToClipboard}
                                className="absolute top-2 right-2 px-3 py-1 text-xs flex items-center gap-1"
                            >
                                <Copy size={16} /> Copy
                            </Button>
                        </div>
                    </SimpleCard>
                </div>

                {/* Live Open Graph Preview */}
                {metaData.title && (
                    <div className="mt-4">
                        <h2 className="text-lg font-bold mb-2">Live Preview</h2>
                        <div className="bg-card-dark p-4 rounded-lg border border-gray-700 flex gap-4">
                            {
                                metaData.image && (
                                    <img
                                        src={metaData.image}
                                        alt="Preview"
                                        className="w-24 h-24 object-cover rounded-lg"
                                    />
                                )
                            }
                            <div>
                                <p className="text-sm text-gray-400">{metaData.url}</p>
                                <h3 className="text-lg font-bold">{metaData.title}</h3>
                                <p className="text-gray-300">{metaData.description}</p>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

"use client";
import { useState } from "react";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import ToolGrid from "@/components/ui/ToolGrid";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    {
      title: "Image Tools",
      tools: [
        {
          title: "Circle Cropper",
          description:
            "Circle Crop your images effortlessly—upload, adjust, and download in PNG, JPG, or WEBP",
          href: "/circle-image-cropper",
          icon: "Crop",
        },
        {
          title: "Image Blur",
          description:
            "Blur selected parts of an image easily. Draw to blur, then download your result!",
          href: "/image-blur",
          icon: "Image",
        },
      ],
    },
    {
      title: "JSON Tools",
      tools: [
        {
          title: "JSON Tools",
          description:
            "A suite of powerful JSON visualization and formatting tools with multiple export options.",
          href: "/json-tools",
          icon: "Braces",
        },
        {
          title: "JSON Formatter",
          description:
            "Instantly beautify and format your JSON for better readability.",
          href: "/json-formatter",
          icon: "Braces",
        },
        {
          title: "JSON Converter",
          description:
            "Convert JSON into YAML, XML, and CSV formats effortlessly.",
          href: "/json-converter",
          icon: "Code",
        },
        {
          title: "JSON Visualizer",
          description:
            "View JSON data interactively in a structured tree format.",
          href: "/json-visualizer",
          icon: "Eye",
        },
        {
          title: "JSON Validator",
          description:
            "Validate your JSON against industry standards (RFC 8259).",
          href: "/json-validator",
          icon: "ShieldCheck",
        },
      ],
    },
    {
      title: "Encoding & Decoding Tools",
      tools: [
        {
          title: "Base64 Encoder",
          description:
            "Convert text into Base64 encoding quickly and efficiently.",
          href: "/base-64-encoder",
          icon: "Code",
        },
        {
          title: "Base64 Decoder",
          description: "Decode Base64-encoded strings back into readable text.",
          href: "/base-64-decoder",
          icon: "Code",
        },
        {
          title: "URL Encoder",
          description: "Encode URLs to make them safe for transmission.",
          href: "/url-encoder",
          icon: "Link2",
        },
        {
          title: "URL Decoder",
          description: "Decode URLs to restore their original form.",
          href: "/url-decoder",
          icon: "Link",
        },
        {
          title: "QR Code Generator",
          description: "Generate QR Codes for any text, URL, or data.",
          href: "/qr-code-generator",
          icon: "QrCode",
        },
      ],
    },
    {
      title: "Security Tools",
      tools: [
        {
          title: "JWT Decoder",
          description: "Decode JSON Web Tokens (JWT) to view their claims.",
          href: "/jwt-decoder",
          icon: "ShieldCheck",
        },
        {
          title: "JWT Validator",
          description: "Verify and validate JWT signatures securely.",
          href: "/jwt-validator",
          icon: "ShieldCheck",
        },
      ],
    },
    {
      title: "Utility Tools",
      tools: [
        {
          title: "UUID Generator",
          description:
            "Generate unique UUIDs (v4) instantly for your applications.",
          href: "/uuid-generator",
          icon: "Fingerprint",
        },
        {
          title: "UUID Validator",
          description: "Check if a given string is a valid UUID.",
          href: "/uuid-validator",
          icon: "Barcode",
        },
        {
          title: "Random Number Generator",
          description:
            "Generate a random number between a specified min and max range.",
          href: "/random-number-generator",
          icon: "Shuffle",
        },
        {
          title: "Word & Character Counter",
          description:
            "Count words, characters, sentences, and paragraphs in real-time.",
          href: "/character-counter",
          icon: "Text",
        },
        {
          title: "Diff Checker",
          description: "Compare text, JSON, and code side by side.",
          href: "/diff-checker",
          icon: "FileText",
        },
      ],
    },
    {
      title: "Networking Tools",
      tools: [
        {
          title: "DNS Lookup",
          description: "Fetch DNS records like A, AAAA, CNAME, and more.",
          href: "/dns-lookup",
          icon: "Search",
        },
        {
          title: "IP Address Lookup",
          description:
            "Find details about any IP address, including location and ISP.",
          href: "/ip-address-lookup",
          icon: "Globe",
        },
        {
          title: "Domain IP Lookup",
          description:
            "Find details about any domain address, including IP, location and ISP.",
          href: "/domain-ip-lookup",
          icon: "Globe",
        },
        {
          title: "What's My IP?",
          description: "Find your public IP address and location details.",
          href: "/what-is-my-ip",
          icon: "Globe",
        },
      ],
    },
    {
      title: "SEO Tools",
      tools: [
        {
          title: "Open Graph Metadata Generator",
          description: "Generate Open Graph data for the URL page.",
          href: "/open-graph-metadata-generator",
          icon: "FileText",
        },
      ],
    },
  ];

  const filteredCategories = categories
    .map((category) => ({
      ...category,
      tools: category.tools.filter(
        (tool) =>
          tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tool.description.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((category) => category.tools.length > 0);

  return (
    <div>
      <main className="min-h-screen bg-custom-dark text-white pt-8 sm:py-20 p-4">
        <div className="max-w-6xl mx-auto px-2 sm:px-4">
          <div className="flex items-center gap-3 mb-4 sm:mb-6 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">🛠️ Toolkit</h1>
              <p className="text-lg text-gray-400">
                A collection of powerful online developer tools for JSON, JWT,
                QR codes, Base64, UUIDs, and more.
              </p>
              <p className="text-lg text-gray-400">
                Fast, secure, and privacy-friendly.
              </p>
            </div>
          </div>
          <div className="max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="relative">
              <input
                placeholder="Search tools..."
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl  focus:outline-none focus:border-blue-500 transition-colors"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {filteredCategories.map((category) => (
            <div key={category.title} className="mt-16">
              <Header title={category.title} />
              <ToolGrid tools={category.tools} />
            </div>
          ))}
        </div>
        <Footer />
      </main>
    </div>
  );
}

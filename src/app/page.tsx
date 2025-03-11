import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import ToolGrid from "@/components/ui/ToolGrid";
import { Code, Search, Braces, Wrench, ShieldCheck, Image } from "lucide-react";

export const metadata = {
  title: "Online Developer Tools - JSON Formatter, JWT Decoder & More",
  description:
    "A collection of powerful online developer tools for JSON, JWT, QR codes, Base64, UUIDs, and more. Fast, secure, and privacy-friendly.",
  openGraph: {
    title: "Online Developer Tools - JSON Formatter, JWT Decoder & More",
    description:
      "A collection of powerful online developer tools for JSON, JWT, QR codes, Base64, UUIDs, and more.",
    url: "https://shashi.dev/toolkit",
    siteName: "Developer Tools",
    images: [
      {
        url: "https://shashi.dev/toolkit/og-image.png", // Update with your actual image URL
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Developer Tools - JSON Formatter, JWT Decoder & More",
    description:
      "A collection of powerful online developer tools for JSON, JWT, QR codes, Base64, UUIDs, and more.",
    images: ["https://shashi.dev/toolkit/og-image.png"],
  },
};

export default function Home() {
  // Tools List Data
  const categories = {
    imageTools: [
      { title: "Circle Cropper", description: "Circle Crop your images effortlessly—upload, adjust, and download in PNG, JPG, or WEBP", href: "/circle-image-cropper", icon: "Crop" }
    ],

    jsonTools: [
      { title: "JSON Tools", description: "A suite of powerful JSON visualization and formatting tools with multiple export options.", href: "/json-tools", icon: "Braces" },
      { title: "JSON Formatter", description: "Instantly beautify and format your JSON for better readability.", href: "/json-formatter", icon: "Braces" },
      { title: "JSON Converter", description: "Convert JSON into YAML, XML, and CSV formats effortlessly.", href: "/json-converter", icon: "Code" },
      { title: "JSON Visualizer", description: "View JSON data interactively in a structured tree format.", href: "/json-visualizer", icon: "Eye" },
      { title: "JSON Validator", description: "Validate your JSON against industry standards (RFC 8259).", href: "/json-validator", icon: "ShieldCheck" }
    ],

    encodingDecodingTools: [
      { title: "Base64 Encoder", description: "Convert text into Base64 encoding quickly and efficiently.", href: "/base-64-encoder", icon: "Code" },
      { title: "Base64 Decoder", description: "Decode Base64-encoded strings back into readable text.", href: "/base-64-decoder", icon: "Code" },
      { title: "URL Encoder", description: "Encode URLs to make them safe for transmission.", href: "/url-encoder", icon: "Link2" },
      { title: "URL Decoder", description: "Decode URLs to restore their original form.", href: "/url-decoder", icon: "Link" },
      { title: "QR Code Generator", description: "Generate QR Codes for any text, URL, or data.", href: "/qr-code-generator", icon: "QrCode" }
    ],

    securityTools: [
      { title: "JWT Decoder", description: "Decode JSON Web Tokens (JWT) to view their claims.", href: "/jwt-decoder", icon: "ShieldCheck" },
      { title: "JWT Validator", description: "Verify and validate JWT signatures securely.", href: "/jwt-validator", icon: "ShieldCheck" }
    ],

    utilityTools: [
      { title: "UUID Generator", description: "Generate unique UUIDs (v4) instantly for your applications.", href: "/uuid-generator", icon: "Fingerprint" },
      { title: "UUID Validator", description: "Check if a given string is a valid UUID.", href: "/uuid-validator", icon: "Barcode" },
      { title: "Random Number Generator", description: "Generate a random number between a specified min and max range.", href: "/random-number-generator", icon: "Shuffle" },
      { title: "Word & Character Counter", description: "Count words, characters, sentences, and paragraphs in real-time.", href: "/character-counter", icon: "Text" },
      { title: "Diff Checker", description: "Compare text, JSON, and code side by side.", href: "/diff-checker", icon: "FileText" },
    ],

    networkingTools: [
      { title: "DNS Lookup", description: "Fetch DNS records like A, AAAA, CNAME, and more.", href: "/dns-lookup", icon: "Search" },
      { title: "IP Address Lookup", description: "Find details about any IP address, including location and ISP.", href: "/ip-address-lookup", icon: "Globe" },
      { title: "Domain IP Lookup", description: "Find details about any domain address, including IP, location and ISP.", href: "/domain-ip-lookup", icon: "Globe" },
      { title: "What's My IP?", description: "Find your public IP address and location details.", href: "/what-is-my-ip", icon: "Globe" }
    ],
  };


  return (
    <div>
      <main className="min-h-screen bg-custom-dark text-white pt-8 sm:py-20 p-4">
        <div className="max-w-6xl mx-auto px-2 sm:px-4">
          <div className="flex items-center gap-3 mb-4 sm:mb-6 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">
                Developer Tools
              </h1>
              <p className="text-xl text-gray-400">Streamline your app development workflow with our specialized tools.</p>
            </div>
          </div>
          <div className="max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="relative">
              {/* <Search size={20} color="#63a4fa" /> */}
              <input
                placeholder="Search tools..."
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl  focus:outline-none focus:border-blue-500 transition-colors"
                type="text"
                value=""
                readOnly
              />

            </div>
          </div>
          <div className="mt-8">
            <Header title="Image Tools" description="Powerful JSON visualization and formatting tools." icon={Image} />
            <ToolGrid tools={categories.imageTools} />
          </div>

          <div className="mt-8">
            <Header title="JSON Tools" description="Powerful JSON visualization and formatting tools." icon={Braces} />
            <ToolGrid tools={categories.jsonTools} />
          </div>

          <div className="mt-16">
            <Header title="Encoding & Decoding Tools" description="Quickly encode and decode Base64, URLs, and QR Codes." icon={Code} />
            <ToolGrid tools={categories.encodingDecodingTools} />
          </div>

          <div className="mt-16">
            <Header title="Security Tools" description="Validate and decode JWT tokens securely." icon={ShieldCheck} />
            <ToolGrid tools={categories.securityTools} />
          </div>

          <div className="mt-16">
            <Header title="Utility Tools" description="Generate UUIDs, count words, and generate random numbers." icon={Wrench} />
            <ToolGrid tools={categories.utilityTools} />
          </div>

          <div className="mt-16">
            <Header title="Networking Tools" description="DNS Lookup." icon={Wrench} />
            <ToolGrid tools={categories.networkingTools} />
          </div>

        </div>
        <Footer />

      </main>
    </div>

  );
}

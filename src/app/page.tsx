import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import ToolGrid from "@/components/ui/ToolGrid";
import { Code, Search, Braces, Wrench, ShieldCheck } from "lucide-react";

export default function Home() {
  // Tools List Data
  const jsontools = [
    { title: "JSON Tools", description: "Powerful JSON visualization and formatting tools with multiple export options.", href: "/json-tools", icon: 'Braces' },
    { title: "JSON Formatter", description: "Format and beautify your JSON instantly.", href: "/json-formatter", icon: 'Braces' },
    { title: "JSON Converter", description: "Convert JSON to YAML, XML, and CSV formats.", href: "/json-converter", icon: 'Code' },
    { title: "JSON Visualizer", description: "View JSON data in an interactive tree structure.", href: "/json-visualizer", icon: 'Eye' },
    { title: "JSON Validator", description: "Validate JSON against RFC 8259 standards.", href: "/json-validator", icon: 'ShieldCheck' },
  ];

  const othertools = [
    { title: "Base 64 Encoder", description: "Convert text into Base64 encoding quickly and efficiently.", href: "/base-64-encoder", icon: 'Code' },
    { title: "Base 64 Decoder", description: "Decode Base64-encoded strings back into readable text.", href: "/base-64-decoder", icon: 'Code' },
    { title: "UUID Generator", description: "Generate unique UUIDs (v4) instantly for your applications.", href: "/uuid-generator", icon: 'Fingerprint' },
    { title: "UUID Validator", description: "Check if a given string is a valid UUID.", href: "/uuid-validator", icon: 'Barcode' },
    { title: "Random Number Generator", description: "Generate a random number between a specified min and max range.", href: "/random-number-generator", icon: 'Shuffle' }
  ];

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
            <Header title="JSON Tools" description="Powerful JSON visualization and formatting tools." icon={Braces} />
            <ToolGrid tools={jsontools} />
          </div>
          <div className="mt-16">
            <Header title="Other Tools" description="Some other useful tools." icon={Wrench} />
            <ToolGrid tools={othertools} />
          </div>
        </div>
        <Footer />

      </main>
    </div>

  );
}

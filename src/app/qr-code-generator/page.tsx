import QRCodeGenerator from "@/components/qr/QRCodeGenerator";

export const metadata = {
  title: "QR Code Generator - Generate QR Codes Online",
  description: "Generate QR Codes for any text, URL, or data.",
  openGraph: {
    title: "QR Code Generator - Generate QR Codes Online",
    description: "Generate QR Codes for any text, URL, or data.",
    url: "https://shashi.dev/toolkit/qr-code-generator",
  },
};

export default function QRCodeGeneratorPage() {
  return <QRCodeGenerator />;
}
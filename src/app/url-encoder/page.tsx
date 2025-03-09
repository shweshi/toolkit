import URLEncoderDecoder from "@/components/url/URLEncoderDecoder";

export const metadata = {
  title: "URL Encoder - Convert URLs for Safe Transmission",
  description: "Encode URLs to make them safe for transmission.",
  openGraph: {
    title: "URL Encoder - Convert URLs for Safe Transmission",
    description: "Encode URLs to make them safe for transmission.",
    url: "https://shashi.dev/toolkit/url-encoder",
  },
};

export default function URLEncoderDecoderPage() {
  return <URLEncoderDecoder />;
}
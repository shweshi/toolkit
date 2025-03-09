import URLEncoderDecoder from "@/components/url/URLEncoderDecoder";

export const metadata = {
  title: "URL Decoder - Decode URL Encoded Strings",
  description: "Decode URLs to restore their original form.",
  openGraph: {
    title: "URL Decoder - Decode URL Encoded Strings",
    description: "Decode URLs to restore their original form.",
    url: "https://shashi.dev/toolkit/url-decoder",
  },
};

export default function URLEncoderDecoderPage() {
  return <URLEncoderDecoder />;
}
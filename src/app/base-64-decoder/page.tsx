import Base64Tools from "@/components/base-64/Base64Tools";

export const metadata = {
  title: "Base64 Decoder - Decode Base64 to Text",
  description: "Decode Base64-encoded strings back into readable text.",
  openGraph: {
    title: "Base64 Decoder - Decode Base64 to Text",
    description: "Decode Base64-encoded strings back into readable text.",
    url: "https://shashi.dev/toolkit/base-64-decoder",
  },
};

export default function Base64Encoder() {
  return <Base64Tools />;
}
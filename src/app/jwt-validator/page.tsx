import JWTDecoder from "@/components/jwt/JWTDecoder";

export const metadata = {
  title: "JWT Validator - Validate JWT Signatures",
  description: "Verify and validate JWT signatures securely.",
  openGraph: {
    title: "JWT Validator - Validate JWT Signatures",
    description: "Verify and validate JWT signatures securely.",
    url: "https://shashi.dev/toolkit/jwt-validator",
  },
};

export default function JWTDecoderPage() {
  return <JWTDecoder />;
}
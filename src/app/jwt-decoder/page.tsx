import JWTDecoder from "@/components/jwt/JWTDecoder";

export const metadata = {
  title: "JWT Decoder - Decode JSON Web Tokens",
  description: "Decode JSON Web Tokens (JWT) to view their claims.",
  openGraph: {
    title: "JWT Decoder - Decode JSON Web Tokens",
    description: "Decode JSON Web Tokens (JWT) to view their claims.",
    url: "https://shashi.dev/toolkit/jwt-decoder",
  },
};

export default function JWTDecoderPage() {
  return <JWTDecoder />;
}
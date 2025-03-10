import MyIPLookup from "@/components/networking/MyIPLookup";

export const metadata = {
  title: "What's My IP?",
  description: "Find your public IP address and location details.",
  openGraph: {
    title: "What's My IP?",
    description: "Find your public IP address and location details.",
    url: "https://shashi.dev/toolkit/what-is-my-ip",
  },
};

export default function MyIPLookupPage() {
  return <MyIPLookup />;
}
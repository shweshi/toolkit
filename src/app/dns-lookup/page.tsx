import DNSLookup from "@/components/networking/DNSLookup";

export const metadata = {
  title: "DNS Lookup",
  description: "Fetch DNS records like A, AAAA, CNAME, and more.",
  openGraph: {
    title: "DNS Lookup",
    description: "Fetch DNS records like A, AAAA, CNAME, and more.",
    url: "https://shashi.dev/toolkit/dns-lookup",
  },
};

export default function DNSLookupPage() {
  return <DNSLookup />;
}
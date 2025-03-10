import DomainIPLookup from "@/components/networking/DomainIPLookup";

export const metadata = {
  title: "IP Address Lookup",
  description: "Find details about any IP address, including location and ISP.",
  openGraph: {
    title: "IP Address Lookup",
    description: "Find details about any IP address, including location and ISP.",
    url: "https://shashi.dev/toolkit/ip-address-lookup",
  },
};

export default function DomainIPLookupPage() {
  return <DomainIPLookup />;
}
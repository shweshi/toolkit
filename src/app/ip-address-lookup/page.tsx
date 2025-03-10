import IPAddressLookup from "@/components/networking/IPAddressLookup";

export const metadata = {
  title: "IP Address Lookup",
  description: "Find details about any IP address, including location and ISP.",
  openGraph: {
    title: "IP Address Lookup",
    description: "Find details about any IP address, including location and ISP.",
    url: "https://shashi.dev/toolkit/ip-address-lookup",
  },
};

export default function IPAddressLookupPage() {
  return <IPAddressLookup />;
}
import RandomNumberGenerator from "@/components/number/RandomNumberGenerator";

export const metadata = {
  title: "Random Number Generator - Generate Random Numbers",
  description: "Generate a random number between a specified min and max range.",
  openGraph: {
    title: "Random Number Generator - Generate Random Numbers",
    description: "Generate a random number between a specified min and max range.",
    url: "https://shashi.dev/toolkit/random-number-generator",
  },
};

export default function RandomNumberGeneratorPage() {
  return <RandomNumberGenerator />;
}

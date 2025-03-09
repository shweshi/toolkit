import CharacterCounter from "@/components/text/CharacterCounter";

export const metadata = {
  title: "Word & Character Counter",
  description: "Count words, characters, sentences, and paragraphs in real-time.",
  openGraph: {
    title: "Word & Character Counter",
    description: "Count words, characters, sentences, and paragraphs in real-time.",
    url: "https://shashi.dev/toolkit/character-counter",
  },
};

export default function CharacterCounterPage() {
  return <CharacterCounter />;
}
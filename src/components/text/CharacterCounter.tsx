"use client";

import { useState } from "react";
import Header from "@/components/ui/Header";
import Card from "@/components/ui/Card";
import Textarea from "@/components/ui/Textarea";
import { FileText, Timer, List, AlignLeft, TypeOutline, Book } from "lucide-react";
import Back from "@/components/ui/Back";
import CardWithoutTitle from "../ui/CardWithoutTitle";

export default function CharacterCounter() {
    const [text, setText] = useState("");

    const countWords = (str: string) => {
        return str.trim().length > 0 ? str.trim().split(/\s+/).length : 0;
    };

    const countCharacters = (str: string) => str.length;

    const countCharactersWithoutSpaces = (str: string) => str.replace(/\s/g, "").length;

    const countSentences = (str: string) => {
        return str.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length;
    };

    const countParagraphs = (str: string) => {
        return str.split(/\n+/).filter(para => para.trim().length > 0).length;
    };

    const readingTime = (str: string) => {
        const words = countWords(str);
        return Math.max(1, Math.round(words / 200)); // 200 WPM reading speed
    };

    return (
        <div className="min-h-screen bg-custom-dark text-white">
            <main className="p-6 max-w-6xl mx-auto">
                <Back />
                <Header title="Character Counter" description="Analyze the text for word and character count." icon={FileText} />

                <div className="grid grid-cols-1 gap-4 mt-4">
                    <Textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Start typing..."
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4 mt-4">
                    <CardWithoutTitle title="Characters" icon={<TypeOutline className="text-blue-400" />}>
                        <p className="text-2xl font-semibold text-blue-400">{countCharacters(text)}</p>
                    </CardWithoutTitle>
                    <CardWithoutTitle title="Without Spaces" icon={<TypeOutline className="text-blue-400" />}>
                        <p className="text-2xl font-semibold text-blue-400">{countCharactersWithoutSpaces(text)}</p>
                    </CardWithoutTitle>
                    <CardWithoutTitle title="Words" icon={<TypeOutline className="text-blue-400" />}>
                        <p className="text-2xl font-semibold text-blue-400">{countWords(text)}</p>
                    </CardWithoutTitle>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4 mt-4">
                    <CardWithoutTitle title="Sentences" icon={<AlignLeft className="text-blue-400" />}>
                        <p className="text-2xl font-semibold text-blue-400">{countSentences(text)}</p>
                    </CardWithoutTitle>
                    <CardWithoutTitle title="Paragraphs" icon={<Book className="text-blue-400" />}>
                        <p className="text-2xl font-semibold text-blue-400">{countParagraphs(text)}</p>
                    </CardWithoutTitle>
                    <CardWithoutTitle title="Reading Time" icon={<Timer className="text-blue-400" />}>
                        <div className="flex items-center gap-2">
                            <p className="text-2xl font-semibold text-blue-400">{readingTime(text)} min</p>
                        </div>
                    </CardWithoutTitle>
                </div>
            </main>
        </div>
    );
}

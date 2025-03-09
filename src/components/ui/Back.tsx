import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Back() {
    return (
        <Link className="mb-2 sm:mb-4 flex items-center gap-2 text-gray-400 hover:text-white transition-colors" href="/"><ArrowLeft /><span className="sm:inline hidden">Back to Home</span></Link>
    );
}

import { LucideIcon, Braces, ArrowLeft } from "lucide-react";

interface HeaderProps {
    title: string;
    description?: string;
    icon?: LucideIcon; // Accepts any Lucide icon component
}

export default function Header({ title, description, icon: Icon }: HeaderProps) {
    return (
        <header className="flex items-center gap-3 sm:gap-6 mb-8">
            <div className="p-2 sm:p-3 bg-white/5 rounded-xl">
                {Icon ? <Icon color="#63a4fa" /> : <Braces color="#63a4fa" />}
            </div>
            <div>
                <h1 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">{title}</h1>
                {description && <p className="text-sm sm:text-base text-gray-400">{description}</p>}

                {/* <div className="flex flex-wrap gap-4 text-xs text-gray-400 mt-2"><span className="flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-4 h-4 text-green-400"><path d="M20 6 9 17l-5-5"></path></svg> Free Online Tool</span><span className="flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-4 h-4 text-green-400"><path d="M20 6 9 17l-5-5"></path></svg> No Registration Required</span><span className="flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-4 h-4 text-green-400"><path d="M20 6 9 17l-5-5"></path></svg> Multiple Format Support</span><span className="flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-4 h-4 text-green-400"><path d="M20 6 9 17l-5-5"></path></svg> Instant Results</span></div> */}
            </div>
        </header>
    );
}

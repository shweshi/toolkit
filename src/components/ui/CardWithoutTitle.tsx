import { ReactNode } from "react";

interface CardProps {
    title: string;
    icon?: ReactNode;
    children: ReactNode;
}

export default function CardWithoutTitle({ title, icon, children }: CardProps) {
    return (
        <div className="bg-card-dark p-4 rounded-xl border border-white/10">
            <div className="flex justify-between">
                <div className="flex items-center gap-2 mb-2 text-gray-300">
                    {icon && <span className="text-blue-400">{icon}</span>}
                    <h3 className="text-lg font-semibold">{title}</h3>
                </div>
                <div>{children}</div>
            </div>
        </div>
    );
}

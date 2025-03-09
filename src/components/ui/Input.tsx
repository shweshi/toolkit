"use client";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Input({ className = "", ...props }: InputProps) {
    return (
        <input
            className={`w-full px-4 py-3 bg-white/5 rounded-xl text-sm text-white border border-white/10 focus:border-blue-500 focus:outline-none transition-colors ${className}`}
            {...props}
        />
    );
}

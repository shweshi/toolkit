export default function Badge({ text, className }: { text: string, className?: string }) {
    return <span className={`px-3 py-1 rounded-md text-sm ${className}`}>{text}</span>;
  }
  
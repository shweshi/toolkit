export default function Textarea({ 
  value, 
  onChange, 
  placeholder, 
  isReadOnly 
}: { 
  value: string | undefined, 
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void, 
  placeholder?: string, 
  isReadOnly?: boolean 
}) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      readOnly={isReadOnly}  // Apply the readOnly attribute
      className="w-full min-h-[200px] md:h-full p-4 bg-white/5 rounded-xl font-mono text-sm resize-none border border-white/10 focus:border-blue-500 focus:outline-none transition-colors"
    />
  );
}

export default function Card({ title, children }: { title?: string, children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center justify-between bg-white/5 p-4 rounded-xl border-white/10 mb-2">
        {title && <h2 className="text-lg font-medium text-gray-300 flex items-center gap-2">{title}</h2>}
      </div>
      {children}
    </div>
  );
}

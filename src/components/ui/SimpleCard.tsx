export default function Card({ title, children }: { title?: string, children: React.ReactNode }) {
    return (
      <div>
        {children}
      </div>
    );
  }
  
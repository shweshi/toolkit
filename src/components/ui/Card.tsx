import { Download, Upload } from "lucide-react";
import Button from "./Button";

type ButtonConfig = {
  icon: React.ReactNode;
  onClick: () => void;
};

export default function Card({
  title,
  children,
  buttons, // Prop to dynamically pass buttons
}: {
  title?: string;
  children: React.ReactNode;
  buttons?: ButtonConfig[]; // Array of button configurations
}) {
  return (
    <div>
      <div className="flex items-center justify-between bg-white/5 p-4 rounded-xl border-white/10 mb-2">
        {title && <h2 className="text-lg font-medium text-gray-300 flex items-center gap-2">{title}</h2>}
        <div className="flex flex-row items-center justify-center gap-2">
          {buttons?.map((button, index) => (
            <Button
              key={index}
              className="px-2 py-0"
              onClick={button.onClick} // Invoke the corresponding function
            >
              {button.icon}
            </Button>
          ))}
        </div>
      </div>
      {children}
    </div>
  );
}

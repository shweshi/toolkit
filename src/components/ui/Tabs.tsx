"use client";

import { ReactNode } from "react";

interface Tab {
  label: string;
  icon?: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: number; // 🔥 Pass activeTab from parent
  onTabChange: (index: number) => void;
}

export default function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
  return (
    <div className="flex flex-wrap justify-center md:justify-start gap-2 sm:gap-4 p-1.5 bg-white/5 backdrop-blur-lg rounded-2xl w-full md:w-fit border border-white/10">
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`w-full md:w-fit px-6 py-3 rounded-xl flex items-center gap-2 ${
            activeTab === index
              ? "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all text-white"
              : "text-gray-400 hover:text-gray-200 transition"
          }`}
          onClick={() => onTabChange(index)} // 🔥 Controlled by parent
        >
          {tab.icon && <span>{tab.icon}</span>}
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}

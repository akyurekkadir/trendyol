import React, { useState, useEffect } from 'react';
import { Wifi, BatteryMedium, Search } from 'lucide-react';

export default function MenuBar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString("tr-TR", {
        hour: '2-digit', minute: '2-digit'
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-7 w-full bg-black/40 backdrop-blur-md border-b border-black/50 flex items-center justify-between px-4 text-[13px] font-medium text-white/90 select-none z-[9999] absolute top-0 left-0 shadow-sm transition-colors">
      {/* Left side */}
      <div className="flex items-center gap-4">
        {/* Apple Logo Placeholder - Using text icon or simple SVG */}
        <span className="text-sm"></span>
        <span className="font-bold cursor-pointer">Finder</span>
        <span className="cursor-pointer">File</span>
        <span className="cursor-pointer">Edit</span>
        <span className="cursor-pointer">View</span>
        <span className="cursor-pointer">Go</span>
        <span className="cursor-pointer">Window</span>
        <span className="cursor-pointer">Help</span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <Wifi size={14} className="cursor-pointer" />
        <Search size={14} className="cursor-pointer" />
        {/* Control Center Icon */}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
        </svg>
        <BatteryMedium size={16} className="cursor-pointer" />
        <span className="cursor-default">{time}</span>
      </div>
    </div>
  );
}

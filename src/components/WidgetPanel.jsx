import React, { useState, useEffect } from 'react';

export default function WidgetPanel() {
  const [time, setTime] = useState("");
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const dayName = now.toLocaleDateString('tr-TR', { weekday: 'long' });
      const dateStr = now.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' });

      setTime(timeStr);
      setFormattedDate(`${dayName}, ${dateStr}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute left-6 top-16 z-0 flex flex-col gap-4 animate-fade-in select-none">
      
      {/* Clock & Date Widget - Dark Mode styled */}
      <div className="bg-black/50 backdrop-blur-xl border border-white/10 shadow-2xl rounded-[2rem] p-6 w-[280px] text-white">
        <h2 className="text-4xl font-extralight tracking-tight mb-1">{time}</h2>
        <p className="text-[#FF6600] font-medium text-lg">{formattedDate}</p>
      </div>

    </div>
  );
}

import React, { useState } from 'react';
import { useWindowManager } from '../context/WindowManager';

export default function Launchpad() {
  const { isLaunchpadOpen, setIsLaunchpadOpen, appsConfig, openWindow } = useWindowManager();
  const [searchValue, setSearchValue] = useState("");

  if (!isLaunchpadOpen) return null;

  // Filter out launchpad itself
  const apps = Object.values(appsConfig).filter(a => a.id !== 'launchpad');
  
  const filteredApps = apps.filter(app => app.name.toLowerCase().includes(searchValue.toLowerCase()));

  const handleAppClick = (appId) => {
    setIsLaunchpadOpen(false);
    openWindow(appId);
  };

  return (
    <div 
      className="fixed inset-0 z-[9000] bg-black/40 backdrop-blur-2xl animate-fade-in flex flex-col items-center pt-20 select-none"
      onClick={() => setIsLaunchpadOpen(false)}
    >
      {/* Search Bar */}
      <div 
        className="w-full max-w-sm mb-16 relative"
        onClick={e => e.stopPropagation()}
      >
        <input 
          type="text" 
          placeholder="Search" 
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full bg-black/20 text-white placeholder-gray-400 font-medium px-4 py-1.5 rounded-lg border border-white/20 focus:outline-none focus:border-white/40 text-center focus:text-left transition-all backdrop-blur-md"
          autoFocus
        />
      </div>

      {/* App Grid */}
      <div 
        className="grid grid-cols-5 md:grid-cols-7 gap-x-8 gap-y-12 max-w-5xl px-8"
        onClick={e => e.stopPropagation()}
      >
        {filteredApps.map(app => (
          <div 
            key={app.id} 
            className="flex flex-col items-center gap-2 cursor-pointer group"
            onClick={() => handleAppClick(app.id)}
          >
            <div className="w-20 h-20 md:w-24 md:h-24 transition-transform duration-200 group-hover:scale-110 active:scale-95">
              {app.id === 'trendyol' ? (
                <div className="w-full h-full rounded-3xl bg-[#FF6600] flex items-center justify-center shadow-lg border border-white/20">
                  <span className="text-white text-3xl font-bold">t</span>
                </div>
              ) : app.id === 'settings' ? (
                <div className="w-full h-full rounded-3xl bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center shadow-lg border border-white/20">
                  <span className="text-white text-3xl font-bold">⚙</span>
                </div>
              ) : (
                <img src={app.iconUrl} alt={app.name} className="w-full h-full object-contain filter drop-shadow-xl" />
              )}
            </div>
            <span className="text-white text-sm font-medium tracking-wide shadow-black drop-shadow-md">
              {app.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

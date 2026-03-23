import { useState } from "react";
import { useWindowManager } from "../context/WindowManager";
import { Settings, ShoppingBag, LayoutGrid, FileText, Users, FolderOpen } from "lucide-react";

export default function DockItem({ app }) {
  const [isHovered, setIsHovered] = useState(false);
  const { openWindow, windows, setIsLaunchpadOpen } = useWindowManager();

  const isOpen = windows.some(w => w.id === app.id);

  return (
    <div className="relative group flex flex-col items-center justify-end h-full">
      {/* Tooltip */}
      {isHovered && (
        <div className="absolute -top-10 px-3 py-1 bg-gray-800/90 text-white text-xs rounded-lg shadow-lg whitespace-nowrap animate-fade-in pointer-events-none z-50">
          {app.name}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800/90 rotate-45"></div>
        </div>
      )}
      
      {/* Icon Button using Image or custom component */}
      <button
        onClick={() => {
          if (app.id === 'launchpad') {
             setIsLaunchpadOpen(prev => !prev);
          } else {
             openWindow(app.id);
          }
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`w-10 h-10 flex items-center justify-center transition-all duration-200 ease-out origin-bottom 
          hover:w-12 hover:h-12 hover:-translate-y-2 active:scale-95 drop-shadow-xl`}
      >
        {app.id === 'trendyol' ? (
           <div className="w-full h-full rounded-2xl bg-[#FF6600] flex items-center justify-center shadow-inner border border-white/20">
             <ShoppingBag className="text-white w-6 h-6" strokeWidth={2.5} />
           </div>
        ) : app.id === 'settings' ? (
           <div className="w-full h-full rounded-2xl bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center shadow-inner border border-white/20">
             <Settings className="text-white w-7 h-7" strokeWidth={2} />
           </div>
        ) : app.id === 'launchpad' ? (
           <div className="w-full h-full rounded-2xl bg-gradient-to-br from-gray-200 to-gray-400 flex items-center justify-center shadow-inner border border-white/40">
             <LayoutGrid className="text-gray-700 w-6 h-6" strokeWidth={2} />
           </div>
        ) : app.id === 'resume' ? (
           <div className="w-full h-full rounded-2xl bg-gradient-to-br from-blue-300 to-blue-500 flex items-center justify-center shadow-inner border border-white/40">
             <FileText className="text-white w-6 h-6" strokeWidth={2} />
           </div>
        ) : app.id === 'contacts' ? (
           <div className="w-full h-full rounded-2xl bg-gradient-to-br from-orange-300 to-orange-500 flex items-center justify-center shadow-inner border border-white/40">
             <Users className="text-white w-6 h-6" strokeWidth={2} />
           </div>
        ) : app.id === 'projects' ? (
           <div className="w-full h-full rounded-2xl bg-gradient-to-br from-cyan-300 to-blue-400 flex items-center justify-center shadow-inner border border-white/40">
             <FolderOpen className="text-white w-6 h-6" fill="currentColor" strokeWidth={1.5} />
           </div>
        ) : (
          <img src={app.iconUrl} alt={app.name} className="w-full h-full object-contain filter drop-shadow-sm" />
        )}
      </button>
      
      {/* Activity dot indicator */}
      <div className={`w-1 h-1 bg-black/40 rounded-full mt-1 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`}></div>
    </div>
  );
}

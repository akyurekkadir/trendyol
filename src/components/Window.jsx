import { Rnd } from 'react-rnd';
import { useWindowManager } from '../context/WindowManager';
import { Minus, Square, X } from 'lucide-react';

export default function Window({ windowData, children }) {
  const { id, app, zIndex, isMinimized, isMaximized } = windowData;
  const { closeWindow, toggleMinimize, toggleMaximize, focusWindow, activeWindowId } = useWindowManager();

  const isActive = activeWindowId === id;

  if (isMinimized) return null;

  const handlePointerDown = () => {
    focusWindow(id);
  };

  // Standard window style when not maximized
  let rndConfig = {
    default: {
      x: window.innerWidth / 2 - app.defWidth / 2 + (Math.random() * 40 - 20),
      y: window.innerHeight / 2 - app.defHeight / 2 + (Math.random() * 40 - 20),
      width: app.defWidth,
      height: app.defHeight,
    },
    minWidth: 300,
    minHeight: 200,
    bounds: "parent",
    dragHandleClassName: "window-drag-handle",
    onMouseDown: handlePointerDown,
    style: { zIndex }
  };

  // Adjust props if maximized (take full screen minus some margin or dock space)
  const renderWindowFrame = () => (
    <div 
      className={`flex flex-col w-full h-full bg-gray-900 border border-white/20 rounded-xl overflow-hidden shadow-2xl transition-shadow ${isActive ? 'shadow-black/30' : 'shadow-black/10'}`}
      onClick={handlePointerDown}
    >
      {/* Title Bar */}
      <div 
        className={`window-drag-handle h-12 flex items-center px-4 shrink-0 transition-colors ${isActive ? 'bg-gray-800/90' : 'bg-gray-800/50'} backdrop-blur-md border-b border-black/50`}
        onDoubleClick={() => toggleMaximize(id)}
      >
        {/* Mac OS Traffic Lights */}
        <div className="flex gap-2 relative z-10 group">
          <button 
            onClick={(e) => { e.stopPropagation(); closeWindow(id); }}
            className="w-3.5 h-3.5 rounded-full bg-red-500 flex items-center justify-center border border-red-600/50 hover:bg-red-600"
          >
            <X size={10} className="text-red-900 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); toggleMinimize(id); }}
            className="w-3.5 h-3.5 rounded-full bg-yellow-500 flex items-center justify-center border border-yellow-600/50 hover:bg-yellow-600"
          >
            <Minus size={10} className="text-yellow-900 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); toggleMaximize(id); }}
            className="w-3.5 h-3.5 rounded-full bg-green-500 flex items-center justify-center border border-green-600/50 hover:bg-green-600"
          >
            <Square size={8} className="text-green-900 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
        
        {/* Title */}
        <div className="absolute left-0 w-full flex justify-center pointer-events-none">
          <span className={`text-sm font-semibold flex items-center gap-2 ${isActive ? 'text-white' : 'text-gray-400'}`}>
            {app.icon} {app.name}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-gray-900 overflow-auto relative">
        {/* Overlay to block iframe events when dragging or inactive - mostly for later if needed */}
        {!isActive && <div className="absolute inset-0 z-10" />}
        {children}
      </div>
    </div>
  );

  if (isMaximized) {
    return (
      <div 
        className="absolute inset-0 md:top-7 md:bottom-24" // Avoid menu bar and dock approximately
        style={{ zIndex, position: 'absolute' }}
      >
        {renderWindowFrame()}
      </div>
    );
  }

  return (
    <Rnd {...rndConfig}>
      {renderWindowFrame()}
    </Rnd>
  );
}

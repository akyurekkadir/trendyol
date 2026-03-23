import { createContext, useState, useContext } from 'react';

const WindowContext = createContext();

export function WindowProvider({ children }) {
  // apps configurations using reliable high-res macOS 3D icon URLs
  const appsConfig = {
    launchpad: { id: 'launchpad', name: 'Launchpad', iconUrl: 'https://img.icons8.com/color/480/launchpad.png', defWidth: 0, defHeight: 0 },
    finder: { id: 'finder', name: 'Finder', iconUrl: 'https://img.icons8.com/color/480/mac-os.png', defWidth: 700, defHeight: 500 },
    resume: { id: 'resume', name: 'Resume', iconUrl: 'https://img.icons8.com/fluency/240/document.png', defWidth: 800, defHeight: 900 },
    contacts: { id: 'contacts', name: 'Contacts', iconUrl: 'https://img.icons8.com/color/480/contacts.png', defWidth: 700, defHeight: 500 },
    safari: { id: 'safari', name: 'Safari', iconUrl: 'https://img.icons8.com/color/480/safari--v1.png', defWidth: 800, defHeight: 600 },
    appstore: { id: 'appstore', name: 'App Store', iconUrl: 'https://img.icons8.com/fluency/240/apple-app-store.png', defWidth: 800, defHeight: 600 },
    projects: { id: 'projects', name: 'Projects', iconUrl: 'https://img.icons8.com/nolan/512/mac-folder.png', defWidth: 900, defHeight: 600 },
    terminal: { id: 'terminal', name: 'Terminal', iconUrl: 'https://img.icons8.com/color/480/console.png', defWidth: 600, defHeight: 400 },
    trendyol: { id: 'trendyol', name: 'Trendyol', iconUrl: 'https://img.icons8.com/color/480/online-store.png', defWidth: 900, defHeight: 700 },
    settings: { id: 'settings', name: 'Settings', iconUrl: 'https://img.icons8.com/color/480/mac-client.png', defWidth: 600, defHeight: 500 },
  };

  const [windows, setWindows] = useState([]);
  const [isLaunchpadOpen, setIsLaunchpadOpen] = useState(false);
  const [activeWindowId, setActiveWindowId] = useState(null);
  const [highestZIndex, setHighestZIndex] = useState(10);

  const openWindow = (appId) => {
    // If window already open, just focus it and unminimize it
    const existingWindow = windows.find(w => w.id === appId);

    if (existingWindow) {
      setWindows(prev => prev.map(w =>
        w.id === appId ? { ...w, isMinimized: false } : w
      ));
      focusWindow(appId);
      return;
    }

    // Open new window
    const newZIndex = highestZIndex + 1;
    setHighestZIndex(newZIndex);

    setWindows(prev => [...prev, {
      id: appId,
      app: appsConfig[appId],
      zIndex: newZIndex,
      isMinimized: false,
      isMaximized: appId === 'trendyol', // Trendyol automatically opens in full screen
    }]);

    setActiveWindowId(appId);
  };

  const closeWindow = (appId) => {
    setWindows(prev => prev.filter(w => w.id !== appId));
    if (activeWindowId === appId) {
      setActiveWindowId(null);
    }
  };

  const toggleMinimize = (appId) => {
    setWindows(prev => prev.map(w =>
      w.id === appId ? { ...w, isMinimized: !w.isMinimized } : w
    ));
    // If minimizing the active window, remove focus
    if (activeWindowId === appId) {
      setActiveWindowId(null);
    }
  };

  const toggleMaximize = (appId) => {
    setWindows(prev => prev.map(w =>
      w.id === appId ? { ...w, isMaximized: !w.isMaximized } : w
    ));
    focusWindow(appId);
  };

  const focusWindow = (appId) => {
    if (activeWindowId === appId) return;

    const newZIndex = highestZIndex + 1;
    setHighestZIndex(newZIndex);

    setWindows(prev => prev.map(w =>
      w.id === appId ? { ...w, zIndex: newZIndex } : w
    ));
    setActiveWindowId(appId);
  };

  return (
    <WindowContext.Provider value={{
      windows,
      appsConfig,
      activeWindowId,
      openWindow,
      closeWindow,
      toggleMinimize,
      toggleMaximize,
      focusWindow,
      isLaunchpadOpen,
      setIsLaunchpadOpen
    }}>
      {children}
    </WindowContext.Provider>
  );
}

export const useWindowManager = () => useContext(WindowContext);

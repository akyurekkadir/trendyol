import Desktop from "./components/Desktop";
import Dock from "./components/Dock";
import Window from "./components/Window";
import { WindowProvider, useWindowManager } from "./context/WindowManager";
import Finder from "./apps/Finder";
import Projects from "./apps/Projects";
import Terminal from "./apps/Terminal";
import Trendyol from "./apps/Trendyol";
import Resume from "./apps/Resume";
import Contacts from "./apps/Contacts";
import Launchpad from "./components/Launchpad";
import "./index.css";

function AppContent() {
  const { windows } = useWindowManager();

  const renderAppContent = (appId) => {
    switch (appId) {
      case 'finder': return <Finder />;
      case 'projects': return <Projects />;
      case 'terminal': return <Terminal />;
      case 'trendyol': return <Trendyol />;
      case 'resume': return <Resume />;
      case 'contacts': return <Contacts />;
      default: return null;
    }
  };

  return (
    <Desktop>
      {windows.map(win => (
        <Window key={win.id} windowData={win}>
          {renderAppContent(win.id)}
        </Window>
      ))}
      <Dock />
      <Launchpad />
    </Desktop>
  );
}

function App() {
  return (
    <WindowProvider>
      <AppContent />
    </WindowProvider>
  );
}

export default App;

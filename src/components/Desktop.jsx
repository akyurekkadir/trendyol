import MenuBar from "./MenuBar";
import WidgetPanel from "./WidgetPanel";

export default function Desktop({ children }) {
  return (
    <div
      className="w-full h-screen overflow-hidden relative bg-gray-900"
      style={{
        backgroundImage: `url('/wallpaper.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Dark overlay to ensure dark mode feel */}
      <div className="absolute inset-0 bg-black/30 pointer-events-none z-0"></div>
      <MenuBar />
      
      <WidgetPanel />
      {children}
    </div>
  );
}

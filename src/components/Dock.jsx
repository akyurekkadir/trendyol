import DockItem from "./DockItem";
import { useWindowManager } from "../context/WindowManager";

export default function Dock() {
  const { appsConfig } = useWindowManager();
  
  // Convert context config to array for mapping
  const apps = Object.values(appsConfig).map(app => {
    let color = "";
    if (app.id === "finder") color = "bg-blue-300";
    else if (app.id === "safari") color = "bg-blue-400 text-white";
    else if (app.id === "messages") color = "bg-green-500 text-white";
    else if (app.id === "appstore") color = "bg-blue-600 text-white";
    else if (app.id === "terminal") color = "bg-gray-800 text-white";
    else if (app.id === "trendyol") color = "bg-orange-500 text-white";
    else if (app.id === "settings") color = "bg-gray-300";
    return { ...app, color };
  });

  return (
    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 px-2.5 rounded-2xl bg-black/40 backdrop-blur-2xl border border-white/10 shadow-2xl flex items-end gap-1.5 h-15 pb-1 z-[8000]">
      {apps.map((app) => (
        <DockItem key={app.id} app={app} />
      ))}
    </div>
  );
}

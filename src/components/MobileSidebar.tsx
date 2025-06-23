import React from "react";
import {
  Home,
  HelpCircle,
  Notifications,
  CheckList,
  Cloud,
  Settings,
} from "../icons/Icons";

const MobileSidebar = () => {
  const menuItems = [
    { icon: <Home />, label: "Home", active: false },
    { icon: <Notifications />, label: "Alerts", active: true },
    { icon: <CheckList />, label: "Tasks", active: false },
    { icon: <Cloud />, label: "Cloud", active: false },
    { icon: <Settings />, label: "Settings", active: false },
  ];

  return (
    <div className="w-full h-full py-5 z-100 flex flex-col justify-between items-center">
      <nav className="w-full flex flex-col justify-center items-center space-y-6">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`w-[80%] flex items-center gap-3 px-3 py-2 text-sm transition-colors duration-200 ${
              item.active
                ? "text-white bg-bg_primary_light border border-border_primary rounded-lg"
                : "text-[#858882] border border-transparent rounded-lg"
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <button className="w-[80%] flex items-center gap-3 px-3 py-2 text-sm text-gray-400 hover:text-gray-300 transition-colors duration-200">
        <HelpCircle />
        <span>Help</span>
      </button>
    </div>
  );
};

export default MobileSidebar;

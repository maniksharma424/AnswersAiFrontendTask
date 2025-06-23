import React, { useState, useRef, useEffect } from "react";
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
    { icon: <Home />, label: "Home" },
    { icon: <Notifications />, label: "Alerts" },
    { icon: <CheckList />, label: "Tasks" },
    { icon: <Cloud />, label: "Cloud" },
    { icon: <Settings />, label: "Settings" },
  ];

  const [activeIndex, setActiveIndex] = useState(1);
  const navRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ top: 0, height: 0 });

  useEffect(() => {
    if (navRef.current) {
      const buttons = navRef.current.querySelectorAll("button");
      const activeButton = buttons[activeIndex] as HTMLElement;

      if (activeButton) {
        setIndicatorStyle({
          top: activeButton.offsetTop,
          height: activeButton.offsetHeight,
        });
      }
    }
  }, [activeIndex]);

  return (
    <div className="w-full h-full py-5 z-100 flex flex-col justify-between items-center">
      <nav
        ref={navRef}
        className="w-full relative flex flex-col items-center space-y-6"
      >
        {/* Sliding background */}
        <div
          className="absolute left-[10%] w-[80%] rounded-lg bg-bg_primary_light border border-border_primary transition-all duration-300 z-0"
          style={{ top: indicatorStyle.top, height: indicatorStyle.height }}
        />

        {/* Nav Buttons */}
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`relative z-10 w-[80%] flex items-center gap-3 px-3 py-2 text-sm transition-colors duration-200   ${
              activeIndex === index ? "text-white" : "text-[#858882]"
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

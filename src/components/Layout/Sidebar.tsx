import React, { useState, useRef, useEffect } from "react";
import {
  Home,
  Burger,
  HelpCircle,
  Notifications,
  CheckList,
  Cloud,
  Settings,
} from "../../icons/Icons";

const Sidebar: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(1); // Default active item
  const navRef = useRef<HTMLDivElement>(null);
  const [indicatorTop, setIndicatorTop] = useState(0);

  const menuItems = [
    <Home />,
    <Notifications />,
    <CheckList />,
    <Cloud />,
    <Settings />,
  ];

  useEffect(() => {
    if (navRef.current) {
      const buttons = navRef.current.querySelectorAll("button");
      const activeButton = buttons[activeIndex];
      if (activeButton) {
        setIndicatorTop((activeButton as HTMLElement).offsetTop-28);
      }
    }
  }, [activeIndex]);

  return (
    <div className="flex flex-col justify-between items-center w-full h-full py-8">
      <nav
        ref={navRef}
        className="relative h-fit w-full flex flex-col justify-center items-center space-y-7"
      >
        <Burger />

        {/* Active sliding indicator */}
        <div
          className="absolute left-1/2 -translate-x-1/2 w-[44px] h-[44px] rounded-xl bg-bg_primary_light border border-border_primary transition-all duration-300 z-0"
          style={{ top: `${indicatorTop}px` }}
        />

        {/* Icon Buttons */}
        {menuItems.map((icon, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`relative z-10 w-[44px] h-[44px] flex items-center justify-center transition-colors  duration-100 active:scale-95 ${
              activeIndex === index
                ? "text-white"
                : "text-[#858882] hover:text-white"
            }`}
          >
            {icon}
          </button>
        ))}
      </nav>

      <button className="w-full p-2 flex items-center justify-center text-gray-400 hover:text-gray-300 transition-colors duration-200">
        <HelpCircle />
      </button>
    </div>
  );
};

export default Sidebar;

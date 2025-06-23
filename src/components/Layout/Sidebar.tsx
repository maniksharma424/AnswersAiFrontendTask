import React from "react";
import {
  Home,
  Burger,
  HelpCircle,
  Notifications,
  CheckList,
  Cloud,
  Settings,
} from "../../icons/Icons";

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className = "" }) => {
  const menuItems = [
    { icon: <Home />, active: false },
    { icon: <Notifications />, active: true },
    { icon: <CheckList />, active: false },
    { icon: <Cloud />, active: false },
    { icon: <Settings />, active: false },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      className={`  ${className}  justify-between  items-center  h-full py-5`}
    >
      <nav className="h-fit w-full flex flex-col justify-center items-center space-y-8  ">
        <Burger />
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={` p-1.5 flex items-center justify-center transition-colors duration-200 ${
              item.active
                ? " text-white bg-bg_primary_light border border-border_primary rounded-lg"
                : "border border-transparent rounded-lg text-[#858882]"
            }`}
          >
            {item?.icon}
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

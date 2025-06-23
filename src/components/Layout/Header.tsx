import React, { useEffect, useRef, useState } from "react";
import { Search, Burger, CrossSm } from "../../icons/Icons";

import MobileSidebar from "../MobileSidebar";

const Header: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const tabs = ["Charging Stations", "Fleet Sizing", "Parking"];
  const navRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    if (navRef.current) {
      const buttons = navRef.current.querySelectorAll("button");
      const activeButton = buttons[activeIndex] as HTMLElement;

      if (activeButton) {
        setIndicatorStyle({
          left: activeButton.offsetLeft,
          width: activeButton.offsetWidth,
        });
      }
    }
  }, [activeIndex]);

  return (
    <>
      <header className="sm:px-6 sm:py-5 px-4 py-3 text-base font-normal text-white relative">
        <div className="flex items-center justify-between">
          {/* Left section: Burger or Tab */}
          <div className="flex items-center space-x-6">
            {/* Mobile view: Burger or Active Tab Toggle */}
            {!isSearchOpen && (
              <div className="md:hidden flex items-center space-x-3">
                <button onClick={() => setSidebarOpen(true)}>
                  <Burger />
                </button>
              </div>
            )}

            {/* Desktop Nav */}
            <nav
              ref={navRef}
              className="md:flex hidden relative items-center space-x-1 font-robert"
            >
              {/* Sliding background */}
              <div
                className="absolute h-full top-0 rounded-lg bg-bg_primary border border-border_primary transition-all duration-300"
                style={{
                  left: indicatorStyle.left,
                  width: indicatorStyle.width,
                }}
              />

              {/* Tab Buttons */}
              {tabs.map((tab, index) => (
                <button
                  key={tab}
                  onClick={() => setActiveIndex(index)}
                  className={`relative z-10 px-4 py-2 rounded-lg leading-5 transition-colors duration-200  active:scale-95  ${
                    activeIndex === index
                      ? "text-white"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Right section: Search */}
          <div className="flex items-center space-x-4 sm:w-fit w-full">
            {/* Desktop Search */}
            {!isSearchOpen && (
              <div className="hidden md:flex items-center relative bg-bg_primary/30 border border-border_primary px-4 py-2 rounded-lg">
                <Search />
                <input
                  type="text"
                  placeholder="Search"
                  className="ml-2 text-sm font-medium bg-transparent focus:outline-none placeholder:text-white"
                />
              </div>
            )}

            {/* Mobile Search Toggle */}
            <div className="md:hidden flex justify-end items-center w-full ">
              {isSearchOpen ? (
                <div className="flex items-center   rounded-lg transition-all duration-300 justify-start  w-full">
                  <Search />
                  <input
                    type="text"
                    autoFocus
                    placeholder="Search"
                    className="ml-2 text-sm font-medium bg-transparent focus:outline-none placeholder:text-white flex-1"
                  />
                  <button onClick={() => setSearchOpen(false)}>
                    <CrossSm />
                  </button>
                </div>
              ) : (
                <button onClick={() => setSearchOpen(true)}>
                  <Search />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-[250px] bg-bg_primary shadow-lg transform transition-transform duration-300 z-40 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <MobileSidebar />
      </div>

      {/* Backdrop when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default Header;

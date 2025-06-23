import React, { useState } from "react";
import { Search, Cross, Burger, CrossSm } from "../../icons/Icons";
import Sidebar from "../Layout/Sidebar";

const Header: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Charging Stations");

  const tabs = ["Charging Stations", "Fleet Sizing", "Parking"];

  return (
    <>
      <header className="sm:px-6 sm:py-5 px-4 py-3 text-base font-normal text-white relative z-50">
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
            <nav className="md:flex hidden items-center space-x-1 font-robert">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg leading-5 transition-colors duration-200 border ${
                    activeTab === tab
                      ? "bg-bg_primary border-border_primary"
                      : "border-transparent hover:bg-white/10"
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
        <div className="flex justify-end p-4">
          <button onClick={() => setSidebarOpen(false)}>
            <Cross />
          </button>
        </div>
        <Sidebar />
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

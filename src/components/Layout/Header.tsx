import React from "react";
import { Search } from "../../icons/Icons";

const Header: React.FC = () => {
  return (
    <header className=" px-6 py-5 text-base font-normal text-white ">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <nav className="flex items-center space-x-1">
            <button className="px-4 py-2 bg-bg_primary  rounded-lg border border-border_primary  leading-5">
              Charging Stations
            </button>
            <button className="px-4 py-2  leading-5    transition-colors duration-200">
              Fleet Sizing
            </button>
            <button className="px-4 py-2 leading-5     transition-colors duration-200">
              Parking
            </button>
          </nav>
        </div>

        <div className="flex items-center space-x-4 relative bg-bg_primary/30 border border-border_primary px-4 py-2  rounded-lg">
          <div className="">
            <Search />
          </div>
          <input
            type="text"
            placeholder="Search"
            className=" text-sm font-medium  bg-transparent focus:outline-none placeholder:text-white"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;

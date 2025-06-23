import React from "react";
import { Zap, Refresh, Upload, MoveHorzontal, Plus } from "../../icons/Icons";
import { useAppContext } from "../../provider/appProvider";
import Button from "../Button";
const DashboardHeader = () => {
  const { toggleVariablePanel } = useAppContext();
  return (
    <div className="flex items-center justify-between ">
      <div className="flex items-center space-x-3">
        <Zap />
        <h1 className="text-2xl font-bold text-white font-robert">Charging Station</h1>
      </div>

      <div className="flex items-center space-x-3">
        <Button>
          <Refresh />
        </Button>
        <Button onClick={toggleVariablePanel} className=" px-4 py-2">
          Edit Variables
        </Button>

        <Button>
          <Upload />
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;

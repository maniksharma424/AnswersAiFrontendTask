import React from "react";

import ChartVisualization from "../components/Dashboard/ChartVisualization";
import KPICard from "../components/Dashboard/KPICard";
import ScenarioResults from "../components/Dashboard/ScenarioResults";
import { Zap, Refresh, Upload, MoveHorzontal, Plus } from "../icons/Icons";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import Button from "../components/Button";
const Dashboard: React.FC = () => {
  const kpiData = [
    {
      title: "Infrastructure Units",
      value: "€421.07",
      description: "This describes variable two and what the shown data means.",
    },
    {
      title: "Charging Growth",
      value: "33.07",
      description: "This describes variable two and what the shown data means.",
    },
    {
      title: "Localization change",
      value: "21.9%",
      description: "This describes variable two and what the shown data means.",
    },
    {
      title: "Fleet growth",
      value: "7.03%",
      description: "This describes variable two and what the shown data means.",
    },
  ];

  return (
    <div className="flex-1 sm:p-6 p-4 space-y-8 overflow-y-auto sm:border-l border-t border-border_primary sm:rounded-tl-md bg-bg_primary flex flex-col">
      <DashboardHeader />

      <ScenarioResults />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 flex-1">
        {/* Chart Section */}
        <div className="xl:col-span-3  space-y-4 h-full flex flex-col">
          <h3 className="text-2xl leading-5 font-semibold text-white font-robert">
            Graphs
          </h3>
          <div className=" flex-1 w-full">
            <ChartVisualization />
          </div>
        </div>

        {/* KPI Section */}
        <div className="space-y-4 xl:col-span-2  flex flex-col">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl leading-5 font-semibold text-white font-robert">
              Key Performance Indicators
            </h3>
            <Button iconRight={<Plus />} className=" text-sm bg-transparent py-1">Variables</Button>
          </div>

          <div className="gap-4 grid grid-cols-2 flex-1">
            {kpiData.map((kpi, index) => (
              <KPICard
                key={index}
                title={kpi.title}
                value={kpi.value}
                description={kpi.description}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

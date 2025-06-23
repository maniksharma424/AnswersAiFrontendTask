import React from "react";

import ChartVisualization from "../components/Dashboard/ChartVisualization";
import KPICard from "../components/Dashboard/KPICard";
import ScenarioResults from "../components/Dashboard/ScenarioResults";
import { Plus } from "../icons/Icons";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import Button from "../components/Button";
import { kpiData } from "../constants";
import Sidebar from "../components/Layout/Sidebar";
import Header from "../components/Layout/Header";
import { VariablePanel } from "../components/VariablePanel/VariablePanel";
const Dashboard: React.FC = () => {
  return (
    <div div className=" w-full h-full flex">
      <Sidebar className="w-20 sm:block hidden h-full" />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1 flex">
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
                  <Button
                    iconRight={<Plus />}
                    className=" text-sm bg-transparent py-1"
                  >
                    Variables
                  </Button>
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
        </main>
      </div>

      <VariablePanel />
    </div>
  );
};

export default Dashboard;

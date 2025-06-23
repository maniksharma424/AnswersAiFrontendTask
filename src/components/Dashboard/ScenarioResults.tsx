import React from "react";
import { AIStars, Chevrron, MoveHorzontal } from "../../icons/Icons";
const ScenarioResults: React.FC = () => {
  const results = [
    {
      text: "The best found configuration based on profit is characterized by 11 zones (max) with charging stations and 48 total number of poles.",
    },
    {
      text: "The best found configuration based on satisfied demand is characterized by 11 zones (max) with charging stations and 48 total number of poles.",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-text_secondary">
          <AIStars />
          <h2 className="  text-xl font-semibold ">Best Scenario Results</h2>
        </div>
        <button className=" border border-text_primary rounded-[20px] p-2 px-3">
          <Chevrron />
        </button>
      </div>

      <div className="space-y-3">
        {results.map((result, index) => (
          <div
            key={index}
            className="border-[0.5px] border-text_primary text-text_primary rounded-lg bg-[#CCFF0005]  p-3 flex items-center justify-between px-4 font-normal"
          >
            <p className="leading-relaxed flex-1">{result.text}</p>
            <button className="ml-4 p-1  rounded transition-colors duration-200">
              <MoveHorzontal />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScenarioResults;

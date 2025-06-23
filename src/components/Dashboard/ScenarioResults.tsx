import React, { useState } from "react";
import { AIStars, Chevrron, MoveHorzontal } from "../../icons/Icons";
import useIsMobile from "../../hooks/useIsmobile";
import { results } from "../../constants";

const ScenarioResults: React.FC = () => {
  const iseMobile = useIsMobile();
  const [isExpanded, setIsExpanded] = useState(iseMobile ? false : true);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-text_secondary">
          <AIStars />
          <h2 className="text-xl font-semibold font-robert">
            Best Scenario Results
          </h2>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => {
            if (!iseMobile) return;
            setIsExpanded(!isExpanded);
          }}
          className="border border-text_primary rounded-[20px] p-1 px-2 transition-transform duration-300"
        >
          <div
            className={`transition-transform duration-300 ${
              isExpanded ? "rotate-0" : "rotate-180"
            }`}
          >
            <Chevrron />
          </div>
        </button>
      </div>

      {/* Results List */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          isExpanded
            ? "opacity-100 max-h-[1000px] scale-100"
            : "opacity-0 max-h-0 scale-95 overflow-hidden"
        } space-y-3`}
      >
        {results.map((result, index) => (
          <div
            key={index}
            className="border-[0.5px] border-text_primary text-text_primary rounded-lg bg-[#CCFF0005] p-2 flex items-center justify-between px-4 font-normal md:text-sm text-xs"
          >
            <p className="leading-relaxed flex-1">{result.text}</p>
            <button className="ml-4 p-1 rounded transition-colors duration-200">
              <MoveHorzontal />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScenarioResults;

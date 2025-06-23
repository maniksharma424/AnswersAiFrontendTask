import React from "react";
import { QuestionMark } from "../../icons/Icons";

interface KPICardProps {
  title: string;
  value: string;
  description: string;
}

const KPICard: React.FC<KPICardProps> = ({ title, value, description }) => {
  return (
    <div className=" p-4 bg-bg_primary_light border border-border_primary rounded-md flex flex-col justify-between items-end">
      <div className="">
        <div className="flex items-start justify-between">
          <div className=" space-y-2">
            <h3 className="text-base font-medium text-white  leading-none">{title}</h3>
            <p className="text-xs text-[#BBBBBB] leading-relaxed">
              {description}
            </p>
          </div>
            <QuestionMark />
        </div>
      </div>

      <div className="text-3xl font-bold text-white mb-2 font-robert">{value}</div>
    </div>
  );
};

export default KPICard;

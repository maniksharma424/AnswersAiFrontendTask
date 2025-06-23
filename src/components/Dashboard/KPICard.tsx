import React from "react";
import { QuestionMark } from "../../icons/Icons";

interface KPICardProps {
  title: string;
  value: string;
  description: string;
}

const KPICard: React.FC<KPICardProps> = ({ title, value, description }) => {
  return (
    <div className=" sm:p-4 p-3 bg-bg_primary_light border border-border_primary rounded-md flex flex-col justify-between md:items-end items-start gap-2">
      <div className="w-full">
        <div className="flex w-ful items-start justify-between relative">
          <div className=" space-y-2">
            <h3 className="text-base font-medium text-white  leading-none">
              {title}
            </h3>
            <p className="text-xs text-[#BBBBBB] leading-relaxed">
              {description}
            </p>
          </div>
          <span className=" absolute right-0">
            <QuestionMark />
          </span>
        </div>
      </div>

      <div className="sm:text-3xl text-2xl font-bold text-white mb-2 font-robert">
        {value}
      </div>
    </div>
  );
};

export default KPICard;

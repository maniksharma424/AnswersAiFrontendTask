import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface VariableSectionProps {
  title: string;
}

const VariableSection: React.FC<VariableSectionProps> = ({ title }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border border-gray-700 rounded-lg">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-800/50 transition-colors duration-200"
      >
        <span className="text-sm font-medium text-gray-300">{title}</span>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-gray-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400" />
        )}
      </button>
      
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-gray-700">
          <p className="text-sm text-gray-400 mt-3">
            Variable configuration options will be displayed here.
          </p>
        </div>
      )}
    </div>
  );
};

export default VariableSection;
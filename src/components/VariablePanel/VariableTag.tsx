import React from "react";
import { X } from "lucide-react";
import { useAppStore, Variable } from "../../provider/appProvider";

interface VariableTagProps {
  variable: Variable;
  onHover: (variable: Variable | null) => void;
}

const VariableTag: React.FC<VariableTagProps> = ({ variable, onHover }) => {
  const { updateVariable } = useAppStore();

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateVariable(variable.id, { selected: false });
  };

  const handleAdd = () => {
    updateVariable(variable.id, { selected: true });
  };

  return (
    <div
      className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm transition-all duration-200 cursor-pointer ${
        variable.selected
          ? "bg-green-400/20 text-green-300 border border-green-400/30 hover:bg-green-400/30"
          : "bg-gray-700 text-gray-300 border border-gray-600 hover:bg-gray-600"
      }`}
      onMouseEnter={() => onHover(variable)}
      onMouseLeave={() => onHover(null)}
      onClick={variable.selected ? undefined : handleAdd}
    >
      <span>{variable.name}</span>
      {variable.selected && (
        <button
          onClick={handleRemove}
          className="hover:bg-green-400/30 rounded-full p-0.5 transition-colors duration-200"
        >
          <X className="w-3 h-3" />
        </button>
      )}
      {!variable.selected && (
        <button className="text-gray-500 hover:text-gray-300 transition-colors duration-200">
          +
        </button>
      )}
    </div>
  );
};

export default VariableTag;

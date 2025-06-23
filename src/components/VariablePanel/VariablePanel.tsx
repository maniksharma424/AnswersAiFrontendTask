import { Variable, useAppContext } from "../../provider/appProvider";
import { useState } from "react";
import {
  AIStars,
  AIStarsSm,
  Check,
  Info,
  Chevrron,
  Cross,
  PlusSm,
  Rerun,
  Search,
  ButtonShadow,
} from "../../icons/Icons";
import Button from "../Button";

// Main VariablePanel Component
export const VariablePanel: React.FC = () => {
  const {
    isVariablePanelOpen,
    toggleVariablePanel,
    variables,
    selectedVariable,
    setSelectedVariable,
  } = useAppContext();

  const variablesByCategory = variables.reduce((acc, variable) => {
    if (!acc[variable.category]) {
      acc[variable.category] = [];
    }
    acc[variable.category].push(variable);
    return acc;
  }, {} as Record<string, Variable[]>);

  const selectedVariableInCategory1 = variables.filter(
    (v) => v.category === "Variable category 1" && v.selected
  );

  const selectedVariableInCategory2 = variables.filter(
    (v) => v.category === "Variable Category 2" && v.selected
  );

  const selectedVariableInCategory3 = variables.filter(
    (v) => v.category === "Variable Category 3" && v.selected
  );

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed w-full inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isVariablePanelOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleVariablePanel}
      />

      {/* Panel */}
      <div
        className={`fixed w-1/2 top-0 right-0   bg-black border-l border-border_primary z-50 transform transition-transform duration-300 ease-out p-6  flex flex-col h-full space-y-6 ${
          isVariablePanelOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between  ">
          <h2 className="text-xl font-semibold text-white">Edit Variables</h2>
          <button
            onClick={toggleVariablePanel}
            className="p-2 rounded-lg transition-colors duration-200"
          >
            <Cross />
          </button>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-start gap-2 w-full   ">
          <div className="flex items-center space-x-4 flex-1 bg-bg_primary  p-2 border-border_primary rounded-md">
            <Search />
            <input
              type="text"
              placeholder="Control"
              className="rounded-lg  text-sm w-full  placeholder:text-white focus:outline-none bg-transparent "
            />
          </div>
          <Button className=" px-4" iconLeft={<AIStars />}>
            Autofill
          </Button>
          <button className=" text-text_primary gradient-border-button flex items-center gap-2 border-[1px]  px-4 py-1.5 rounded-md bg-[#CCFF001A]/10  border-text_primary ">
            <Rerun />
            Rerun
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto  space-y-10 bg-bg_primary  border border-border_primary h-fit rounded-md ">
          {/* Variable Categories */}
          <div className="space-y-6 pt-6">
            <div className="px-6">
              <h3 className="text-sm font-light text-[#D5D5D5]  mb-3">
                Variable category 1
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedVariableInCategory1.map((variable) => (
                  <VariableTag
                    key={variable.id}
                    variable={variable}
                    onHover={setSelectedVariable}
                  />
                ))}
              </div>
            </div>

            <div className="px-6">
              <h3 className="text-sm font-light text-[#D5D5D5]  mb-3">
                Variable Category 2
              </h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {selectedVariableInCategory2.map((variable) => (
                  <VariableTag
                    key={variable.id}
                    variable={variable}
                    onHover={setSelectedVariable}
                  />
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {variablesByCategory["Variable Category 2"]
                  ?.filter((v) => !v.selected)
                  .map((variable) => (
                    <VariableTag
                      key={variable.id}
                      variable={variable}
                      onHover={setSelectedVariable}
                    />
                  ))}
              </div>
            </div>

            <div className="px-6">
              <h3 className="text-sm font-light text-[#D5D5D5]  mb-3">
                Variable Category 3
              </h3>
              <div className="flex flex-wrap gap-2">
                {variablesByCategory["Variable Category 3"]?.map((variable) => (
                  <VariableTag
                    key={variable.id}
                    variable={variable}
                    onHover={setSelectedVariable}
                  />
                ))}
              </div>
            </div>
            <div className=" bg-bg_primary_light p-5 space-y-3  border-t border-border_primary">
              <div className=" flex items-center gap-3">
                <h1 className=" text-white">Co2 Distrobution</h1>
                <Info />
              </div>
              <p className=" text-sm font-normal text-[#BBBBBB]">
                But what truly sets Switch apart is its versatility. It can be
                used as a scooter, a bike, or even a skateboard, making it
                suitable for people of all ages. Whether you're a student, a
                professional, or a senior citizen, Switch adapts to your needs
                and lifestyle.
              </p>
            </div>
          </div>
        </div>
        {/* Expandable Sections */}
        <div className="space-y-4">
          <VariableSection title="Primary Variables" />
          <VariableSection title="Secondary Variables" />
        </div>
      </div>
    </>
  );
};

// VariableTag Component
const VariableTag: React.FC<{
  variable: Variable;
  onHover: (variable: Variable | null) => void;
}> = ({ variable, onHover }) => {
  const { updateVariable } = useAppContext();

  const handleClick = () => {
    updateVariable(variable.id, { selected: !variable.selected });
  };

  return (
    <button
      className={`px-3 py-1.5 rounded-full text-xs font-light transition-all duration-200 border flex items-center gap-1.5 relative group ${
        variable.selected
          ? "bg-[#CCFF001A]/10 text-text_primary  border-text_primary"
          : "  bg-bg_primary_light text-[#D5D5D5]   border-border_primary hover:text-white"
      }`}
      onClick={handleClick}
      onMouseEnter={() => onHover(variable)}
      onMouseLeave={() => onHover(null)}
    >
      {variable.name}
      <AIStarsSm />
      {variable?.selected ? <Check /> : <PlusSm />}
      {variable?.selected && (
        <span className=" absolute -bottom-3 left-0 group-hover:visible invisible">
          <ButtonShadow />
        </span>
      )}
    </button>
  );
};

// VariableSection Component
const VariableSection: React.FC<{ title: string }> = ({ title }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border border-border_primary rounded-md bg-bg_primary_light text-text_secondary">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 text-left  transition-colors duration-200"
      >
        <span className="text-lg font-normal ">{title}</span>
        <button className=" rotate-180 border border-text_primary rounded-[20px] py-1 px-3">
          <Chevrron />
        </button>
      </button>
    </div>
  );
};

// VariablePanel.tsx
import { useAppContext } from "../../provider/appProvider";
import { useEffect, useState } from "react";
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
import { Variable } from "../../types";
import { VARIABLE_CATEGORIES } from "../../constants";

export const VariablePanel: React.FC = () => {
  const {
    isVariablePanelOpen,
    toggleVariablePanel,
    variables,
    selectedVariable,
    setSelectedVariable,
  } = useAppContext();

  const categorizedVariables = VARIABLE_CATEGORIES.map((category) => ({
    category,
    variables: variables.filter((v) => v.category === category),
  }));

  const descriptionToShow = selectedVariable?.description || null;

  return (
    <>
      <div
        className={`fixed w-full inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isVariablePanelOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleVariablePanel}
      />

      <div
        className={`fixed md:w-1/2 w-full overflow-auto top-0 right-0 bg-black border-l border-border_primary z-50 transform transition-transform duration-300 ease-out p-6 flex flex-col h-full space-y-6 ${
          isVariablePanelOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Edit Variables</h2>
          <button onClick={toggleVariablePanel} className="p-2 rounded-lg">
            <Cross />
          </button>
        </div>

        <div className="flex items-center gap-2 w-full">
          <div className="flex items-center space-x-4 flex-1 bg-bg_primary p-2 border-border_primary rounded-md">
            <Search />
            <input
              type="text"
              placeholder="Search variables"
              className="rounded-lg text-sm w-full placeholder:text-white bg-transparent focus:outline-none"
            />
          </div>
          <Button className="px-4" iconLeft={<AIStars />}>
            Autofill
          </Button>
          <button className="text-text_primary gradient-border-button flex items-center gap-2 border-[1px] px-4 py-1.5 rounded-md  border-text_primary bg-[#23291E]  rerun active:scale-95">
            <Rerun /> Rerun
          </button>
        </div>

        <div className="space-y-10 bg-bg_primary border border-border_primary h-fit rounded-md">
          <div
            className={`space-y-6 pt-6 ${descriptionToShow ? "pb-0" : "pb-6"}`}
          >
            {categorizedVariables.map(({ category, variables }) => (
              <div className="px-6" key={category}>
                <h3 className="text-sm font-light text-[#D5D5D5] mb-3">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {variables.map((variable) => (
                    <VariableTag key={variable.id} variable={variable} />
                  ))}
                </div>
              </div>
            ))}

            <div
              className={`transition-all duration-300 ease-in-out transform
              ${
                descriptionToShow
                  ? "opacity-100 translate-y-0 pointer-events-auto p-5 space-y-3"
                  : "opacity-0 translate-y-2 pointer-events-none h-0"
              }
              bg-bg_primary_light   border-t border-border_primary rounded-b-md
            `}
            >
              <div className="flex items-center gap-3">
                <h1 className="text-white">{selectedVariable?.name}</h1>
                <Info />
              </div>
              <p className="text-sm text-text_light">{descriptionToShow}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <VariableSection title="Primary Variables" />
          <VariableSection title="Secondary Variables" />
        </div>
      </div>
    </>
  );
};

const VariableTag: React.FC<{ variable: Variable }> = ({ variable }) => {
  const { updateVariable, setSelectedVariable } = useAppContext();
  const [showDescription, setShowDescription] = useState(false);
  const [hoverTimer, setHoverTimer] = useState<NodeJS.Timeout | null>(null);
  const [hideTimer, setHideTimer] = useState<NodeJS.Timeout | null>(null);

  const handleClick = () => {
    updateVariable(variable.id, { selected: !variable.selected });
  };

  const handleMouseEnter = () => {
    // Clear any existing hide timer
    if (hideTimer) {
      clearTimeout(hideTimer);
      setHideTimer(null);
    }

    if (variable.description && !showDescription) {
      const timer = setTimeout(() => {
        setShowDescription(true);
        setSelectedVariable(variable);
      }, 1000);
      setHoverTimer(timer);
    }
  };

  const handleMouseLeave = () => {
    // Clear hover timer if still waiting
    if (hoverTimer) {
      clearTimeout(hoverTimer);
      setHoverTimer(null);
    }

    // Set hide timer if description is showing
    if (showDescription) {
      const timer = setTimeout(() => {
        setShowDescription(false);
        setSelectedVariable(null);
      }, 2000);
      setHideTimer(timer);
    }
  };

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (hoverTimer) clearTimeout(hoverTimer);
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, [hoverTimer, hideTimer]);
  return (
    <button
      className={`px-3 py-1.5 rounded-full text-xs font-light border flex items-center gap-1.5 group relative ${
        variable.selected
          ? "bg-[#CCFF001A]/10 text-text_primary border-text_primary"
          : "bg-bg_primary_light text-[#D5D5D5] border-border_primary hover:text-white"
      }`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {variable.name}
      <AIStarsSm />
      {variable.selected ? <Check /> : <PlusSm />}
      {variable.selected && (
        <span className="absolute -bottom-3 left-0 group-hover:visible invisible">
          <ButtonShadow />
        </span>
      )}
    </button>
  );
};

const VariableSection: React.FC<{ title: string }> = ({ title }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border border-border_primary rounded-md bg-bg_primary_light text-text_secondary">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between py-2 px-5 text-left"
      >
        <span className="text-md font-normal">{title}</span>
        <span className="rotate-180 border border-text_primary rounded-[20px] py-0.5 px-2">
          <Chevrron />
        </span>
      </button>
    </div>
  );
};

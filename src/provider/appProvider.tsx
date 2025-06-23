import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { DataPoint, Variable } from "../types";
import { generateChartData, initialVariables } from "../constants";

// Types

interface AppContextType {
  isVariablePanelOpen: boolean;
  selectedVariable: Variable | null;
  hoveredDataPoint: DataPoint | null;
  variables: Variable[];
  chartData: DataPoint[];
  toggleVariablePanel: () => void;
  setSelectedVariable: (variable: Variable | null) => void;
  setHoveredDataPoint: (dataPoint: DataPoint | null) => void;
  updateVariable: (id: string, updates: Partial<Variable>) => void;
}

// Create Context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Context Provider
const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isVariablePanelOpen, setIsVariablePanelOpen] = useState(false);
  const [selectedVariable, setSelectedVariable] = useState<Variable | null>(
    null
  );
  const [hoveredDataPoint, setHoveredDataPoint] = useState<DataPoint | null>(
    null
  );
  const [variables, setVariables] = useState<Variable[]>(initialVariables);
  const [chartData] = useState<DataPoint[]>(generateChartData());

  // Check URL and set initial state
  useEffect(() => {
    const checkURLAndSetState = () => {
      if (typeof window !== "undefined") {
        const urlParams = new URLSearchParams(window.location.search);
        const editVariablesParam = urlParams.get("editVariables");
        const shouldBeOpen = editVariablesParam === "true";

        setIsVariablePanelOpen(shouldBeOpen);
      }
    };

    // Check immediately
    checkURLAndSetState();

  }, []);

  // Update URL when panel state changes
  const updateURL = (isOpen: boolean) => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (isOpen) {
        url.searchParams.set("editVariables", "true");
      } else {
        url.searchParams.delete("editVariables");
      }
      window.history.replaceState({}, "", url.toString());
    }
  };

  const toggleVariablePanel = () => {
    setIsVariablePanelOpen((prev) => {
      const newState = !prev;
      updateURL(newState);
      return newState;
    });
  };

  // Listen for browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const shouldBeOpen = urlParams.get("editVariables") === "true";
      setIsVariablePanelOpen(shouldBeOpen);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const updateVariable = (id: string, updates: Partial<Variable>) => {
    setVariables((prev) =>
      prev.map((variable) =>
        variable.id === id ? { ...variable, ...updates } : variable
      )
    );
  };

  const value: AppContextType = {
    isVariablePanelOpen,
    selectedVariable,
    hoveredDataPoint,
    variables,
    chartData,
    toggleVariablePanel,
    setSelectedVariable,
    setHoveredDataPoint,
    updateVariable,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export default AppProvider;

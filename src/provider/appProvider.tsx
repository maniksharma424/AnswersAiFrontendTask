import React, { createContext, useContext, useState, ReactNode } from "react";


// Types
export interface Variable {
  id: string;
  name: string;
  category: string;
  selected: boolean;
  description?: string;
}

export interface DataPoint {
  month: string;
  value: number;
  target: number;
  percentageChange: number;
}

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

// Initial data
const generateChartData = (): DataPoint[] => [
  { month: "Apr", value: 32000, target: 30000, percentageChange: 6.7 },
  { month: "May", value: 45000, target: 42000, percentageChange: 7.1 },
  { month: "Jun", value: 42000, target: 40000, percentageChange: 5.0 },
  { month: "Jul", value: 89600, target: 85000, percentageChange: 5.4 },
  { month: "Aug", value: 55000, target: 52000, percentageChange: 5.8 },
  { month: "Sep", value: 38000, target: 36000, percentageChange: 5.6 },
  { month: "Oct", value: 62000, target: 58000, percentageChange: 6.9 },
];

const initialVariables: Variable[] = [
  {
    id: "1",
    name: "Carbon 1",
    category: "Variable category 1",
    selected: true,
  },
  {
    id: "2",
    name: "Co2 Distribution",
    category: "Variable category 1",
    selected: true,
    description:
      "But what truly sets Switch apart is its versatility. It can be used as a scooter, a bike, or even a skateboard, making it suitable for people of all ages. Whether you're a student, a professional, or a senior citizen, Switch adapts to your needs and lifestyle.",
  },
  {
    id: "3",
    name: "Fleet sizing",
    category: "Variable category 1",
    selected: true,
  },
  {
    id: "4",
    name: "Parking Rate",
    category: "Variable Category 2",
    selected: false,
  },
  {
    id: "5",
    name: "Border Rate",
    category: "Variable Category 2",
    selected: true,
  },
  {
    id: "6",
    name: "Request rate",
    category: "Variable Category 2",
    selected: true,
  },
  {
    id: "7",
    name: "Variable 1",
    category: "Variable Category 2",
    selected: false,
  },
  {
    id: "8",
    name: "Variable 1",
    category: "Variable Category 3",
    selected: true,
  },
  {
    id: "9",
    name: "Variable 1",
    category: "Variable Category 3",
    selected: false,
  },
];

// Create Context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Context Provider
export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isVariablePanelOpen, setIsVariablePanelOpen] = useState(false);
  const [selectedVariable, setSelectedVariable] = useState<Variable | null>(
    null
  );
  const [hoveredDataPoint, setHoveredDataPoint] = useState<DataPoint | null>(
    null
  );
  const [variables, setVariables] = useState<Variable[]>(initialVariables);
  const [chartData] = useState<DataPoint[]>(generateChartData());

  const toggleVariablePanel = () => {
    setIsVariablePanelOpen((prev) => !prev);
  };

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



// Types for graph 
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


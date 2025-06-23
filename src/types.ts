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


export interface FormData {
  email: string;
  password: string;
}

export interface Errors {
  email?: string;
  password?: string;
  submit?: string;
}

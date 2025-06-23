import { DataPoint, Variable } from "./types";

// Initial data for graph
export const generateChartData = (): DataPoint[] => [
  { month: "Apr", value: 32000, target: 30000, percentageChange: 6.7 },
  { month: "May", value: 45000, target: 42000, percentageChange: 7.1 },
  { month: "Jun", value: 42000, target: 40000, percentageChange: 5.0 },
  { month: "Jul", value: 89600, target: 85000, percentageChange: 5.4 },
  { month: "Aug", value: 55000, target: 52000, percentageChange: 5.8 },
  { month: "Sep", value: 38000, target: 36000, percentageChange: 5.6 },
  { month: "Oct", value: 62000, target: 58000, percentageChange: 6.9 },
];
// initial variable for graph

export const VARIABLE_CATEGORIES = [
  "Environmental Impact",
  "Transportation Metrics",
  "Operations Management",
];
export const initialVariables: Variable[] = [
  {
    id: "1",
    name: "Carbon Emissions",
    category: "Environmental Impact",
    selected: true,
    description:
      "Measures the total carbon dioxide equivalent emissions from all fleet vehicles. This metric helps track environmental performance and compliance with sustainability goals.",
  },
  {
    id: "2",
    name: "CO2 Distribution Network",
    category: "Environmental Impact",
    selected: true,
    description:
      "Analyzes the spatial distribution of carbon emissions across different routes and service areas. Essential for identifying high-emission zones and optimizing environmental impact.",
  },
  {
    id: "3",
    name: "Fleet Optimization",
    category: "Environmental Impact",
    selected: true,
    description:
      "Determines the optimal number and type of vehicles needed to meet demand while minimizing environmental impact. Balances service quality with sustainability objectives.",
  },
  {
    id: "4",
    name: "Parking Utilization Rate",
    category: "Transportation Metrics",
    selected: false,
    description:
      "Tracks the percentage of available parking spaces being utilized across different time periods and locations. Critical for understanding capacity constraints.",
  },
  {
    id: "5",
    name: "Border Crossing Frequency",
    category: "Transportation Metrics",
    selected: true,
    description:
      "Measures how often vehicles cross predefined geographical boundaries or service zones. Important for route optimization and jurisdictional compliance.",
  },
  {
    id: "6",
    name: "Service Request Volume",
    category: "Transportation Metrics",
    selected: true,
    description:
      "Quantifies the number of service requests received per time period. Key indicator for demand forecasting and capacity planning.",
  },
  {
    id: "7",
    name: "Route Efficiency Index",
    category: "Transportation Metrics",
    selected: false,
    description:
      "Composite metric measuring the efficiency of vehicle routes based on distance, time, and fuel consumption. Higher values indicate more optimized routing.",
  },
  {
    id: "8",
    name: "Operational Downtime",
    category: "Operations Management",
    selected: true,
    description:
      "Tracks the total time vehicles or systems are unavailable for service due to maintenance, repairs, or other operational issues. Critical for reliability planning.",
  },
  {
    id: "9",
    name: "Resource Allocation Score",
    category: "Operations Management",
    selected: false,
    description:
      "Evaluates how effectively resources (vehicles, drivers, maintenance) are distributed across service areas. Higher scores indicate better resource utilization.",
  },
];


export const kpiData = [
  {
    title: "Infrastructure Units",
    value: "€421.07",
    description: "This describes variable two and what the shown data means.",
  },
  {
    title: "Charging Growth",
    value: "33.07",
    description: "This describes variable two and what the shown data means.",
  },
  {
    title: "Localization change",
    value: "21.9%",
    description: "This describes variable two and what the shown data means.",
  },
  {
    title: "Fleet growth",
    value: "7.03%",
    description: "This describes variable two and what the shown data means.",
  },
];

export const results = [
  {
    text: "The best found configuration based on profit is characterized by 11 zones (max) with charging stations and 48 total number of poles.",
  },
  {
    text: "The best found configuration based on satisfied demand is characterized by 11 zones (max) with charging stations and 48 total number of poles.",
  },
];

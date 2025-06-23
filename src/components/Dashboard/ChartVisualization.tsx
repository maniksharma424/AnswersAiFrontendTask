import React, { useRef, useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartConfiguration,
  ChartEvent,
  ActiveElement,
  TooltipModel,
} from "chart.js";
import { ChartChevron, ChevronDown, QuestionMark } from "../../icons/Icons";

// Register Chart.js components
ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Define the type for your data points
type ChartDataPoint = {
  month: string;
  value: number;
  target: number;
  percentageChange: number;
};

const chartData: ChartDataPoint[] = [
  { month: "Apr", value: 32000, target: 30000, percentageChange: 6.7 },
  { month: "May", value: 45000, target: 42000, percentageChange: 7.1 },
  { month: "Jun", value: 42000, target: 40000, percentageChange: 5.0 },
  { month: "Jul", value: 89600, target: 85000, percentageChange: 5.4 },
  { month: "Aug", value: 55000, target: 52000, percentageChange: 5.8 },
  { month: "Sep", value: 38000, target: 36000, percentageChange: 5.6 },
  { month: "Oct", value: 62000, target: 58000, percentageChange: 6.9 },
];

const ChartVisualization: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<ChartJS<"line"> | null>(null);
  const [hoveredDataPoint, setHoveredDataPoint] =
    useState<ChartDataPoint | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;

    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }

    const config: ChartConfiguration<"line"> = {
      type: "line",
      data: {
        labels: chartData.map((d) => d.month),
        datasets: [
          {
            label: "Value",
            data: chartData.map((d) => d.value),
            borderColor: "#DCFF7FFD",
            backgroundColor: "rgba(0, 0, 0, 0)",
            borderWidth: 3,
            tension: 0,
            pointRadius: 0,
            pointHoverRadius: 8,
            pointHoverBorderWidth: 3,
            pointHoverBorderColor: "#1f2937",
            pointHoverBackgroundColor: "#DCFF7FFD",
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
          mode: "index",
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: false,
            external: (context) => {
              const tooltipModel = context.tooltip as TooltipModel<"line">;

              if (tooltipModel.opacity === 0) {
                setHoveredDataPoint(null);
                setTooltipPosition(null);
                return;
              }

              const dataPoint = tooltipModel.dataPoints?.[0];
              if (dataPoint) {
                setHoveredDataPoint(chartData[dataPoint.dataIndex]);
                setTooltipPosition({
                  x: dataPoint.element.x,
                  y: dataPoint.element.y,
                });
              }
            },
          },
        },
        onHover: (event: ChartEvent, active: ActiveElement[]) => {
          if (active.length === 0) {
            setHoveredDataPoint(null);
            setTooltipPosition(null);
          }
        },
        scales: {
          // x: {
          //   grid: {
          //     display: true,
          //     drawTicks: false,
          //     color: (context) => {
          //       const y = chartRef.current?.scales.y;
          //       if (!y) return "transparent";
          //       const isVertical = context.tick?.value !== undefined;
          //       return isVertical ? "#DCFF7FFD" : "transparent";
          //     },
          //     lineWidth: 1,
          //   },
          //   ticks: {
          //     color: "#9CA3AF",
          //     font: { size: 12 },
          //     padding: 10,
          //   },
          //   border: { display: false },
          // },
          y: {
            min: 0,
            max: 100000,
            ticks: {
              stepSize: 20000,
              color: "#9CA3AF",
              font: { size: 12 },
              callback: (value: number) => `$${value / 1000}K `,
              padding: 10,
            },
            grid: {
              color: "#374151",
              lineWidth: 0.5,
            },
            border: { display: false },
          },
        },
      },
      plugins: [
        {
          id: "hoverLine",
          afterDraw: (chart) => {
            const tooltip = chart.tooltip;
            if (!tooltip?.dataPoints?.length) return;

            const ctx = chart.ctx;
            const point = tooltip.dataPoints[0].element;
            const x = point.x;
            const y = point.y;
            const bottomY = chart.chartArea.bottom;

            ctx.save();
            ctx.beginPath();
            ctx.setLineDash([5, 5]);
            ctx.strokeStyle = "#DCFF7FFD";
            ctx.lineWidth = 1;

            // Draw only from point.y to bottom
            ctx.moveTo(x, y);
            ctx.lineTo(x, bottomY);
            ctx.stroke();
            ctx.restore();
          },
        },
      ],
    };

    chartRef.current = new ChartJS(ctx, config);

    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, []);

  return (
    <div className=" bg-bg_primary_light rounded-xl border border-border_primary p-8 relative h-full flex flex-col">
      <div className="flex items-center justify-end">
        <div className=" bg-bg_primary border border-border_primary rounded-md px-4 py-2 text-sm text-[#FCFCFC] focus:outline-none flex items-center gap-4">
          Unsatisfied Demand %
          <button>
            <ChevronDown />
          </button>
        </div>
      </div>

      <div className="relative flex-1 ">
        <canvas ref={canvasRef} className=" min-h-full" />

        {hoveredDataPoint && tooltipPosition && (
          <div
            className="absolute bg-bg_primary_light backdrop-blur-sm border  border-border_primary rounded-lg p-4 shadow-xl z-10 transition-opacity duration-200 min-w-fit space-y-3"
            style={{
              left: tooltipPosition.x - 100,
              top: tooltipPosition.y - 100,

              pointerEvents: "none",
            }}
          >
            <div className="text-2xl font-bold text-white mb-1 flex justify-between items-center">
              ${(hoveredDataPoint.value / 1000).toFixed(1)}k
              <QuestionMark />
            </div>
            <div className="flex items-center gap-2 text-base  text-[#878787]">
              <div className=" bg-[#C8E97233] p-[3px] rounded-full border border-text_primary  ">
                <ChartChevron />
              </div>
              {hoveredDataPoint.percentageChange}% above target
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartVisualization;

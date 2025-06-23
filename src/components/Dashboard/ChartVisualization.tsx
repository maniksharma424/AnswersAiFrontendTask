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
import useIsMobile from "../../hooks/useIsmobile";

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
  const isMpbile = useIsMobile();
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
            borderWidth: 3,
            tension: 0,
            pointRadius: 0,
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
                if (chartRef.current) {
                  chartRef.current.update();
                }
                return;
              }

              const dataPoint = tooltipModel.dataPoints?.[0];
              if (dataPoint) {
                console.log("✅ Tooltip active at index", dataPoint.dataIndex);
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
          x: {
            grid: {
              color: "#222324",
              lineWidth: 0.2,
            },
            ticks: {
              color: "#FFFFFF", // White

              font: { size: 12 },
              padding: 10,
            },
            border: { display: true, color: "#525252", width: 1.5 },
          },
          y: {
            min: 0,
            max: 100000,

            ticks: {
              display: isMpbile ? false : true,
              stepSize: 20000,
              color: "#FFFFFF", // White
              font: { size: 12 },
              callback: (tickValue: string | number) => {
                const num = Number(tickValue); // Ensure it's treated as a number
                return `$${num / 1000}K`;
              },
              padding: 10,
            },

            grid: {
              drawTicks: false,
              color: "#525252",
              lineWidth: 0.3,
            },
            border: {
              display: isMpbile ? false : true,
              color: "#525252",
              width: 1.5,
            },
          },
        },
      },
      plugins: [
        {
          id: "hoverLine",
          afterDatasetsDraw: (chart) => {
            const tooltip = chart.tooltip;

            // ✅ Explicitly check both conditions
            if (
              !tooltip ||
              tooltip.opacity === 0 ||
              !tooltip.dataPoints?.length
            ) {
              return; // Don't draw dashed line if tooltip is hidden
            }

            const ctx = chart.ctx;
            const point = tooltip.dataPoints[0].element;
            const x = point.x;
            const y = point.y;
            const bottomY = chart.chartArea.bottom;

            ctx.save();
            ctx.beginPath();
            ctx.setLineDash([5, 5]);
            ctx.strokeStyle = "#DCFF7FFD";
            ctx.lineWidth = 2.5;
            ctx.moveTo(x, y + 10);
            ctx.lineTo(x, bottomY);
            ctx.stroke();
            ctx.restore();
          },
        },
        {
          id: "underGraphVerticalLinesFull",
          beforeDatasetsDraw(chart) {
            const ctx = chart.ctx;
            const { bottom, top, left, right } = chart.chartArea;
            const meta = chart.getDatasetMeta(0);
            const points = meta.data;

            if (!points || points.length < 2) return;

            const step = 25; // spacing in px between each lemon line

            ctx.save();
            ctx.strokeStyle = "#8AA14F33"; // Lemon
            ctx.lineWidth = 2;

            // Loop across entire width
            for (let x = left; x <= right; x += step) {
              // Find two points in the dataset this x lies between
              for (let i = 0; i < points.length - 1; i++) {
                const p1 = points[i];
                const p2 = points[i + 1];

                if (x >= p1.x && x <= p2.x) {
                  const t = (x - p1.x) / (p2.x - p1.x); // interpolation factor
                  const y = p1.y + t * (p2.y - p1.y);

                  // Draw vertical line from bottom up to interpolated y
                  ctx.beginPath();
                  ctx.moveTo(x, bottom);
                  ctx.lineTo(x, y);
                  ctx.stroke();
                  break;
                }
              }
            }

            ctx.restore();
          },
        },
        {
          id: "glowOnHover",
          afterDatasetsDraw(chart) {
            const tooltip = chart.tooltip;
            if (
              !tooltip ||
              tooltip.opacity === 0 ||
              !tooltip.dataPoints?.length
            )
              return;

            const ctx = chart.ctx;
            const point = tooltip.dataPoints[0].element;

            const glowColor = "#DCFF7F"; // Outer glow
            const innerColor = "#222324"; // Inner black dot
            const radius = 6;
            const borderWidth = 3;

            ctx.save();

            // 🟡 Glowing aura
            ctx.shadowColor = glowColor;
            ctx.shadowBlur = 25;

            // 🟢 Outer lemon circle (border)
            ctx.beginPath();
            ctx.arc(point.x, point.y, radius + borderWidth / 2, 0, Math.PI * 2);
            ctx.strokeStyle = glowColor;
            ctx.lineWidth = borderWidth;
            ctx.stroke();

            // ⚫ Inner black circle
            ctx.shadowBlur = 0;
            ctx.beginPath();
            ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
            ctx.fillStyle = innerColor;
            ctx.fill();

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
    <div className=" sm:bg-bg_primary_light sm:rounded-xl sm:border sm:border-border_primary md:p-8 sm:p-4  relative h-full flex flex-col">
      <div className="sm:flex hidden items-center justify-end  relative">
        <button className=" bg-bg_primary border border-border_primary rounded-md px-2.5 py-2 text-xs text-[#FCFCFC] focus:outline-none flex relative bottom-3 right-4  items-center gap-4">
          Unsatisfied Demand %
          <span>
            <ChevronDown />
          </span>
        </button>
      </div>

      <div className="relative flex-1 ">
        <canvas ref={canvasRef} className=" sm:min-h-full min-h-[350px]" />

        {hoveredDataPoint && tooltipPosition && (
          <div
            className="absolute bg-bg_primary_light backdrop-blur-sm border  border-border_primary rounded-lg sm:p-4 p-2 shadow-xl z-10 transition-opacity duration-200 min-w-fit sm:space-y-3 space-y-1"
            style={{
              left: isMpbile ? tooltipPosition.x - 80 : tooltipPosition.x - 100,
              top: isMpbile ? tooltipPosition.y - 80 : tooltipPosition.y - 120,

              pointerEvents: "none",
            }}
          >
            <div className="sm:text-2xl text-base sm:font-bold font-normal text-white mb-1 flex justify-between items-center">
              ${(hoveredDataPoint.value / 1000).toFixed(1)}k
              <QuestionMark />
            </div>
            <div className="flex items-center gap-2 sm:text-base text-xs  text-[#878787]">
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

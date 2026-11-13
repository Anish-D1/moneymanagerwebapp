import { useId } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import PropTypes from "prop-types";

import CustomTooltip from "./CustomTooltip.jsx";
import CustomLegend from "./CustomLegend.jsx";

const CustomPieChart = ({
  data,
  label,
  totalAmount,
  showTextAnchor,
  colors,
}) => {
  const gradientId = `crystalGlassGradient-${useId().replace(/:/g, "")}`;

  const themeColors = ["#A855F7", "#FF1744", "#00E676", "#22D3EE"];
  const chartColors = colors?.length ? colors : themeColors;

  const validData = (Array.isArray(data) ? data : [])
    .filter(
      (entry) =>
        entry &&
        Number.isFinite(Number(entry.amount)) &&
        Number(entry.amount) > 0,
    )
    .map((entry) => ({
      ...entry,
      amount: Number(entry.amount),
      name: String(entry.name ?? "Uncategorized"),
    }));

  const hasData = validData.length > 0;

  return (
    <div className="relative mx-auto w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#080B16]/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl">
      <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-violet-500/15 blur-[70px]" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-cyan-400/10 blur-[70px]" />
      <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      {hasData ? (
        <div className="relative z-10">
          <ResponsiveContainer width="100%" height={360}>
            <PieChart>
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.38} />
                  <stop offset="25%" stopColor="#FFFFFF" stopOpacity={0.08} />
                  <stop offset="55%" stopColor="#FFFFFF" stopOpacity={0} />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0.16} />
                </linearGradient>
              </defs>

              <Pie
                data={validData}
                dataKey="amount"
                nameKey="name"
                cx="50%"
                cy="44%"
                outerRadius="69%"
                innerRadius="53%"
                paddingAngle={3}
                cornerRadius={5}
                stroke="#080B16"
                strokeWidth={2}
                isAnimationActive
                animationDuration={800}
              >
                {validData.map((entry, index) => {
                  const color = chartColors[index % chartColors.length];

                  return (
                    <Cell
                      key={`cell-${entry.name}-${index}`}
                      fill={color}
                      fillOpacity={1}
                      stroke={color}
                      strokeWidth={1}
                      style={{
                        filter: `drop-shadow(0 0 4px ${color}80)`,
                      }}
                    />
                  );
                })}
              </Pie>

              <Pie
                data={validData}
                dataKey="amount"
                nameKey="name"
                cx="50%"
                cy="44%"
                outerRadius="69%"
                innerRadius="53%"
                paddingAngle={3}
                cornerRadius={5}
                stroke="none"
                isAnimationActive={false}
                legendType="none"
                tooltipType="none"
                style={{ pointerEvents: "none" }}
              >
                {validData.map((entry, index) => {
                  const color = chartColors[index % chartColors.length];

                  return (
                    <Cell
                      key={`highlight-${entry.name}-${index}`}
                      fill={`url(#${gradientId})`}
                      stroke={color}
                      strokeOpacity={0.65}
                      strokeWidth={1}
                    />
                  );
                })}
              </Pie>

              <Tooltip content={<CustomTooltip />} cursor={false} />

              <Legend content={<CustomLegend />} verticalAlign="bottom" />

              {showTextAnchor && (
                <>
                  <text
                    x="50%"
                    y="41%"
                    textAnchor="middle"
                    fill="#C4B5FD"
                    fontSize={12}
                  >
                    {label}
                  </text>

                  <text
                    x="50%"
                    y="49%"
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize={22}
                    fontWeight={600}
                    style={{
                      filter: "drop-shadow(0 0 8px rgba(168,85,247,0.45))",
                    }}
                  >
                    {totalAmount ?? 0}
                  </text>
                </>
              )}
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div
          className="relative z-10 flex h-[360px] flex-col items-center justify-center px-6 text-center"
          role="status"
        >
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-300">
            <span className="text-2xl" aria-hidden="true">
              ◉
            </span>
          </div>
          <p className="text-sm font-medium text-slate-200">
            No chart data available
          </p>
          <p className="mt-2 max-w-xs text-xs leading-5 text-slate-400">
            Add a transaction to see your category breakdown here.
          </p>
        </div>
      )}
    </div>
  );
};
CustomPieChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }),
  ),
  label: PropTypes.string,
  totalAmount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  showTextAnchor: PropTypes.bool,
  colors: PropTypes.arrayOf(PropTypes.string),
};

export default CustomPieChart;

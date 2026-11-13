import { useId } from "react";
import PropTypes from "prop-types";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { addThousandsSeparator } from "../util/util.js";

const CustomLineChart = ({ data, title = "Income" }) => {
  const gradientId = `income-gradient-${useId().replace(/:/g, "")}`;
  const chartData = Array.isArray(data) ? data : [];
  const chartTitle = String(title || "Income");

  const formatAmount = (value) => addThousandsSeparator(Number(value) || 0);

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;

    const dataPoint = payload[0]?.payload ?? {};
    const items = Array.isArray(dataPoint.items) ? dataPoint.items : [];

    const groupedItems = items.reduce((acc, item) => {
      const categoryName = item?.categoryName || "Uncategorized";
      const amount = Number(item?.amount) || 0;

      if (!acc[categoryName]) {
        acc[categoryName] = {
          categoryName,
          totalAmount: 0,
        };
      }

      acc[categoryName].totalAmount += amount;
      return acc;
    }, {});

    const categories = Object.values(groupedItems);
    const totalAmount = Number(dataPoint.totalAmount) || 0;

    return (
      <div className="max-w-[min(18rem,80vw)] rounded-xl border border-white/10 bg-[#0D1224]/95 p-3 text-slate-200 shadow-xl shadow-black/30 backdrop-blur-xl">
        <p className="mb-2 break-words text-sm font-semibold text-white">
          {label || `${chartTitle} summary`}
        </p>

        <div className="my-2 border-t border-white/10" />

        <p className="mb-2 text-sm font-bold text-slate-300">
          Total:{" "}
          <span className="text-violet-300">₹{formatAmount(totalAmount)}</span>
        </p>

        {categories.length > 0 && (
          <div className="mt-2 border-t border-white/10 pt-2">
            <p className="mb-2 text-xs font-semibold text-slate-400">Details</p>

            <div className="max-h-40 space-y-2 overflow-y-auto">
              {categories.map((item) => (
                <div
                  key={item.categoryName}
                  className="flex items-start justify-between gap-4 text-xs"
                >
                  <span className="min-w-0 break-words text-slate-400">
                    {item.categoryName}
                  </span>
                  <span className="shrink-0 font-medium tabular-nums text-slate-200">
                    ₹{formatAmount(item.totalAmount)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  CustomTooltip.propTypes = {
    active: PropTypes.bool,
    payload: PropTypes.arrayOf(
      PropTypes.shape({
        payload: PropTypes.object,
      }),
    ),
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  return (
    <div className="w-full min-w-0 max-w-full">
      {chartData.length > 0 ? (
        <div
          className="h-[260px] w-full min-w-0 sm:h-[300px] lg:h-[320px]"
          role="img"
          aria-label={`${chartTitle} trend chart showing totals over time`}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 12, right: 8, left: -12, bottom: 0 }}
            >
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#875cf5" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#875cf5" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                stroke="rgba(255,255,255,0.07)"
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: "#94A3B8" }}
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                minTickGap={20}
              />

              <YAxis
                tick={{ fontSize: 11, fill: "#94A3B8" }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) =>
                  Number(value) >= 1000
                    ? `₹${(Number(value) / 1000).toFixed(0)}k`
                    : `₹${value}`
                }
                width={52}
              />

              <Tooltip
                content={<CustomTooltip />}
                cursor={{
                  stroke: "rgba(167,139,250,0.35)",
                  strokeDasharray: "4 4",
                }}
              />

              <Area
                type="monotone"
                dataKey="totalAmount"
                stroke="#A78BFA"
                fill={`url(#${gradientId})`}
                strokeWidth={2.5}
                activeDot={{
                  r: 5,
                  fill: "#C4B5FD",
                  stroke: "#0D1224",
                  strokeWidth: 2,
                }}
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex h-[260px] flex-col items-center justify-center px-4 text-center sm:h-[300px]">
          <p className="text-sm font-medium text-slate-300">
            No chart data available
          </p>
          <p className="mt-1 max-w-sm text-xs leading-5 text-slate-500">
            Your {chartTitle.toLowerCase()} activity will appear here when
            available.
          </p>
        </div>
      )}
    </div>
  );
};

CustomLineChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string,
};

export default CustomLineChart;

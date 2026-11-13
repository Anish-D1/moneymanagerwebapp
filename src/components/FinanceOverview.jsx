import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";
import CustomPieChart from "./CustomPieChart.jsx";
import { addThousandsSeparator } from "../util/util.js";

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  const [selectedFilter, setSelectedFilter] = useState("Overview");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const COLORS = ["#A855F7", "#FF1744", "#00E676"];

  const balanceData = [
    { name: "Total Balance", amount: Number(totalBalance) || 0 },
    { name: "Total Expenses", amount: Number(totalExpense) || 0 },
    { name: "Total Income", amount: Number(totalIncome) || 0 },
  ];

  const filterConfig = {
    Overview: {
      data: balanceData,
      colors: COLORS,
      label: "Total Balance",
      amount: Number(totalBalance) || 0,
    },
    Income: {
      data: [balanceData[2]],
      colors: [COLORS[2]],
      label: "Total Income",
      amount: Number(totalIncome) || 0,
    },
    Expenses: {
      data: [balanceData[1]],
      colors: [COLORS[1]],
      label: "Total Expenses",
      amount: Number(totalExpense) || 0,
    },
  };

  const activeFilter = filterConfig[selectedFilter];

  const filterOptions = [
    {
      name: "Overview",
      description: "All finances",
      color: "#C4B5FD",
      dotColor: "#A855F7",
    },
    {
      name: "Income",
      description: "Money received",
      color: "#6EE7B7",
      dotColor: "#00E676",
    },
    {
      name: "Expenses",
      description: "Money spent",
      color: "#FDA4AF",
      dotColor: "#FF1744",
    },
  ];

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setIsDropdownOpen(false);
  };

  return (
    <div className="group relative overflow-visible rounded-2xl border border-white/10 bg-slate-900/70 p-5 shadow-lg shadow-black/10 backdrop-blur-xl transition-all duration-300 hover:border-violet-400/20 sm:p-6">
      {/* Aurora glow */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-violet-500/10 blur-3xl" />

      {/* Header */}
      <div className="relative flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h5 className="text-lg font-semibold tracking-tight text-white">
            Financial Overview
          </h5>

          <p className="mt-1 text-sm text-slate-400">
            Your financial breakdown
          </p>
        </div>

        {/* Custom rounded dropdown */}
        <div ref={dropdownRef} className="relative z-30 shrink-0">
          <button
            type="button"
            onClick={() => setIsDropdownOpen((previous) => !previous)}
            aria-haspopup="listbox"
            aria-expanded={isDropdownOpen}
            aria-label="Filter financial overview"
            className={`flex items-center gap-3 rounded-xl border bg-gradient-to-br from-[#21183A] via-[#17132B] to-[#101525] px-4 py-2.5 text-xs font-semibold tracking-wide text-violet-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_4px_14px_rgba(0,0,0,0.2)] outline-none transition-all duration-300 hover:border-violet-400/60 hover:shadow-[0_0_18px_rgba(168,85,247,0.14)] focus-visible:ring-2 focus-visible:ring-violet-500/40 ${
              isDropdownOpen
                ? "border-violet-400/60 shadow-[0_0_18px_rgba(168,85,247,0.14)]"
                : "border-violet-400/30"
            }`}
          >
            <span>{selectedFilter}</span>

            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`text-violet-300 transition-transform duration-200 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            >
              <path d="m7 10 5 5 5-5" />
            </svg>
          </button>

          {/* Rounded options panel */}
          {isDropdownOpen && (
            <div
              role="listbox"
              aria-label="Financial overview filters"
              className="absolute right-0 top-full mt-2 w-52 overflow-hidden rounded-2xl border border-violet-400/25 bg-[#111020]/95 p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.55),0_0_20px_rgba(168,85,247,0.10)] backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-150"
            >
              <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-violet-300/40 to-transparent" />

              {filterOptions.map((option) => {
                const isSelected = selectedFilter === option.name;

                return (
                  <button
                    key={option.name}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleFilterChange(option.name)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all duration-200 ${
                      isSelected ? "bg-violet-500/15" : "hover:bg-white/[0.06]"
                    }`}
                  >
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{
                        backgroundColor: option.dotColor,
                        boxShadow: `0 0 9px ${option.dotColor}90`,
                      }}
                    />

                    <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <span
                        className="text-sm font-semibold"
                        style={{
                          color: option.color,
                        }}
                      >
                        {option.name}
                      </span>

                      <span className="text-[11px] text-slate-500">
                        {option.description}
                      </span>
                    </span>

                    {isSelected && (
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#C4B5FD"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m5 12 4 4L19 6" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Filtered chart */}
      <div className="relative mt-4">
        <CustomPieChart
          data={activeFilter.data}
          label={activeFilter.label}
          totalAmount={`₹${addThousandsSeparator(activeFilter.amount)}`}
          colors={activeFilter.colors}
          showTextAnchor
        />
      </div>

      {/* Filtered legend */}
      <div
        className={`relative mt-3 grid grid-cols-1 gap-3 border-t border-white/10 pt-4 ${
          selectedFilter === "Overview" ? "sm:grid-cols-3" : "sm:grid-cols-1"
        }`}
      >
        {activeFilter.data.map((item, index) => (
          <div key={item.name} className="flex min-w-0 items-center gap-2">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{
                backgroundColor: activeFilter.colors[index],
                boxShadow: `0 0 8px ${activeFilter.colors[index]}80`,
              }}
            />

            <div className="min-w-0">
              <p className="truncate text-xs text-slate-400">{item.name}</p>

              <p className="truncate text-sm font-semibold text-slate-100">
                ₹{addThousandsSeparator(item.amount)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
FinanceOverview.propTypes = {
  totalBalance: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  totalIncome: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  totalExpense: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
export default FinanceOverview;

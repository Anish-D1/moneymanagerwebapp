import { useEffect, useState } from "react";
import { prepareIncomeLineChartData } from "../util/util.js";
import CustomLineChart from "./CustomLineChart.jsx";
import { Plus } from "lucide-react";
import PropTypes from "prop-types";

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeLineChartData(transactions);
    setChartData(result);
  }, [transactions]);

  return (
    <div className="relative w-full min-w-0 max-w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 shadow-xl shadow-black/10 backdrop-blur-xl transition-colors duration-300 sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h5 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
            Income Overview
          </h5>

          <p className="mt-1 max-w-xl text-xs leading-5 text-slate-400 sm:text-sm">
            Track your earnings over time and analyze your income trends.
          </p>
        </div>

        <button
          type="button"
          onClick={onAddIncome}
          className="group inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl border border-emerald-400/30 bg-gradient-to-r from-emerald-600 to-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-950/20 transition duration-200 hover:-translate-y-0.5 hover:from-emerald-500 hover:to-green-500 hover:shadow-emerald-500/20 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:ring-offset-2 focus:ring-offset-[#080B16] sm:w-auto"
        >
          <Plus
            size={17}
            className="transition-transform duration-200 group-hover:rotate-90"
          />
          Add Income
        </button>
      </div>

      {/* Income chart */}
      <div className="mt-6 min-w-0 sm:mt-8">
        <CustomLineChart data={chartData} />
      </div>
    </div>
  );
};

IncomeOverview.propTypes = {
  transactions: PropTypes.array.isRequired,
  onAddIncome: PropTypes.func.isRequired,
};

export default IncomeOverview;

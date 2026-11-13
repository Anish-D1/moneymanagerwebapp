import Dashboard from "../components/Dashboard.jsx";
import { useUser } from "../hooks/useUser.jsx";
import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import axiosConfig from "../util/axiosConfig.jsx";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import toast from "react-hot-toast";
import TransactionInfoCard from "../components/TransactionInfoCard.jsx";
import moment from "moment";

const Filter = () => {
  useUser();

  const [type, setType] = useState("income");
  const [appliedType, setAppliedType] = useState("income");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [keyword, setKeyword] = useState("");
  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (event) => {
    event.preventDefault();

    if (startDate && endDate && startDate > endDate) {
      toast.error("Start date cannot be after the end date.");
      return;
    }

    setLoading(true);
    setHasSearched(true);

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.APPLY_FILTERS, {
        type,
        startDate,
        endDate,
        keyword: keyword.trim(),
        sortField,
        sortOrder,
      });

      setTransactions(Array.isArray(response.data) ? response.data : []);

      // Update the displayed transaction type only after
      // the filter request succeeds.
      setAppliedType(type);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to fetch transactions. Please try again.",
      );

      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setType("income");
    setAppliedType("income");
    setStartDate("");
    setEndDate("");
    setKeyword("");
    setSortField("date");
    setSortOrder("asc");
    setTransactions([]);
    setHasSearched(false);
  };

  const inputClassName =
    "w-full min-w-0 rounded-xl border border-white/10 bg-[#080B16]/80 px-3 py-2.5 text-sm text-slate-100 outline-none transition focus:border-violet-400/50 focus:ring-2 focus:ring-violet-400/15";

  const selectClassName = `${inputClassName} appearance-none cursor-pointer pr-10`;

  const dateInputClassName = `${inputClassName} date-input`;

  const labelClassName =
    "mb-1.5 block text-xs font-medium tracking-wide text-slate-400";

  const renderSelectArrow = () => (
    <ChevronDown
      size={16}
      aria-hidden="true"
      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
    />
  );

  return (
    <Dashboard activeMenu="Filters">
      <div className="mx-auto my-5 w-full min-w-0 max-w-full px-3 sm:px-4">
        {/* Page heading */}
        <div className="mb-6 flex min-w-0 items-start gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-300">
            <SlidersHorizontal size={21} />
          </div>

          <div className="min-w-0">
            <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
              Filter Transactions
            </h2>

            <p className="mt-1 text-sm leading-5 text-slate-400">
              Find and organize your income and expenses.
            </p>
          </div>
        </div>

        {/* Filter options */}
        <section className="mb-6 w-full min-w-0 rounded-2xl border border-white/10 bg-white/[0.03] p-4 shadow-xl shadow-black/10 backdrop-blur-xl transition-colors duration-300 sm:p-6">
          <div className="mb-5 flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-lg bg-violet-500/10 text-violet-300">
              <SlidersHorizontal size={17} />
            </div>

            <div>
              <h3 className="text-base font-semibold text-white">
                Filter options
              </h3>

              <p className="mt-0.5 text-xs text-slate-400">
                Choose your criteria below.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSearch}
            className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {/* Transaction type */}
            <div className="min-w-0">
              <label htmlFor="type" className={labelClassName}>
                Transaction type
              </label>

              <div className="relative">
                <select
                  value={type}
                  id="type"
                  className={selectClassName}
                  onChange={(event) => setType(event.target.value)}
                >
                  <option value="income" className="bg-[#0D1224]">
                    Income
                  </option>

                  <option value="expense" className="bg-[#0D1224]">
                    Expense
                  </option>
                </select>

                {renderSelectArrow()}
              </div>
            </div>

            {/* Start date */}
            <div className="min-w-0">
              <label htmlFor="startdate" className={labelClassName}>
                Start date
              </label>

              <input
                value={startDate}
                id="startdate"
                type="date"
                className={dateInputClassName}
                onChange={(event) => setStartDate(event.target.value)}
              />
            </div>

            {/* End date */}
            <div className="min-w-0">
              <label htmlFor="enddate" className={labelClassName}>
                End date
              </label>

              <input
                value={endDate}
                id="enddate"
                type="date"
                min={startDate || undefined}
                className={dateInputClassName}
                onChange={(event) => setEndDate(event.target.value)}
              />
            </div>

            {/* Sort field */}
            <div className="min-w-0">
              <label htmlFor="sortfield" className={labelClassName}>
                Sort by
              </label>

              <div className="relative">
                <select
                  value={sortField}
                  id="sortfield"
                  className={selectClassName}
                  onChange={(event) => setSortField(event.target.value)}
                >
                  <option value="date" className="bg-[#0D1224]">
                    Date
                  </option>

                  <option value="amount" className="bg-[#0D1224]">
                    Amount
                  </option>

                  <option value="category" className="bg-[#0D1224]">
                    Category
                  </option>
                </select>

                {renderSelectArrow()}
              </div>
            </div>

            {/* Sort order */}
            <div className="min-w-0">
              <label htmlFor="sortorder" className={labelClassName}>
                Sort order
              </label>

              <div className="relative">
                <select
                  value={sortOrder}
                  id="sortorder"
                  className={selectClassName}
                  onChange={(event) => setSortOrder(event.target.value)}
                >
                  <option value="asc" className="bg-[#0D1224]">
                    Ascending
                  </option>

                  <option value="desc" className="bg-[#0D1224]">
                    Descending
                  </option>
                </select>

                {renderSelectArrow()}
              </div>
            </div>

            {/* Search keyword */}
            <div className="min-w-0">
              <label htmlFor="keyword" className={labelClassName}>
                Search keyword
              </label>

              <input
                value={keyword}
                id="keyword"
                type="text"
                placeholder="Search transactions..."
                className={inputClassName}
                onChange={(event) => setKeyword(event.target.value)}
              />
            </div>

            {/* Actions */}
            <div className="flex min-w-0 flex-col gap-2 sm:col-span-2 sm:flex-row sm:items-center sm:justify-end lg:col-span-3">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white focus:outline-none focus:ring-2 focus:ring-white/20"
              >
                Reset filters
              </button>

              <button
                type="submit"
                disabled={loading}
                className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-violet-400/30 bg-gradient-to-r from-violet-600 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-950/20 transition duration-200 hover:-translate-y-0.5 hover:from-violet-500 hover:to-purple-500 hover:shadow-violet-500/20 focus:outline-none focus:ring-2 focus:ring-violet-400/50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Search
                  size={17}
                  className="transition-transform duration-200 group-hover:scale-110"
                />

                {loading ? "Applying..." : "Apply filters"}
              </button>
            </div>
          </form>
        </section>

        {/* Transaction results */}
        <section className="w-full min-w-0 rounded-2xl border border-white/10 bg-gradient-to-br from-[#111629]/90 via-[#0D1222]/85 to-[#0A0F1D]/90 p-4 shadow-[0_8px_32px_rgba(0,0,0,0.2)] backdrop-blur-xl transition-colors duration-300 sm:p-5 lg:p-6">
          <div className="mb-5 flex min-w-0 items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2.5">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-300">
                <ArrowUpDown size={17} />
              </div>

              <div className="min-w-0">
                <h3 className="text-base font-semibold text-white">
                  Transactions
                </h3>

                <p className="mt-0.5 text-xs text-slate-400">
                  {loading
                    ? "Finding matching transactions..."
                    : hasSearched
                      ? `${transactions.length} result${transactions.length === 1 ? "" : "s"} found`
                      : "Your filtered results will appear here."}
                </p>
              </div>
            </div>
          </div>

          {loading ? (
            <div
              className="flex min-h-36 flex-col items-center justify-center gap-3 text-center"
              role="status"
              aria-live="polite"
            >
              <div className="size-7 animate-spin rounded-full border-2 border-violet-400/20 border-t-violet-400" />

              <p className="text-sm text-slate-400">Loading transactions...</p>
            </div>
          ) : transactions.length > 0 ? (
            <div className="grid min-w-0 grid-cols-1 gap-3 md:grid-cols-2">
              {transactions.map((transaction, index) => (
                <TransactionInfoCard
                  key={
                    transaction.id ??
                    `${transaction.date}-${transaction.name}-${index}`
                  }
                  title={transaction.name}
                  icon={transaction.icon}
                  date={
                    transaction.date
                      ? moment(transaction.date).format("Do MMM YYYY")
                      : "Date unavailable"
                  }
                  amount={transaction.amount}
                  type={appliedType}
                  hideDeleteBtn
                />
              ))}
            </div>
          ) : (
            <div className="flex min-h-36 flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/[0.015] px-4 py-8 text-center">
              <div className="mb-3 flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-slate-400">
                <Search size={19} />
              </div>

              <p className="text-sm font-medium text-slate-300">
                {hasSearched
                  ? "No matching transactions"
                  : "Ready when you are"}
              </p>

              <p className="mt-1 max-w-sm text-xs leading-5 text-slate-500">
                {hasSearched
                  ? "Try adjusting your dates, keyword, or sorting options."
                  : "Select your filters above and apply them to find transactions."}
              </p>
            </div>
          )}
        </section>
      </div>
    </Dashboard>
  );
};

export default Filter;

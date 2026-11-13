import { ArrowRight, ReceiptText } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard.jsx";
import moment from "moment";
import PropTypes from "prop-types";

const Transactions = ({
  transactions,
  categories = [],
  onMore,
  type,
  title,
}) => {
  const recentTransactions = Array.isArray(transactions)
    ? transactions.slice(0, 5)
    : [];

  const safeCategories = Array.isArray(categories) ? categories : [];
  const isIncome = type === "income";

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 p-5 shadow-lg shadow-black/10 backdrop-blur-xl transition-all duration-300 hover:border-violet-400/20 sm:p-6">
      <div
        className={`pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full blur-3xl ${
          isIncome ? "bg-emerald-500/10" : "bg-rose-500/10"
        }`}
      />

      <div className="relative flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h5 className="truncate text-lg font-semibold tracking-tight text-white">
            {title}
          </h5>
          <p className="mt-1 text-sm text-slate-400">
            {isIncome
              ? "Your latest income entries"
              : "Your latest expense entries"}
          </p>
        </div>

        <button
          type="button"
          onClick={onMore}
          className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-slate-300 transition-all duration-200 hover:border-violet-400/30 hover:bg-violet-500/10 hover:text-white sm:px-4 sm:text-sm"
        >
          More
          <ArrowRight size={15} className="transition-transform duration-200" />
        </button>
      </div>

      <div className="relative mt-6">
        {recentTransactions.length > 0 ? (
          <div className="divide-y divide-white/[0.06]">
            {recentTransactions.map((item, index) => {
              const category = safeCategories.find(
                (categoryItem) =>
                  String(categoryItem.id) === String(item.categoryId) &&
                  categoryItem.type?.toLowerCase() === type?.toLowerCase(),
              );

              const transactionIcon = item.icon || category?.icon || "";

              return (
                <div
                  key={`${type}-${item.id ?? "item"}-${index}`}
                  className="py-1 first:pt-0 last:pb-0"
                >
                  <TransactionInfoCard
                    title={item.name}
                    icon={transactionIcon}
                    date={
                      item.date && moment(item.date).isValid()
                        ? moment(item.date).format("Do MMM YYYY")
                        : "Date unavailable"
                    }
                    amount={item.amount}
                    type={type}
                    hideDeleteBtn
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
              <ReceiptText className="h-5 w-5 text-slate-400" />
            </div>

            <p className="text-sm font-medium text-slate-300">
              No {isIncome ? "income" : "expenses"} yet
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Your recent entries will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

Transactions.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      date: PropTypes.string,
      categoryId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ),
  categories: PropTypes.array,
  onMore: PropTypes.func,
  type: PropTypes.string,
  title: PropTypes.string,
};

export default Transactions;

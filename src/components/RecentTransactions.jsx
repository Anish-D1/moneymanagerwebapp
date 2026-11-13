import { ArrowRight, ReceiptText } from "lucide-react";
import PropTypes from "prop-types";
import TransactionInfoCard from "./TransactionInfoCard.jsx";
import moment from "moment";

const RecentTransactions = ({
  transactions,
  categories = [],
  recent5Expenses = [],
  recent5Incomes = [],
  onMore,
}) => {
  const recentTransactions = Array.isArray(transactions)
    ? transactions.slice(0, 5)
    : [];

  const allCategoryTransactions = [
    ...(Array.isArray(recent5Expenses)
      ? recent5Expenses.map((transaction) => ({
          ...transaction,
          type: "expense",
        }))
      : []),
    ...(Array.isArray(recent5Incomes)
      ? recent5Incomes.map((transaction) => ({
          ...transaction,
          type: "income",
        }))
      : []),
  ];

  const safeCategories = Array.isArray(categories) ? categories : [];

  return (
    <div className="relative w-full min-w-0 max-w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 p-4 shadow-lg shadow-black/10 backdrop-blur-xl transition-all duration-300 hover:border-violet-400/20 sm:p-6">
      <div className="pointer-events-none absolute -left-12 -top-12 h-32 w-32 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h4 className="text-lg font-semibold tracking-tight text-white">
            Recent Transactions
          </h4>
          <p className="mt-1 text-sm text-slate-400">
            Your latest financial activity
          </p>
        </div>

        <button
          type="button"
          onClick={onMore}
          className="group inline-flex shrink-0 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-slate-300 transition-all duration-200 hover:border-violet-400/30 hover:bg-violet-500/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-violet-400/50 sm:px-4 sm:text-sm"
        >
          More
          <ArrowRight
            size={15}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </button>
      </div>

      <div className="relative mt-6">
        {recentTransactions.length > 0 ? (
          <div className="divide-y divide-white/[0.06]">
            {recentTransactions.map((item, index) => {
              const matchingTransaction = allCategoryTransactions.find(
                (transaction) =>
                  String(transaction.id) === String(item.id) &&
                  transaction.type?.toLowerCase() === item.type?.toLowerCase(),
              );

              const category = safeCategories.find(
                (categoryItem) =>
                  String(categoryItem.id) ===
                  String(matchingTransaction?.categoryId),
              );

              const transactionIcon =
                item.icon || matchingTransaction?.icon || category?.icon || "";

              return (
                <div
                  key={`recent-transaction-${item.type}-${item.id ?? "item"}-${index}`}
                  className="min-w-0 py-1 first:pt-0 last:pb-0"
                >
                  <TransactionInfoCard
                    title={item.name || "Untitled transaction"}
                    icon={transactionIcon}
                    date={
                      item.date && moment(item.date).isValid()
                        ? moment(item.date).format("Do MMM YYYY")
                        : "Date unavailable"
                    }
                    amount={item.amount}
                    type={item.type}
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
              No transactions yet
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Your recent activity will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const transactionShape = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
  type: PropTypes.string,
  amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  date: PropTypes.string,
  icon: PropTypes.string,
  categoryId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
});

RecentTransactions.propTypes = {
  transactions: PropTypes.arrayOf(transactionShape).isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      icon: PropTypes.string,
    }),
  ),
  recent5Expenses: PropTypes.arrayOf(transactionShape),
  recent5Incomes: PropTypes.arrayOf(transactionShape),
  onMore: PropTypes.func.isRequired,
};

export default RecentTransactions;

import { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Download, LoaderCircle, Mail, Wallet } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard.jsx";

const ExpenseList = ({
  transactions,
  categories = [],
  onEdit,
  onDelete,
  onDownload,
  onEmail,
}) => {
  const [loadingAction, setLoadingAction] = useState(null);

  const handleAction = async (action, callback) => {
    if (loadingAction || typeof callback !== "function") return;

    setLoadingAction(action);

    try {
      await callback();
    } finally {
      setLoadingAction(null);
    }
  };

  const expenseTransactions = Array.isArray(transactions) ? transactions : [];

  const expenseCategories = Array.isArray(categories) ? categories : [];

  return (
    <div className="w-full min-w-0 max-w-full rounded-2xl border border-white/10 bg-gradient-to-br from-[#111629]/90 via-[#0D1222]/85 to-[#0A0F1D]/90 p-4 shadow-[0_8px_32px_rgba(0,0,0,0.2)] backdrop-blur-xl transition-colors duration-300 sm:p-5 lg:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h5 className="text-lg font-semibold text-white sm:text-xl">
            All Expenses
          </h5>

          <p className="mt-1 text-xs leading-5 text-slate-400">
            Review your spending and manage your expense records.
          </p>
        </div>

        <div className="grid w-full grid-cols-2 gap-2 sm:w-auto">
          <button
            type="button"
            disabled={loadingAction !== null}
            onClick={() => handleAction("email", onEmail)}
            className="inline-flex min-h-10 min-w-0 items-center justify-center gap-2 rounded-xl border border-violet-400/25 bg-gradient-to-r from-violet-600/20 to-purple-500/10 px-3 py-2 text-sm font-medium text-violet-200 shadow-[0_0_18px_rgba(139,92,246,0.06)] transition-all duration-200 hover:border-violet-300/50 hover:from-violet-600/30 hover:to-purple-500/20 hover:text-white hover:shadow-[0_0_22px_rgba(139,92,246,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/70 disabled:cursor-not-allowed disabled:opacity-50 sm:px-4"
          >
            {loadingAction === "email" ? (
              <>
                <LoaderCircle size={16} className="shrink-0 animate-spin" />
                <span>Emailing...</span>
              </>
            ) : (
              <>
                <Mail size={16} className="shrink-0" />
                <span>Email</span>
              </>
            )}
          </button>

          <button
            type="button"
            disabled={loadingAction !== null}
            onClick={() => handleAction("download", onDownload)}
            className="inline-flex min-h-10 min-w-0 items-center justify-center gap-2 rounded-xl border border-cyan-400/25 bg-gradient-to-r from-cyan-500/15 to-sky-500/10 px-3 py-2 text-sm font-medium text-cyan-200 shadow-[0_0_18px_rgba(34,211,238,0.05)] transition-all duration-200 hover:border-cyan-300/50 hover:from-cyan-500/25 hover:to-sky-500/20 hover:text-white hover:shadow-[0_0_22px_rgba(34,211,238,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70 disabled:cursor-not-allowed disabled:opacity-50 sm:px-4"
          >
            {loadingAction === "download" ? (
              <>
                <LoaderCircle size={16} className="shrink-0 animate-spin" />
                <span>Downloading...</span>
              </>
            ) : (
              <>
                <Download size={16} className="shrink-0" />
                <span>Download</span>
              </>
            )}
          </button>
        </div>
      </div>

      {expenseTransactions.length > 0 ? (
        <div className="mt-5 grid min-w-0 grid-cols-1 gap-3 md:grid-cols-2">
          {expenseTransactions.map((expense, index) => {
            const category = expenseCategories.find(
              (item) => String(item.id) === String(expense.categoryId),
            );

            const transactionIcon = expense.icon || category?.icon || "";

            return (
              <TransactionInfoCard
                key={expense.id ?? `expense-${index}`}
                title={expense.name}
                icon={transactionIcon}
                date={
                  expense.date
                    ? moment(expense.date).format("Do MMM YYYY")
                    : "Date unavailable"
                }
                amount={expense.amount}
                type="expense"
                onEdit={
                  typeof onEdit === "function"
                    ? () => onEdit(expense)
                    : undefined
                }
                onDelete={() => onDelete(expense.id)}
              />
            );
          })}
        </div>
      ) : (
        <div className="mt-5 flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/[0.02] px-4 py-10 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-rose-400/20 bg-rose-500/10 text-rose-300">
            <Wallet size={22} />
          </div>

          <h6 className="mt-4 text-sm font-semibold text-white">
            No expense records yet
          </h6>

          <p className="mt-1 max-w-sm text-xs leading-5 text-slate-400">
            Your expense transactions will appear here once you add them.
          </p>
        </div>
      )}
    </div>
  );
};

ExpenseList.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      categoryId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
      icon: PropTypes.string,
      date: PropTypes.string,
      amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ).isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      icon: PropTypes.string,
    }),
  ),
  onEdit: PropTypes.func,
  onDelete: PropTypes.func.isRequired,
  onDownload: PropTypes.func,
  onEmail: PropTypes.func,
};

export default ExpenseList;

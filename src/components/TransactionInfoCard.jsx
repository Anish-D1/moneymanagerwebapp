import {
  Pencil,
  Trash2,
  TrendingDown,
  TrendingUp,
  UtensilsCrossed,
} from "lucide-react";
import PropTypes from "prop-types";
import { addThousandsSeparator } from "../util/util.js";

const TransactionInfoCard = ({
  icon,
  title,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete,
  onEdit,
}) => {
  const isIncome = type === "income";

  const amountStyles = isIncome
    ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
    : "border-rose-400/20 bg-rose-400/10 text-rose-300";

  return (
    <div className="group relative flex w-full min-w-0 items-center gap-3 overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.045] to-white/[0.015] p-3 shadow-[0_4px_20px_rgba(0,0,0,0.12)] transition-all duration-300 hover:border-violet-400/25 hover:from-violet-400/[0.06] hover:to-cyan-400/[0.02] hover:shadow-[0_8px_28px_rgba(139,92,246,0.08)] sm:gap-4 sm:p-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-violet-400/15 bg-gradient-to-br from-violet-400/10 to-cyan-400/5 sm:h-12 sm:w-12">
        {icon ? (
          <img
            src={icon}
            alt={title || "Transaction"}
            className="h-6 w-6 object-contain"
          />
        ) : (
          <UtensilsCrossed className="h-5 w-5 text-violet-300" />
        )}
      </div>

      <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-slate-100 transition-colors group-hover:text-white">
            {title || "Untitled transaction"}
          </p>
          <p className="mt-1 truncate text-xs text-slate-400">
            {date || "Date unavailable"}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          {typeof onEdit === "function" && (
            <button
              type="button"
              onClick={onEdit}
              aria-label={`Edit ${title || "transaction"}`}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-transparent text-slate-400 transition-all duration-200 hover:border-cyan-400/20 hover:bg-cyan-400/10 hover:text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100"
            >
              <Pencil size={16} />
            </button>
          )}

          {!hideDeleteBtn && (
            <button
              type="button"
              onClick={onDelete}
              aria-label={`Delete ${title || "transaction"}`}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-transparent text-slate-400 transition-all duration-200 hover:border-rose-400/20 hover:bg-rose-400/10 hover:text-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-400/50 sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100"
            >
              <Trash2 size={16} />
            </button>
          )}

          <div
            className={`flex shrink-0 items-center gap-1.5 rounded-xl border px-2 py-2 sm:gap-2 sm:px-3 ${amountStyles}`}
          >
            <span className="whitespace-nowrap text-xs font-bold tabular-nums sm:text-sm">
              {isIncome ? "+" : "-"}₹{addThousandsSeparator(amount ?? 0)}
            </span>

            {isIncome ? (
              <TrendingUp size={14} className="shrink-0" />
            ) : (
              <TrendingDown size={14} className="shrink-0" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

TransactionInfoCard.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  date: PropTypes.string,
  amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  type: PropTypes.oneOf(["income", "expense"]).isRequired,
  hideDeleteBtn: PropTypes.bool,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
};

export default TransactionInfoCard;

import PropTypes from "prop-types";
import { addThousandsSeparator } from "../util/util.js";

const CustomTooltip = ({ active, payload }) => {
  if (!active || !Array.isArray(payload) || payload.length === 0) {
    return null;
  }

  const item = payload[0];
  const name = String(item?.name ?? "Uncategorized");
  const amount = Number(item?.value);

  const normalizedName = name.toLowerCase();

  let nameColor = "text-violet-300";

  if (normalizedName.includes("income")) {
    nameColor = "text-emerald-400";
  } else if (normalizedName.includes("expense")) {
    nameColor = "text-rose-400";
  } else if (normalizedName.includes("balance")) {
    nameColor = "text-violet-300";
  }

  const formattedAmount = Number.isFinite(amount)
    ? addThousandsSeparator(amount)
    : "0";

  return (
    <div className="rounded-xl border border-white/10 bg-[#11172A]/95 p-3 shadow-xl shadow-black/30 backdrop-blur-xl">
      <p className={`mb-1 break-words text-xs font-semibold ${nameColor}`}>
        {name}
      </p>

      <p className="text-xs text-slate-400">Amount</p>

      <p className="mt-1 text-sm font-semibold text-white">
        ₹{formattedAmount}
      </p>
    </div>
  );
};

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ),
};

export default CustomTooltip;

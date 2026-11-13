import PropTypes from "prop-types";


const InfoCard = ({ icon, label, value, color }) => {
    const cardThemes = {
        balance: {
            border: "border-violet-400/20 hover:border-violet-400/50",
            background: "from-violet-500/[0.12] to-indigo-500/[0.04]",
            glow: "bg-violet-500/20",
            icon: "bg-violet-500/15 text-violet-300 ring-1 ring-violet-400/25",
            label: "text-slate-400",
            value: "text-white",
            accent: "bg-violet-400",
        },
        expense: {
            border: "border-rose-400/20 hover:border-rose-400/50",
            background: "from-rose-500/[0.12] to-red-500/[0.04]",
            glow: "bg-rose-500/20",
            icon: "bg-rose-500/15 text-rose-300 ring-1 ring-rose-400/25",
            label: "text-slate-400",
            value: "text-rose-100",
            accent: "bg-rose-400",
        },
        income: {
            border: "border-emerald-400/20 hover:border-emerald-400/50",
            background: "from-emerald-500/[0.12] to-green-500/[0.04]",
            glow: "bg-emerald-500/20",
            icon: "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/25",
            label: "text-slate-400",
            value: "text-emerald-100",
            accent: "bg-emerald-400",
        },
    };

    const text = `${label ?? ""} ${color ?? ""}`.toLowerCase();

    let theme = cardThemes.balance;

    if (
        text.includes("expense") ||
        text.includes("rose") ||
        text.includes("red")
    ) {
        theme = cardThemes.expense;
    } else if (
        text.includes("income") ||
        text.includes("emerald") ||
        text.includes("green")
    ) {
        theme = cardThemes.income;
    }

    const formattedValue = value ?? 0;

    return (
        <div
            className={`group relative flex min-w-0 items-center gap-4 overflow-hidden rounded-2xl border bg-gradient-to-br ${theme.background} ${theme.border} bg-[#101629]/80 p-4 shadow-lg shadow-black/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:gap-5 sm:p-6`}
        >
            <div
                aria-hidden="true"
                className={`pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full ${theme.glow} blur-3xl transition-transform duration-500 group-hover:scale-125`}
            />

            <div
                className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-105 sm:h-14 sm:w-14 ${theme.icon}`}
            >
                {icon}
            </div>

            <div className="relative min-w-0 flex-1">
                <p className={`mb-2 text-xs font-medium tracking-wide sm:text-sm ${theme.label}`}>
                    {label || "Summary"}
                </p>

                <p
                    className={`break-words text-xl font-bold tracking-tight [overflow-wrap:anywhere] sm:text-2xl lg:text-3xl ${theme.value}`}
                >
                    <span className="mr-1 text-sm font-medium opacity-70 sm:text-base">
                        ₹
                    </span>
                    {formattedValue}
                </p>

                <div className="mt-3 h-1 w-10 overflow-hidden rounded-full bg-white/[0.06]">
                    <div
                        className={`h-full w-full rounded-full ${theme.accent} opacity-70 transition-all duration-300 group-hover:w-full`}
                    />
                </div>
            </div>
        </div>
    );
};

InfoCard.propTypes = {
    icon: PropTypes.node.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    color: PropTypes.string,
};

export default InfoCard;

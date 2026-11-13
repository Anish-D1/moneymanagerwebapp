import {
    LayoutDashboard,
    TrendingUp,
    ReceiptText,
    SlidersHorizontal,
    ArrowUpRight,
} from "lucide-react";

const features = [
    {
        number: "01",
        title: "See the whole picture",
        description:
            "Get a clear overview of your finances, with income, expenses, and activity in one place.",
        icon: LayoutDashboard,
        accent: "from-violet-500/20 to-indigo-500/5",
        iconColor: "text-violet-300",
        glow: "group-hover:shadow-violet-500/10",
    },
    {
        number: "02",
        title: "Follow your income",
        description:
            "Record your earnings and organize where your money comes from.",
        icon: TrendingUp,
        accent: "from-emerald-500/20 to-teal-500/5",
        iconColor: "text-emerald-300",
        glow: "group-hover:shadow-emerald-500/10",
    },
    {
        number: "03",
        title: "Understand spending",
        description:
            "Keep track of expenses and see how everyday purchases add up over time.",
        icon: ReceiptText,
        accent: "from-rose-500/20 to-pink-500/5",
        iconColor: "text-rose-300",
        glow: "group-hover:shadow-rose-500/10",
    },
    {
        number: "04",
        title: "Find what matters",
        description:
            "Filter transactions and organize financial activity to find useful details faster.",
        icon: SlidersHorizontal,
        accent: "from-cyan-500/20 to-blue-500/5",
        iconColor: "text-cyan-300",
        glow: "group-hover:shadow-cyan-500/10",
    },
];

const FeaturesSection = () => {
    return (
        <section className="relative overflow-hidden bg-[#080B16] px-5 py-24 text-white sm:px-8 md:py-32">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-40 top-1/3 h-80 w-80 rounded-full bg-violet-600/[0.08] blur-[110px]"
            />

            <div className="relative mx-auto max-w-7xl">
                <div className="mx-auto max-w-3xl text-center">
                    <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/15 bg-cyan-300/[0.05] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200 sm:text-sm">
                        Built for clarity
                    </span>

                    <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
                        Your finances.
                        <span className="block bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
                            Without the confusion.
                        </span>
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
                        The essentials you need to understand your money,
                        stay organized, and make more informed decisions.
                    </p>
                </div>

                <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
                    {features.map((feature) => {
                        const Icon = feature.icon;

                        return (
                            <article
                                key={feature.number}
                                className={`group relative flex min-h-[285px] flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 transition duration-300 hover:-translate-y-1 hover:border-white/[0.16] hover:bg-white/[0.045] hover:shadow-2xl ${feature.glow}`}
                            >
                                <div
                                    aria-hidden="true"
                                    className={`absolute -right-12 -top-12 h-36 w-36 rounded-full bg-gradient-to-br ${feature.accent} opacity-70 blur-2xl transition duration-500 group-hover:scale-125`}
                                />

                                <div className="relative flex items-center justify-between">
                                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.08] bg-gradient-to-br ${feature.accent} ${feature.iconColor}`}>
                                        <Icon size={22} strokeWidth={1.8} />
                                    </div>

                                    <span className="text-xs font-medium tracking-[0.15em] text-slate-600">
                                        {feature.number}
                                    </span>
                                </div>

                                <h3 className="relative mt-8 text-xl font-semibold tracking-tight text-white">
                                    {feature.title}
                                </h3>

                                <p className="relative mt-3 flex-1 text-sm leading-7 text-slate-400">
                                    {feature.description}
                                </p>

                                <div className={`relative mt-6 flex items-center gap-2 text-xs font-semibold ${feature.iconColor}`}>
                                    <span>Explore your finances</span>
                                    <ArrowUpRight
                                        size={15}
                                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                    />
                                </div>
                            </article>
                        );
                    })}
                </div>

                <div className="mt-12 flex flex-col items-center justify-between gap-5 rounded-2xl border border-white/[0.08] bg-gradient-to-r from-violet-500/[0.08] via-white/[0.025] to-cyan-500/[0.06] p-6 sm:flex-row sm:p-8">
                    <div>
                        <h3 className="text-lg font-semibold text-white sm:text-xl">
                            A clearer view starts with one step.
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-slate-400">
                            Start organizing your income and expenses with Money Manager.
                        </p>
                    </div>

                    <a
                        href="/signup"
                        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#080B16] transition hover:bg-cyan-100"
                    >
                        Get started
                        <ArrowUpRight size={17} />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
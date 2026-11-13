import { ArrowRight, TrendingUp, Wallet, Receipt, ChartNoAxesCombined } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
return (
<section className="relative isolate overflow-hidden bg-[#080B16] text-white">
{/* Ambient background */}
<div
             aria-hidden="true"
             className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
         >
<div className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-violet-600/20 blur-[120px]" />
<div className="absolute -right-32 top-32 h-96 w-96 rounded-full bg-cyan-500/15 blur-[120px]" />
<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.08),transparent_65%)]" />
<div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
</div>

        <div className="container mx-auto grid min-h-[650px] max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-2 lg:gap-16">
            {/* Hero copy */}
            <div className="relative z-10 mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
                <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-violet-400/[0.08] px-4 py-2 text-sm text-violet-200 shadow-lg shadow-violet-950/20">
                    <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300" />
                    </span>
                    Your money, with more clarity
                </div>

                <h1 className="text-4xl font-black leading-[1.12] tracking-tight sm:text-5xl md:text-6xl xl:text-7xl">
                    Make every
                    <span className="block">rupee count.</span>
                    <span className="mt-2 block bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
                        Own your future.
                    </span>
                </h1>

                <p className="mx-auto mt-7 max-w-xl text-base leading-8 text-slate-400 sm:text-lg lg:mx-0">
                    Understand where your money goes, keep your spending in check,
                    and build better financial habits — all in one place.
                </p>

                <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
                    <Link
                        to="/signup"
                        className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-7 py-4 font-semibold text-white shadow-xl shadow-violet-950/40 transition duration-300 hover:-translate-y-1 hover:from-violet-500 hover:to-indigo-500 hover:shadow-violet-500/20 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:ring-offset-2 focus:ring-offset-[#080B16]"
                    >
                        Get started for free
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>

                    <Link
                        to="/login"
                        className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-7 py-4 font-semibold text-slate-200 backdrop-blur transition duration-300 hover:border-cyan-300/30 hover:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-cyan-300"
                    >
                        Sign in to your account
                    </Link>
                </div>

                <div className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-slate-500 lg:justify-start">
                    <span className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        Income tracking
                    </span>
                    <span className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                        Expense insights
                    </span>
                    <span className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                        Clear overview
                    </span>
                </div>
            </div>

            {/* Decorative finance dashboard preview */}
            <div className="relative mx-auto w-full max-w-xl lg:ml-auto">
                <div
                    aria-hidden="true"
                    className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-violet-600/20 via-transparent to-cyan-500/20 blur-2xl"
                />

                <div className="relative rotate-0 rounded-3xl border border-white/10 bg-[#101629]/90 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl transition duration-500 hover:-translate-y-1 sm:p-6">
                    <div className="flex items-center justify-between border-b border-white/[0.08] pb-5">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
                                <Wallet size={20} />
                            </div>
                            <div>
                                <p className="font-semibold text-white">Money overview</p>
                                <p className="mt-0.5 text-xs text-slate-500">Your finances at a glance</p>
                            </div>
                        </div>
                        <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
                            Preview
                        </span>
                    </div>

                    <div className="mt-6 rounded-2xl border border-white/[0.08] bg-gradient-to-br from-violet-500/[0.12] to-cyan-500/[0.04] p-5">
                        <p className="text-sm text-slate-400">Track your total balance</p>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Stay in control
                        </p>
                        <div className="mt-4 flex items-center gap-2 text-sm text-cyan-300">
                            <ChartNoAxesCombined size={17} />
                            <span>See the bigger picture</span>
                        </div>

                        <div className="mt-6 flex h-24 items-end gap-2 sm:h-28">
                            {[32, 46, 38, 58, 49, 72, 62, 84, 68, 95, 77, 100].map(
                                (height, index) => (
                                    <div
                                        key={index}
                                        className="flex-1 rounded-t-md bg-gradient-to-t from-violet-600/70 to-cyan-300/80 transition-opacity duration-300 hover:opacity-70"
                                        style={{ height: `${height}%` }}
                                    />
                                )
                            )}
                        </div>
                        <div className="mt-3 flex justify-between text-xs text-slate-500">
                            <span>Overview</span>
                            <span>Illustrative preview</span>
                        </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
                            <div className="flex items-center gap-2 text-sm text-slate-400">
                                <span className="rounded-lg bg-emerald-400/10 p-2 text-emerald-300">
                                    <TrendingUp size={17} />
                                </span>
                                Income
                            </div>
                            <p className="mt-3 text-lg font-semibold text-white">Track inflow</p>
                            <p className="mt-1 text-xs text-slate-500">Organize earnings</p>
                        </div>

                        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
                            <div className="flex items-center gap-2 text-sm text-slate-400">
                                <span className="rounded-lg bg-rose-400/10 p-2 text-rose-300">
                                    <Receipt size={17} />
                                </span>
                                Expenses
                            </div>
                            <p className="mt-3 text-lg font-semibold text-white">Track outflow</p>
                            <p className="mt-1 text-xs text-slate-500">Understand spending</p>
                        </div>
                    </div>

                    <p className="mt-4 text-center text-xs text-slate-500">
                        Sample visual · Not live account data
                    </p>
                </div>
            </div>
        </div>
    </section>
);

};

export default HeroSection;
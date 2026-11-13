import { Link } from "react-router-dom";
import { ArrowUpRight, Wallet } from "lucide-react";

const Footer = () => {
    return (
        <footer className="border-t border-white/[0.08] bg-[#060912] px-5 text-white sm:px-8">
            <div className="mx-auto max-w-7xl py-14">
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="sm:col-span-2">
                        <Link to="/" className="inline-flex items-center gap-3">
                            <Wallet className="h-8 w-8 text-violet-300" strokeWidth={1.7} />
                            <span className="text-xl font-bold tracking-tight">
                                Money{" "}
                                <span className="bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text text-transparent">
                                    Manager
                                </span>
                            </span>
                        </Link>

                        <p className="mt-4 max-w-sm text-sm leading-7 text-slate-400">
                            A clearer view of your income and expenses.
                            Build better financial habits, one step at a time.
                        </p>

                        <Link
                            to="/signup"
                            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition-colors hover:text-cyan-200"
                        >
                            Start managing your money
                            <ArrowUpRight size={16} />
                        </Link>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white">Explore</h3>
                        <nav className="mt-4 flex flex-col items-start gap-3">
                            <Link to="/" className="text-sm text-slate-400 transition-colors hover:text-white">
                                Landing page
                            </Link>
                            <Link to="/home" className="text-sm text-slate-400 transition-colors hover:text-white">
                                Dashboard
                            </Link>
                            <Link to="/about" className="text-sm text-slate-400 transition-colors hover:text-white">
                                About us
                            </Link>
                            <Link to="/contact" className="text-sm text-slate-400 transition-colors hover:text-white">
                                Contact us
                            </Link>
                        </nav>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white">Your account</h3>
                        <nav className="mt-4 flex flex-col items-start gap-3">
                            <Link to="/login" className="text-sm text-slate-400 transition-colors hover:text-white">
                                Login
                            </Link>
                            <Link to="/signup" className="text-sm text-slate-400 transition-colors hover:text-white">
                                Create an account
                            </Link>
                        </nav>
                    </div>
                </div>

                <div className="mt-12 flex flex-col gap-3 border-t border-white/[0.08] pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                    <p>© {new Date().getFullYear()} Money Manager. All rights reserved.</p>
                    <p>Made to help you understand your money.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
import { useState } from "react";
import { assets } from "../assets/assets.js";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { name: "Home", to: "/home" },
        { name: "About us", to: "/about" },
        { name: "Contact us", to: "/contact" },
    ];

    const closeMenu = () => setIsMenuOpen(false);

    const desktopLinkClass = ({ isActive }) =>
        `relative whitespace-nowrap py-2 text-sm font-semibold transition-colors duration-200 ${
            isActive
                ? "text-cyan-300"
                : "text-slate-300 hover:text-cyan-200"
        }`;

    const mobileLinkClass = ({ isActive }) =>
        `flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-colors duration-200 ${
            isActive
                ? "border border-violet-400/25 bg-violet-500/15 text-cyan-200"
                : "border border-transparent text-slate-300 hover:bg-white/[0.05] hover:text-cyan-200"
        }`;

    return (
        <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#080B16]/90 text-white backdrop-blur-xl">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
                <div className="flex h-[76px] items-center justify-between gap-6">
                    <Link
                        to="/home"
                        onClick={closeMenu}
                        className="flex shrink-0 items-center gap-2.5"
                        aria-label="Money Manager home"
                    >
                        <img
                            src={assets.appIcon}
                            alt="Money Manager logo"
                            className="block h-10 w-10 shrink-0 object-contain"
                        />
                        <span className="whitespace-nowrap text-lg font-bold tracking-tight sm:text-xl">
                            Money{" "}
                            <span className="bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text text-transparent">
                                Manager
                            </span>
                        </span>
                    </Link>

                    <nav
                        aria-label="Main navigation"
                        className="hidden items-center gap-8 lg:flex"
                    >
                        {navLinks.map((link) => (
                            <NavLink
                                to={link.to}
                                key={link.name}
                                end
                                className={desktopLinkClass}
                            >
                                {({ isActive }) => (
                                    <span className="relative inline-block pb-1">
                                        {link.name}
                                        {isActive && (
                                            <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-gradient-to-r from-violet-400 to-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.4)]" />
                                        )}
                                    </span>
                                )}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="hidden shrink-0 items-center gap-5 sm:flex">
                        <Link
                            to="/login"
                            className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
                        >
                            Login
                        </Link>
                        <Link
                            to="/signup"
                            className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:from-violet-500 hover:to-indigo-500"
                        >
                            Get Started
                        </Link>
                    </div>

                    <button
                        type="button"
                        onClick={() => setIsMenuOpen((open) => !open)}
                        className="shrink-0 rounded-lg p-2 text-slate-200 transition-colors hover:bg-white/[0.06] lg:hidden"
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isMenuOpen}
                    >
                        {isMenuOpen ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <Menu className="h-5 w-5" />
                        )}
                    </button>
                </div>
            </div>

            {isMenuOpen && (
                <div className="border-t border-white/[0.08] bg-[#0B1020] lg:hidden">
                    <nav
                        aria-label="Mobile navigation"
                        className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-4 sm:px-8"
                    >
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.to}
                                end
                                onClick={closeMenu}
                                className={mobileLinkClass}
                            >
                                {({ isActive }) => (
                                    <>
                                        <span>{link.name}</span>
                                        {isActive && (
                                            <span className="flex items-center gap-2 text-xs text-cyan-300">
                                                <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                                                Current page
                                            </span>
                                        )}
                                    </>
                                )}
                            </NavLink>
                        ))}

                        <div className="mt-2 flex gap-3 border-t border-white/[0.08] pt-4 sm:hidden">
                            <Link
                                to="/login"
                                onClick={closeMenu}
                                className="flex-1 rounded-xl border border-white/10 px-4 py-3 text-center text-sm font-medium text-slate-200"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                onClick={closeMenu}
                                className="flex-1 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-3 text-center text-sm font-semibold text-white"
                            >
                                Get Started
                            </Link>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
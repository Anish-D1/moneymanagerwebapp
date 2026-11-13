import { useState, useRef, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { User, LogOut, X, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";
import { AppContext } from "../context/AppContextValue.jsx";
import Sidebar from "./Sidebar.jsx";

const Menubar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const { clearUser, user } = useContext(AppContext);
  const navigate = useNavigate();

  // Close profile dropdown when clicking outside.
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [showDropdown]);

  // Close the mobile menu when switching to desktop width.
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1081px)");

    const handleBreakpointChange = (event) => {
      if (event.matches) {
        setOpenSideMenu(false);
      }
    };

    handleBreakpointChange(mediaQuery);
    mediaQuery.addEventListener("change", handleBreakpointChange);

    return () => {
      mediaQuery.removeEventListener("change", handleBreakpointChange);
    };
  }, []);

  // Prevent the page behind the mobile menu from scrolling.
  useEffect(() => {
    if (!openSideMenu) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [openSideMenu]);

  const toggleDropdown = () => {
    setShowDropdown((previous) => !previous);
    setOpenSideMenu(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    setShowDropdown(false);
    setOpenSideMenu(false);
    navigate("/login");
  };

  const closeMobileMenu = () => {
    setOpenSideMenu(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 flex min-h-[73px] items-center justify-between gap-3 border-b border-white/10 bg-[#080B16]/90 px-3 py-3 backdrop-blur-2xl sm:gap-5 sm:px-6 sm:py-4">
        {/* Left: hamburger and logo */}
        <div className="flex min-w-0 items-center gap-2 sm:gap-4">
          <button
            type="button"
            aria-label={
              openSideMenu ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={openSideMenu}
            aria-controls="mobile-navigation"
            onClick={() => {
              setOpenSideMenu((previous) => !previous);
              setShowDropdown(false);
            }}
            className="relative z-[60] flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-300 transition-colors hover:border-violet-400/30 hover:bg-violet-500/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-violet-400/50 min-[1081px]:hidden"
          >
            {openSideMenu ? <X size={22} /> : <Menu size={22} />}
          </button>

          <button
            type="button"
            onClick={() => {
              navigate("/");
              closeMobileMenu();
            }}
            aria-label="Money Manager home"
            className="flex min-w-0 items-center gap-2 rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-violet-400/50 sm:gap-3"
          >
            <img
              src={assets.appIcon}
              alt="Money Manager Pro icon"
              className="h-8 w-8 shrink-0 rounded-lg object-contain sm:h-10 sm:w-10"
            />
            <span className="truncate text-sm font-semibold tracking-tight text-white sm:text-lg">
              Money Manager
            </span>
          </button>
        </div>

        {/* Right: profile dropdown */}
        <div className="relative z-[60] shrink-0" ref={dropdownRef}>
          <button
            type="button"
            aria-label="Open profile menu"
            aria-expanded={showDropdown}
            onClick={toggleDropdown}
            className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-white/10 transition-colors duration-200 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-violet-400"
          >
            {user?.profileImageUrl ? (
              <img
                src={user.profileImageUrl}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <User className="h-5 w-5 text-slate-300" />
            )}
          </button>

          {showDropdown && (
            <div className="absolute right-0 z-[70] mt-3 w-[min(16rem,calc(100vw-1.5rem))] overflow-hidden rounded-2xl border border-white/10 bg-[#111629]/95 py-2 shadow-2xl shadow-black/40 backdrop-blur-2xl">
              <div className="flex items-center gap-3 border-b border-white/10 px-4 py-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/10">
                  {user?.profileImageUrl ? (
                    <img
                      src={user.profileImageUrl}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User className="h-5 w-5 text-violet-300" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-white">
                    {user?.fullName || "User"}
                  </p>
                  <p className="truncate text-xs text-slate-400">
                    {user?.email || ""}
                  </p>
                </div>
              </div>

              <div className="p-2">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-rose-400/10 hover:text-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-400/40"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile navigation overlay */}
      {openSideMenu && (
        <div
          id="mobile-navigation"
          className="fixed inset-0 z-40 min-[1081px]:hidden"
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={closeMobileMenu}
            className="absolute inset-0 h-full w-full cursor-default bg-[#030510]/70 backdrop-blur-sm"
          />

          {/* Sidebar panel */}
          <div className="absolute bottom-0 left-0 top-[73px] w-[min(18rem,85vw)] overflow-y-auto border-r border-white/10 bg-[#080B16]/98 shadow-2xl shadow-black/50">
            <Sidebar activeMenu={activeMenu} onNavigate={closeMobileMenu} />
          </div>
        </div>
      )}
    </>
  );
};

Menubar.propTypes = {
  activeMenu: PropTypes.string.isRequired,
};

export default Menubar;

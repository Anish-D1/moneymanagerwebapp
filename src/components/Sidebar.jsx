import { useContext } from "react";
import PropTypes from "prop-types";
import { AppContext } from "../context/AppContextValue.jsx";
import { User } from "lucide-react";
import { SIDE_BAR_DATA } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ activeMenu, onNavigate }) => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    onNavigate?.();
  };

  return (
    <aside className="flex h-full min-h-0 w-full flex-col border-r border-white/[0.08] bg-[#080B16]/90 p-4 backdrop-blur-2xl sm:p-5 min-[1081px]:sticky min-[1081px]:top-[73px] min-[1081px]:h-[calc(100vh-73px)] min-[1081px]:w-64 min-[1081px]:shrink-0">
      {/* User profile */}
      <div className="mb-6 mt-2 flex shrink-0 flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-5 sm:mb-8 sm:py-6">
        <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-violet-400/30 bg-gradient-to-br from-violet-500/20 to-cyan-400/10 shadow-lg shadow-violet-950/20 sm:h-20 sm:w-20">
          {user?.profileImageUrl ? (
            <img
              src={user.profileImageUrl}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          ) : (
            <User className="h-8 w-8 text-violet-300 sm:h-9 sm:w-9" />
          )}
        </div>

        <div className="w-full min-w-0 text-center">
          <h5 className="truncate text-sm font-semibold text-white">
            {user?.fullName || "Welcome"}
          </h5>
          <p className="mt-1 text-xs text-slate-500">Money Manager</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto">
        <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
          Workspace
        </p>

        {SIDE_BAR_DATA.map((item, index) => {
          const isActive = activeMenu === item.label;
          const Icon = item.icon;

          return (
            <button
              type="button"
              key={item.path || `menu-${index}`}
              onClick={() => handleNavigation(item.path)}
              aria-current={isActive ? "page" : undefined}
              className={`group relative flex w-full shrink-0 items-center gap-3 overflow-hidden rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-400/50 ${
                isActive
                  ? "border-violet-400/20 bg-gradient-to-r from-violet-500/20 to-blue-500/10 text-white shadow-lg shadow-violet-950/10"
                  : "border-transparent text-slate-400 hover:border-white/5 hover:bg-white/[0.05] hover:text-slate-100"
              }`}
            >
              {isActive && (
                <span className="absolute bottom-2 left-0 top-2 w-1 rounded-r-full bg-violet-400" />
              )}

              {Icon && (
                <Icon
                  className={`h-5 w-5 shrink-0 transition-colors ${
                    isActive
                      ? "text-violet-300"
                      : "text-slate-500 group-hover:text-slate-300"
                  }`}
                />
              )}

              <span className="truncate">{item.label}</span>

              {isActive && (
                <span className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300 shadow-sm shadow-cyan-300/50" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mt-5 shrink-0 border-t border-white/10 pt-4">
        <p className="text-center text-[10px] tracking-wide text-slate-600">
          MONEY MANAGER · YOUR FINANCES
        </p>
      </div>
    </aside>
  );
};

Sidebar.propTypes = {
  activeMenu: PropTypes.string.isRequired,
  onNavigate: PropTypes.func,
};

export default Sidebar;

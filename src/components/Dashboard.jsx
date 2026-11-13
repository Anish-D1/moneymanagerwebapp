import { useContext } from "react";
import PropTypes from "prop-types";
import Menubar from "./Menubar.jsx";
import Sidebar from "./Sidebar.jsx";
import { AppContext } from "../context/AppContextValue.jsx";

const Dashboard = ({ children, activeMenu }) => {
  const { user } = useContext(AppContext);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#080B16] text-slate-100">
      <div
        className="pointer-events-none fixed inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-violet-600/15 blur-[120px]" />
        <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-blue-600/10 blur-[140px]" />
        <div className="absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-cyan-500/10 blur-[140px]" />
      </div>

      <div className="relative z-10">
        <Menubar activeMenu={activeMenu} />

        {user && (
          <div className="flex min-w-0">
            <aside className="hidden shrink-0 min-[1081px]:block">
              <Sidebar activeMenu={activeMenu} />
            </aside>

            <main className="min-w-0 flex-1 px-3 sm:px-5">{children}</main>
          </div>
        )}
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  children: PropTypes.node.isRequired,
  activeMenu: PropTypes.string.isRequired,
};

export default Dashboard;

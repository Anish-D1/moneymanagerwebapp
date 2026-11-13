import Dashboard from "../components/Dashboard.jsx";
import { useUser } from "../hooks/useUser.jsx";
import InfoCard from "../components/InfoCard.jsx";
import { Coins, Wallet, WalletCards } from "lucide-react";
import { addThousandsSeparator } from "../util/util.js";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosConfig from "../util/axiosConfig.jsx";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import toast from "react-hot-toast";
import RecentTransactions from "../components/RecentTransactions.jsx";
import FinanceOverview from "../components/FinanceOverview.jsx";
import Transactions from "../components/Transactions.jsx";

const Home = () => {
  useUser();

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axiosConfig.get(API_ENDPOINTS.DASHBOARD_DATA);

        if (response.status === 200) {
          setDashboardData(response.data);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast.error("Could not load dashboard data.");
      }

      try {
        const [expenseResponse, incomeResponse] = await Promise.all([
          axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("expense")),
          axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("income")),
        ]);

        const expenseCategories = Array.isArray(expenseResponse.data)
          ? expenseResponse.data
          : [];

        const incomeCategories = Array.isArray(incomeResponse.data)
          ? incomeResponse.data
          : [];

        setCategories([...expenseCategories, ...incomeCategories]);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div>
      <Dashboard activeMenu="Dashboard">
        <div className="mx-auto my-6 max-w-[1600px] space-y-8 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <InfoCard
              icon={<WalletCards />}
              label="Total Balance"
              value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
              color="bg-purple-800"
            />

            <InfoCard
              icon={<Wallet />}
              label="Total Income"
              value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
              color="bg-green-800"
            />

            <InfoCard
              icon={<Coins />}
              label="Total Expense"
              value={addThousandsSeparator(dashboardData?.totalExpense || 0)}
              color="bg-red-800"
            />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <RecentTransactions
              transactions={dashboardData?.recentTransactions || []}
              categories={categories}
              recent5Expenses={dashboardData?.recent5Expenses || []}
              recent5Incomes={dashboardData?.recent5Incomes || []}
              onMore={() => navigate("/expense")}
            />

            <FinanceOverview
              totalBalance={dashboardData?.totalBalance || 0}
              totalIncome={dashboardData?.totalIncome || 0}
              totalExpense={dashboardData?.totalExpense || 0}
            />

            <Transactions
              transactions={dashboardData?.recent5Expenses || []}
              categories={categories}
              onMore={() => navigate("/expense")}
              type="expense"
              title="Recent Expenses"
            />

            <Transactions
              transactions={dashboardData?.recent5Incomes || []}
              categories={categories}
              onMore={() => navigate("/income")}
              type="income"
              title="Recent Incomes"
            />
          </div>
        </div>
      </Dashboard>
    </div>
  );
};

export default Home;

import Dashboard from "../components/Dashboard.jsx";
import { useUser } from "../hooks/useUser.jsx";
import { useCallback, useEffect, useState } from "react";
import axiosConfig from "../util/axiosConfig.jsx";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import toast from "react-hot-toast";
import IncomeList from "../components/IncomeList.jsx";
import Modal from "../components/Modal.jsx";
import AddIncomeForm from "../components/AddIncomeForm.jsx";
import DeleteAlert from "../components/DeleteAlert.jsx";
import IncomeOverview from "../components/IncomeOverview.jsx";

const Income = () => {
  useUser();

  const [incomeData, setIncomeData] = useState([]);
  const [categories, setCategories] = useState([]);

  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [openEditIncomeModal, setOpenEditIncomeModal] = useState(false);
  const [selectedIncome, setSelectedIncome] = useState(null);

  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  // Fetch all income transactions
  const fetchIncomeDetails = useCallback(async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_INCOMES);

      if (response.status === 200) {
        setIncomeData(Array.isArray(response.data) ? response.data : []);
      }
    } catch (error) {
      console.error("Failed to fetch income details:", error);
      toast.error(
        error.response?.data?.message || "Failed to fetch income details",
      );
    }
  }, []);

  // Fetch income categories
  const fetchIncomeCategories = useCallback(async () => {
    try {
      const response = await axiosConfig.get(
        API_ENDPOINTS.CATEGORY_BY_TYPE("income"),
      );

      if (response.status === 200) {
        setCategories(Array.isArray(response.data) ? response.data : []);
      }
    } catch (error) {
      console.error("Failed to fetch income categories:", error);
      toast.error(
        error.response?.data?.message || "Failed to fetch income categories",
      );
    }
  }, []);

  // Add income transaction
  const handleAddIncome = async (income) => {
    const { name, amount, date, icon, categoryId } = income;

    if (!name?.trim()) {
      toast.error("Please enter a name");
      return;
    }

    if (
      amount === "" ||
      amount === null ||
      amount === undefined ||
      !Number.isFinite(Number(amount)) ||
      Number(amount) <= 0
    ) {
      toast.error("Amount should be a valid number greater than 0");
      return;
    }

    if (!date) {
      toast.error("Please select a date");
      return;
    }

    const today = new Date().toLocaleDateString("en-CA");

    if (date > today) {
      toast.error("Date cannot be in the future");
      return;
    }

    if (!categoryId) {
      toast.error("Please select a category");
      return;
    }

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_INCOME, {
        name: name.trim(),
        amount: Number(amount),
        date,
        icon,
        categoryId,
      });

      if (response.status === 201) {
        setOpenAddIncomeModal(false);
        toast.success("Income added successfully");

        await Promise.all([fetchIncomeDetails(), fetchIncomeCategories()]);
      }
    } catch (error) {
      console.error("Error adding income:", error);
      toast.error(error.response?.data?.message || "Failed to add income");
    }
  };

  // Open edit income modal
  const handleOpenEditIncome = (income) => {
    setSelectedIncome(income);
    setOpenEditIncomeModal(true);
  };

  // Close edit income modal
  const handleCloseEditIncome = () => {
    setOpenEditIncomeModal(false);
    setSelectedIncome(null);
  };

  // Update income transaction
  const handleUpdateIncome = async (income) => {
    if (!selectedIncome?.id) {
      toast.error("Invalid income selected");
      return;
    }

    const { name, amount, date, icon, categoryId } = income;

    if (!name?.trim()) {
      toast.error("Please enter a name");
      return;
    }

    if (
      amount === "" ||
      amount === null ||
      amount === undefined ||
      !Number.isFinite(Number(amount)) ||
      Number(amount) <= 0
    ) {
      toast.error("Amount should be a valid number greater than 0");
      return;
    }

    if (!date) {
      toast.error("Please select a date");
      return;
    }

    const today = new Date().toLocaleDateString("en-CA");

    if (date > today) {
      toast.error("Date cannot be in the future");
      return;
    }

    if (!categoryId) {
      toast.error("Please select a category");
      return;
    }

    try {
      const response = await axiosConfig.put(
        API_ENDPOINTS.UPDATE_INCOME(selectedIncome.id),
        {
          name: name.trim(),
          amount: Number(amount),
          date,
          icon,
          categoryId,
        },
      );

      if (response.status === 200) {
        handleCloseEditIncome();
        toast.success("Income updated successfully");

        await Promise.all([fetchIncomeDetails(), fetchIncomeCategories()]);
      }
    } catch (error) {
      console.error("Error updating income:", error);
      toast.error(error.response?.data?.message || "Failed to update income");
    }
  };

  // Delete income transaction
  const deleteIncome = async (id) => {
    if (id === null || id === undefined) {
      toast.error("Invalid income selected");
      return;
    }

    try {
      await axiosConfig.delete(API_ENDPOINTS.DELETE_INCOME(id));

      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Income deleted successfully");

      await fetchIncomeDetails();
    } catch (error) {
      console.error("Error deleting income:", error);
      toast.error(error.response?.data?.message || "Failed to delete income");
    }
  };

  // Download income details as Excel
  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosConfig.get(
        API_ENDPOINTS.INCOME_EXCEL_DOWNLOAD,
        { responseType: "blob" },
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", "income_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
      toast.success("Income details downloaded successfully");
    } catch (error) {
      console.error("Error downloading income details:", error);
      toast.error(error.response?.data?.message || "Failed to download income");
    }
  };

  // Email income details
  const handleEmailIncomeDetails = async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.EMAIL_INCOME);

      if (response.status === 200) {
        toast.success("Income details emailed successfully");
      }
    } catch (error) {
      console.error("Error emailing income details:", error);
      toast.error(error.response?.data?.message || "Failed to email income");
    }
  };

  // Initial data loading
  useEffect(() => {
    fetchIncomeDetails();
    fetchIncomeCategories();
  }, [fetchIncomeDetails, fetchIncomeCategories]);

  return (
    <Dashboard activeMenu="Income">
      <div className="mx-auto my-5 w-full min-w-0 max-w-full px-3 sm:px-4">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>

          <IncomeList
            transactions={incomeData}
            categories={categories}
            onEdit={handleOpenEditIncome}
            onDelete={(id) =>
              setOpenDeleteAlert({
                show: true,
                data: id,
              })
            }
            onDownload={handleDownloadIncomeDetails}
            onEmail={handleEmailIncomeDetails}
          />

          {/* Add Income Modal */}
          <Modal
            isOpen={openAddIncomeModal}
            onClose={() => setOpenAddIncomeModal(false)}
            title="Add Income"
          >
            <AddIncomeForm
              onAddIncome={handleAddIncome}
              categories={categories}
            />
          </Modal>

          {/* Edit Income Modal */}
          <Modal
            isOpen={openEditIncomeModal}
            onClose={handleCloseEditIncome}
            title="Edit Income"
          >
            <AddIncomeForm
              onUpdateIncome={handleUpdateIncome}
              categories={categories}
              initialData={selectedIncome}
            />
          </Modal>

          {/* Delete Income Modal */}
          <Modal
            isOpen={openDeleteAlert.show}
            onClose={() =>
              setOpenDeleteAlert({
                show: false,
                data: null,
              })
            }
            title="Delete Income"
          >
            <DeleteAlert
              content="Are you sure you want to delete this income detail?"
              onDelete={() => deleteIncome(openDeleteAlert.data)}
            />
          </Modal>
        </div>
      </div>
    </Dashboard>
  );
};

export default Income;

import { useCallback, useEffect, useState } from "react";
import { useUser } from "../hooks/useUser.jsx";
import toast from "react-hot-toast";
import axiosConfig from "../util/axiosConfig.jsx";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import Dashboard from "../components/Dashboard.jsx";
import ExpenseOverview from "../components/ExpenseOverview.jsx";
import ExpenseList from "../components/ExpenseList.jsx";
import Modal from "../components/Modal.jsx";
import AddExpenseForm from "../components/AddExpenseForm.jsx";
import DeleteAlert from "../components/DeleteAlert.jsx";

const Expense = () => {
  useUser();

  const [expenseData, setExpenseData] = useState([]);
  const [categories, setCategories] = useState([]);

  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [openEditExpenseModal, setOpenEditExpenseModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  // Fetch all expense transactions
  const fetchExpenseDetails = useCallback(async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_EXPENSE);

      setExpenseData(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Failed to fetch expense details:", error);
      toast.error(
        error.response?.data?.message || "Failed to fetch expense details.",
      );
    }
  }, []);

  // Fetch expense categories
  const fetchExpenseCategories = useCallback(async () => {
    try {
      const response = await axiosConfig.get(
        API_ENDPOINTS.CATEGORY_BY_TYPE("expense"),
      );

      setCategories(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Failed to fetch expense categories:", error);
      toast.error(
        error.response?.data?.message || "Failed to fetch expense categories.",
      );
    }
  }, []);

  // Add expense transaction
  const handleAddExpense = async (expense) => {
    const { name, categoryId, amount, date, icon } = expense;

    if (!name?.trim()) {
      toast.error("Name is required.");
      return;
    }

    if (!categoryId) {
      toast.error("Category is required.");
      return;
    }

    if (
      amount === "" ||
      amount === null ||
      amount === undefined ||
      !Number.isFinite(Number(amount)) ||
      Number(amount) <= 0
    ) {
      toast.error("Amount should be a valid number greater than 0.");
      return;
    }

    if (!date) {
      toast.error("Date is required.");
      return;
    }

    const today = new Date().toLocaleDateString("en-CA");

    if (date > today) {
      toast.error("Date cannot be in the future.");
      return;
    }

    try {
      await axiosConfig.post(API_ENDPOINTS.ADD_EXPENSE, {
        name: name.trim(),
        categoryId,
        amount: Number(amount),
        date,
        icon,
      });

      setOpenAddExpenseModal(false);
      toast.success("Expense added successfully.");

      await Promise.all([fetchExpenseDetails(), fetchExpenseCategories()]);
    } catch (error) {
      console.error(
        "Error adding expense:",
        error.response?.data?.message || error.message,
      );

      toast.error(error.response?.data?.message || "Failed to add expense.");
    }
  };

  // Open edit expense modal
  const handleOpenEditExpense = (expense) => {
    setSelectedExpense(expense);
    setOpenEditExpenseModal(true);
  };

  // Close edit expense modal
  const handleCloseEditExpense = () => {
    setOpenEditExpenseModal(false);
    setSelectedExpense(null);
  };

  // Update expense transaction
  const handleUpdateExpense = async (expense) => {
    if (!selectedExpense?.id) {
      toast.error("Invalid expense selected.");
      return;
    }

    const { name, categoryId, amount, date, icon } = expense;

    if (!name?.trim()) {
      toast.error("Name is required.");
      return;
    }

    if (!categoryId) {
      toast.error("Category is required.");
      return;
    }

    if (
      amount === "" ||
      amount === null ||
      amount === undefined ||
      !Number.isFinite(Number(amount)) ||
      Number(amount) <= 0
    ) {
      toast.error("Amount should be a valid number greater than 0.");
      return;
    }

    if (!date) {
      toast.error("Date is required.");
      return;
    }

    const today = new Date().toLocaleDateString("en-CA");

    if (date > today) {
      toast.error("Date cannot be in the future.");
      return;
    }

    try {
      const response = await axiosConfig.put(
        API_ENDPOINTS.UPDATE_EXPENSE(selectedExpense.id),
        {
          name: name.trim(),
          categoryId,
          amount: Number(amount),
          date,
          icon,
        },
      );

      if (response.status === 200) {
        handleCloseEditExpense();
        toast.success("Expense updated successfully.");

        await Promise.all([fetchExpenseDetails(), fetchExpenseCategories()]);
      }
    } catch (error) {
      console.error(
        "Error updating expense:",
        error.response?.data?.message || error.message,
      );

      toast.error(error.response?.data?.message || "Failed to update expense.");
    }
  };

  // Delete expense transaction
  const deleteExpense = async (id) => {
    if (id === null || id === undefined) {
      toast.error("Invalid expense selected.");
      return;
    }

    try {
      await axiosConfig.delete(API_ENDPOINTS.DELETE_EXPENSE(id));

      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Expense details deleted successfully.");

      await fetchExpenseDetails();
    } catch (error) {
      console.error(
        "Error deleting expense:",
        error.response?.data?.message || error.message,
      );

      toast.error(error.response?.data?.message || "Failed to delete expense.");
    }
  };

  // Download expense details as Excel
  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosConfig.get(
        API_ENDPOINTS.EXPENSE_EXCEL_DOWNLOAD,
        { responseType: "blob" },
      );

      const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");

      link.href = blobUrl;
      link.download = "expense_details.xlsx";
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(blobUrl);
      toast.success("Expense details downloaded successfully.");
    } catch (error) {
      console.error("Error downloading expense details:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to download expense details. Please try again.",
      );
    }
  };

  // Email expense details
  const handleEmailExpenseDetails = async () => {
    try {
      await axiosConfig.get(API_ENDPOINTS.EMAIL_EXPENSE);
      toast.success("Expense details emailed successfully.");
    } catch (error) {
      console.error("Error emailing expense details:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to email expense details. Please try again.",
      );
    }
  };

  // Initial data loading
  useEffect(() => {
    fetchExpenseDetails();
    fetchExpenseCategories();
  }, [fetchExpenseDetails, fetchExpenseCategories]);

  return (
    <Dashboard activeMenu="Expense">
      <div className="mx-auto my-5 w-full min-w-0 max-w-full px-3 sm:px-4">
        <div className="grid grid-cols-1 gap-6">
          <ExpenseOverview
            transactions={expenseData}
            onExpenseIncome={() => setOpenAddExpenseModal(true)}
          />

          <ExpenseList
            transactions={expenseData}
            categories={categories}
            onEdit={handleOpenEditExpense}
            onDelete={(id) =>
              setOpenDeleteAlert({
                show: true,
                data: id,
              })
            }
            onDownload={handleDownloadExpenseDetails}
            onEmail={handleEmailExpenseDetails}
          />

          {/* Add Expense Modal */}
          <Modal
            isOpen={openAddExpenseModal}
            onClose={() => setOpenAddExpenseModal(false)}
            title="Add Expense"
          >
            <AddExpenseForm
              onAddExpense={handleAddExpense}
              categories={categories}
            />
          </Modal>

          {/* Edit Expense Modal */}
          <Modal
            isOpen={openEditExpenseModal}
            onClose={handleCloseEditExpense}
            title="Edit Expense"
          >
            <AddExpenseForm
              onUpdateExpense={handleUpdateExpense}
              categories={categories}
              initialData={selectedExpense}
            />
          </Modal>

          {/* Delete Expense Modal */}
          <Modal
            isOpen={openDeleteAlert.show}
            onClose={() =>
              setOpenDeleteAlert({
                show: false,
                data: null,
              })
            }
            title="Delete Expense"
          >
            <DeleteAlert
              content="Are you sure you want to delete this expense detail?"
              onDelete={() => deleteExpense(openDeleteAlert.data)}
            />
          </Modal>
        </div>
      </div>
    </Dashboard>
  );
};

export default Expense;

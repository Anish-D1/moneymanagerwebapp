import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import EmojiPickerPopup from "./EmojiPickerPopup.jsx";
import Input from "./Input.jsx";

const AddExpenseForm = ({
  onAddExpense,
  onUpdateExpense,
  categories,
  initialData,
}) => {
  const [expense, setExpense] = useState({
    name: "",
    categoryId: "",
    amount: "",
    date: "",
    icon: "",
  });

  // Populate the form when editing an existing expense
  useEffect(() => {
    if (initialData) {
      setExpense({
        name: initialData.name || "",
        categoryId:
          initialData.categoryId !== null &&
          initialData.categoryId !== undefined
            ? String(initialData.categoryId)
            : "",
        amount:
          initialData.amount !== null && initialData.amount !== undefined
            ? String(initialData.amount)
            : "",
        date: initialData.date || "",
        icon: initialData.icon || "",
      });
    }
  }, [initialData]);

  // Select the first category automatically when adding an expense
  useEffect(() => {
    if (initialData || !Array.isArray(categories) || categories.length === 0) {
      return;
    }

    setExpense((prev) => {
      const categoryExists = categories.some(
        (category) => String(category.id) === String(prev.categoryId),
      );

      if (categoryExists) {
        return prev;
      }

      return {
        ...prev,
        categoryId: String(categories[0].id),
      };
    });
  }, [categories, initialData]);

  const handleChange = (key, value) => {
    setExpense((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    const name = expense.name.trim();
    const amount = Number(expense.amount);

    if (!name) {
      return;
    }

    if (!expense.categoryId) {
      return;
    }

    if (expense.amount === "" || !Number.isFinite(amount) || amount <= 0) {
      return;
    }

    if (!expense.date) {
      return;
    }

    const expenseData = {
      ...expense,
      name,
      amount,
      categoryId: expense.categoryId,
    };

    if (initialData) {
      if (typeof onUpdateExpense === "function") {
        onUpdateExpense(expenseData);
      }
    } else if (typeof onAddExpense === "function") {
      onAddExpense(expenseData);
    }
  };

  const categoryOptions = (Array.isArray(categories) ? categories : []).map(
    (category) => ({
      value: String(category.id),
      label: category.name,
    }),
  );

  return (
    <div className="w-full min-w-0 max-w-full space-y-4 overflow-x-hidden">
      <EmojiPickerPopup
        icon={expense.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <Input
        value={expense.name}
        onChange={({ target }) => handleChange("name", target.value)}
        label="Expense Name"
        placeholder="e.g., Electricity, WiFi"
        type="text"
      />

      <Input
        label="Category"
        value={expense.categoryId}
        onChange={({ target }) => handleChange("categoryId", target.value)}
        isSelect={true}
        options={categoryOptions}
      />

      <Input
        value={expense.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        placeholder="e.g., 150.00"
        type="number"
      />

      <Input
        value={expense.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        type="date"
        className="date-input"
      />

      <div className="mt-6 flex w-full min-w-0 justify-end">
        <button
          type="button"
          className="add-btn add-btn-fill w-full max-w-full sm:w-auto"
          onClick={handleSubmit}
          disabled={categoryOptions.length === 0}
        >
          {initialData ? "Update Expense" : "Add Expense"}
        </button>
      </div>
    </div>
  );
};

AddExpenseForm.propTypes = {
  onAddExpense: PropTypes.func,
  onUpdateExpense: PropTypes.func,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  initialData: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    categoryId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    date: PropTypes.string,
    icon: PropTypes.string,
  }),
};

export default AddExpenseForm;

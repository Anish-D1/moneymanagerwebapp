import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import EmojiPickerPopup from "./EmojiPickerPopup.jsx";
import Input from "./Input.jsx";
import { LoaderCircle } from "lucide-react";

const AddIncomeForm = ({
  onAddIncome,
  onUpdateIncome,
  categories,
  initialData,
}) => {
  const [income, setIncome] = useState({
    name: "",
    amount: "",
    date: "",
    icon: "",
    categoryId: "",
  });

  const [loading, setLoading] = useState(false);

  const isEditMode = Boolean(initialData?.id);

  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  useEffect(() => {
    if (initialData) {
      setIncome({
        name: initialData.name || "",
        amount: initialData.amount ?? "",
        date: initialData.date || "",
        icon: initialData.icon || "",
        categoryId: initialData.categoryId ?? "",
      });
    } else {
      setIncome({
        name: "",
        amount: "",
        date: "",
        icon: "",
        categoryId: "",
      });
    }
  }, [initialData]);

  useEffect(() => {
    if (categories.length > 0 && !income.categoryId) {
      setIncome((prev) => ({
        ...prev,
        categoryId: categories[0].id,
      }));
    }
  }, [categories, income.categoryId]);

  const handleChange = (key, value) => {
    setIncome((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      if (isEditMode) {
        await onUpdateIncome(income);
      } else {
        await onAddIncome(income);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-w-0 max-w-full space-y-4 overflow-x-hidden">
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <Input
        value={income.name}
        onChange={({ target }) => handleChange("name", target.value)}
        label="Income Source"
        placeholder="e.g., Salary, Freelance, Bonus"
        type="text"
      />

      <Input
        label="Category"
        value={income.categoryId}
        onChange={({ target }) => handleChange("categoryId", target.value)}
        isSelect={true}
        options={categoryOptions}
      />

      <Input
        value={income.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        placeholder="e.g., 500.00"
        type="number"
      />

      <Input
        value={income.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        placeholder=""
        type="date"
        className="date-input"
      />

      <div className="mt-6 flex w-full min-w-0 justify-end">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={
            loading ||
            categoryOptions.length === 0 ||
            (isEditMode && typeof onUpdateIncome !== "function") ||
            (!isEditMode && typeof onAddIncome !== "function")
          }
          className="add-btn add-btn-fill w-full max-w-full sm:w-auto"
        >
          {loading ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" />
              {isEditMode ? "Updating..." : "Adding..."}
            </>
          ) : isEditMode ? (
            "Update Income"
          ) : (
            "Add Income"
          )}
        </button>
      </div>
    </div>
  );
};

AddIncomeForm.propTypes = {
  onAddIncome: PropTypes.func,
  onUpdateIncome: PropTypes.func,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  initialData: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    date: PropTypes.string,
    icon: PropTypes.string,
    categoryId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};

export default AddIncomeForm;

import { useEffect, useState } from "react";
import Input from "./Input.jsx";
import EmojiPickerPopup from "./EmojiPickerPopup.jsx";
import { LoaderCircle, Sparkles } from "lucide-react";
import PropTypes from "prop-types";

const AddCategoryForm = ({ onAddCategory, initialCategoryData, isEditing }) => {
  const [category, setCategory] = useState({
    name: "",
    type: "income",
    icon: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditing && initialCategoryData) {
      setCategory(initialCategoryData);
    } else {
      setCategory({ name: "", type: "income", icon: "" });
    }
  }, [isEditing, initialCategoryData]);

  const categoryTypeOptions = [
    { value: "income", label: "Income" },
    { value: "expense", label: "Expense" },
  ];

  const handleChange = (key, value) => {
    setCategory((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!category.name.trim()) {
      return;
    }

    setLoading(true);

    try {
      await onAddCategory(category);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full min-w-0 max-w-full space-y-5 p-2 sm:p-4">
      {/* Form introduction */}
      <div className="flex items-start gap-3 rounded-xl border border-violet-400/15 bg-violet-500/[0.06] p-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-300/20 bg-violet-500/10 text-violet-300">
          <Sparkles size={19} />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">
            {isEditing ? "Update your category" : "Create a category"}
          </h3>
          <p className="mt-1 text-xs leading-5 text-slate-400">
            {isEditing
              ? "Modify the name, type, or icon for this category."
              : "Choose a name, transaction type, and icon to keep your finances organized."}
          </p>
        </div>
      </div>

      {/* Category icon */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-200">
          Category Icon
        </label>

        <div className="rounded-xl border border-white/10 bg-[#080B16]/60 p-3 transition-colors focus-within:border-violet-400/40">
          <EmojiPickerPopup
            icon={category.icon}
            onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
          />
        </div>
      </div>

      {/* Category name */}
      <div className="space-y-2">
        <Input
          value={category.name}
          onChange={({ target }) => handleChange("name", target.value)}
          label="Category Name"
          placeholder="e.g., Freelance, Salary, Groceries"
          type="text"
        />
      </div>

      {/* Category type */}
      <div className="space-y-2">
        <Input
          label="Category Type"
          value={category.type}
          onChange={({ target }) => handleChange("type", target.value)}
          isSelect={true}
          options={categoryTypeOptions}
        />
      </div>

      {/* Submit action */}
      <div className="border-t border-white/[0.08] pt-5">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading || !category.name.trim()}
          className="group flex w-full items-center justify-center gap-2 rounded-xl border border-violet-400/30 bg-gradient-to-r from-violet-600 to-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-950/25 transition duration-200 hover:-translate-y-0.5 hover:from-violet-500 hover:to-purple-500 hover:shadow-violet-500/20 focus:outline-none focus:ring-2 focus:ring-violet-400/50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
        >
          {loading ? (
            <>
              <LoaderCircle size={17} className="animate-spin" />
              {isEditing ? "Updating..." : "Adding..."}
            </>
          ) : (
            <>
              <Sparkles
                size={16}
                className="transition-transform group-hover:rotate-12"
              />
              {isEditing ? "Update Category" : "Add Category"}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

AddCategoryForm.propTypes = {
  onAddCategory: PropTypes.func.isRequired,
  initialCategoryData: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
    icon: PropTypes.string,
  }),
  isEditing: PropTypes.bool,
};
export default AddCategoryForm;

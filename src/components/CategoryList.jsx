import PropTypes from "prop-types";
import { Layers2, Pencil, Tags } from "lucide-react";

const CategoryList = ({ categories = [], onEditCategory }) => {
  return (
    <div className="w-full">
      {/* Section heading */}
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-300">
          <Tags size={20} />
        </div>

        <div>
          <h4 className="text-base font-semibold text-white">
            Category Sources
          </h4>
          <p className="mt-0.5 text-xs text-slate-400">
            {categories.length}{" "}
            {categories.length === 1 ? "category" : "categories"} available
          </p>
        </div>
      </div>

      {/* Empty state */}
      {categories.length === 0 ? (
        <div className="flex min-h-48 flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-4 py-10 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-300">
            <Layers2 size={27} />
          </div>

          <p className="text-sm font-medium text-slate-200">
            No categories yet
          </p>

          <p className="mt-1 max-w-xs text-sm text-slate-400">
            Add your first category to organize your income and expenses.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group relative flex min-w-0 items-center gap-3 overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.025] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-400/30 hover:bg-violet-500/[0.06] hover:shadow-lg hover:shadow-violet-950/20"
            >
              {/* Subtle hover highlight */}
              <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-violet-300/0 to-transparent transition-all duration-200 group-hover:via-violet-300/30" />

              {/* Category icon */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-violet-300/15 bg-gradient-to-br from-violet-500/15 to-purple-500/[0.04] text-violet-300 transition-colors duration-200 group-hover:border-violet-300/30 group-hover:from-violet-500/25">
                {category.icon ? (
                  <img
                    src={category.icon}
                    alt={category.name}
                    className="h-6 w-6 object-contain"
                  />
                ) : (
                  <Layers2 size={23} />
                )}
              </div>

              {/* Category details */}
              <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
                <div className="min-w-0">
                  <p
                    className="truncate text-sm font-semibold text-slate-100"
                    title={category.name}
                  >
                    {category.name}
                  </p>

                  <p className="mt-1 text-xs capitalize text-slate-400">
                    {category.type}
                  </p>
                </div>

                {/* Edit action */}
                <button
                  type="button"
                  onClick={() => onEditCategory(category)}
                  aria-label={`Edit ${category.name}`}
                  title={`Edit ${category.name}`}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-transparent text-slate-400 transition-all duration-200 hover:border-violet-400/25 hover:bg-violet-500/15 hover:text-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400/50"
                >
                  <Pencil size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string,
      icon: PropTypes.string,
    }),
  ),
  onEditCategory: PropTypes.func.isRequired,
};

export default CategoryList;

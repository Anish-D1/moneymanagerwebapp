import PropTypes from "prop-types";

const CustomLegend = ({ payload = [] }) => {
  const entries = Array.isArray(payload) ? payload : [];

  const uniqueEntries = entries.filter(
    (entry, index, allEntries) =>
      allEntries.findIndex((item) => item.value === entry.value) === index,
  );

  if (uniqueEntries.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-3 px-3 pb-3">
      {uniqueEntries.map((entry, index) => {
        const color = entry.color || "#A855F7";
        const label = String(entry.value ?? "Uncategorized");

        return (
          <div
            key={`legend-${label}-${index}`}
            className="flex min-w-0 items-center gap-2"
          >
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{
                backgroundColor: color,
                boxShadow: `0 0 8px ${color}80`,
              }}
              aria-hidden="true"
            />

            <span className="break-words text-xs font-medium text-slate-300 transition-colors duration-200 hover:text-white">
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

CustomLegend.propTypes = {
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      color: PropTypes.string,
    }),
  ),
};

export default CustomLegend;

import { useState, useEffect, useRef, useId } from "react";
import PropTypes from "prop-types";
import { Eye, EyeOff, ChevronDown, Check } from "lucide-react";

const Input = ({
  label,
  value,
  onChange,
  placeholder,
  type,
  isSelect,
  options = [],
  className = "",
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const dropdownRef = useRef(null);
  const optionRefs = useRef([]);
  const generatedId = useId();
  const inputId = `input-${generatedId}`;
  const listboxId = `listbox-${generatedId}`;

  const safeOptions = Array.isArray(options) ? options : [];

  const selectedIndex = safeOptions.findIndex(
    (option) => String(option.value) === String(value),
  );

  const selectedOption = selectedIndex >= 0 ? safeOptions[selectedIndex] : null;

  useEffect(() => {
    if (!isDropdownOpen) {
      return;
    }

    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setActiveIndex(-1);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
        setActiveIndex(-1);
      }
    };

    document.addEventListener("pointerdown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isDropdownOpen]);

  useEffect(() => {
    if (isDropdownOpen && activeIndex >= 0) {
      optionRefs.current[activeIndex]?.scrollIntoView({
        block: "nearest",
      });
    }
  }, [activeIndex, isDropdownOpen]);

  const fieldClass =
    "box-border block w-full min-w-0 max-w-full rounded-xl border border-white/10 bg-[#080B16]/70 px-3 py-2.5 text-sm text-slate-100 outline-none transition-all duration-200 placeholder:text-slate-500 hover:border-white/20 focus:border-violet-400/50 focus:ring-2 focus:ring-violet-400/10";

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type || "text";

  const handleSelect = (option) => {
    onChange?.({
      target: {
        value: option.value,
      },
    });

    setIsDropdownOpen(false);
    setActiveIndex(-1);
  };

  const openDropdown = (index = selectedIndex >= 0 ? selectedIndex : 0) => {
    if (safeOptions.length === 0) {
      setIsDropdownOpen(true);
      setActiveIndex(-1);
      return;
    }

    setIsDropdownOpen(true);
    setActiveIndex(Math.max(0, Math.min(index, safeOptions.length - 1)));
  };

  const handleDropdownKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();

      if (!isDropdownOpen) {
        openDropdown();
      } else if (safeOptions.length > 0) {
        setActiveIndex((previous) =>
          previous >= safeOptions.length - 1 ? 0 : previous + 1,
        );
      }
    } else if (event.key === "ArrowUp") {
      event.preventDefault();

      if (!isDropdownOpen) {
        openDropdown(
          selectedIndex >= 0 ? selectedIndex : safeOptions.length - 1,
        );
      } else if (safeOptions.length > 0) {
        setActiveIndex((previous) =>
          previous <= 0 ? safeOptions.length - 1 : previous - 1,
        );
      }
    } else if (event.key === "Home" && isDropdownOpen) {
      event.preventDefault();
      setActiveIndex(0);
    } else if (event.key === "End" && isDropdownOpen) {
      event.preventDefault();
      setActiveIndex(safeOptions.length - 1);
    } else if (
      (event.key === "Enter" || event.key === " ") &&
      isDropdownOpen &&
      activeIndex >= 0
    ) {
      event.preventDefault();
      handleSelect(safeOptions[activeIndex]);
    } else if (event.key === "Tab") {
      setIsDropdownOpen(false);
      setActiveIndex(-1);
    }
  };

  return (
    <div className="mb-4 w-full min-w-0 max-w-full">
      {label && (
        <label
          htmlFor={isSelect ? undefined : inputId}
          id={isSelect ? `${inputId}-label` : undefined}
          className="mb-2 block text-sm font-medium text-slate-300"
        >
          {label}
        </label>
      )}

      <div
        className="relative w-full min-w-0 max-w-full"
        ref={isSelect ? dropdownRef : null}
      >
        {isSelect ? (
          <>
            <button
              id={inputId}
              type="button"
              aria-labelledby={label ? `${inputId}-label` : undefined}
              aria-label={label ? undefined : placeholder || "Select an option"}
              aria-haspopup="listbox"
              aria-expanded={isDropdownOpen}
              aria-controls={listboxId}
              onClick={() => {
                if (isDropdownOpen) {
                  setIsDropdownOpen(false);
                  setActiveIndex(-1);
                } else {
                  openDropdown();
                }
              }}
              onKeyDown={handleDropdownKeyDown}
              className={`${fieldClass} flex items-center justify-between gap-2 text-left ${
                isDropdownOpen
                  ? "border-violet-400/50 ring-2 ring-violet-400/10"
                  : ""
              }`}
            >
              <span className="min-w-0 flex-1 truncate">
                {selectedOption?.label ?? placeholder ?? "Select a category"}
              </span>

              <ChevronDown
                size={17}
                className={`shrink-0 text-slate-400 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute left-0 right-0 top-full z-[100] mt-2 w-full min-w-0 max-w-full overflow-hidden rounded-xl border border-white/10 bg-[#101426] shadow-2xl shadow-black/40">
                <div
                  id={listboxId}
                  role="listbox"
                  aria-labelledby={label ? `${inputId}-label` : undefined}
                  className="max-h-48 overflow-y-auto overscroll-contain p-1.5"
                >
                  {safeOptions.length > 0 ? (
                    safeOptions.map((option, index) => {
                      const isSelected = String(option.value) === String(value);

                      return (
                        <button
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          key={option.value}
                          ref={(element) => {
                            optionRefs.current[index] = element;
                          }}
                          onMouseEnter={() => setActiveIndex(index)}
                          onClick={() => handleSelect(option)}
                          className={`flex w-full min-w-0 items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                            activeIndex === index
                              ? "bg-white/[0.06] text-white"
                              : isSelected
                                ? "bg-violet-500/15 text-violet-200"
                                : "text-slate-300 hover:bg-white/[0.06] hover:text-white"
                          }`}
                        >
                          <span className="min-w-0 flex-1 truncate">
                            {option.label}
                          </span>

                          {isSelected && (
                            <Check
                              size={16}
                              className="shrink-0 text-violet-300"
                            />
                          )}
                        </button>
                      );
                    })
                  ) : (
                    <p className="px-3 py-3 text-sm text-slate-500">
                      No categories available
                    </p>
                  )}
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <input
              id={inputId}
              className={`${fieldClass} ${className} ${
                type === "password" ? "pr-11" : ""
              }`}
              type={inputType}
              placeholder={placeholder}
              value={value ?? ""}
              onChange={onChange}
            />

            {type === "password" && (
              <button
                type="button"
                onClick={() => setShowPassword((previous) => !previous)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition-colors hover:text-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400/40"
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  isSelect: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      label: PropTypes.string.isRequired,
    }),
  ),
  className: PropTypes.string,
};

export default Input;

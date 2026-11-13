import { lazy, Suspense, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Image, X, Sparkles } from "lucide-react";

const EmojiPicker = lazy(() => import("emoji-picker-react"));

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleEmojiClick = (emojiData) => {
    const selectedIcon = emojiData?.imageUrl || emojiData?.emoji || "";

    if (selectedIcon) {
      onSelect(selectedIcon);
    }

    setIsOpen(false);
  };

  return (
    <div
      className="relative mb-4 flex min-w-0 flex-col items-start gap-4 sm:flex-row sm:items-center"
      ref={pickerRef}
    >
      <button
        type="button"
        onClick={() => setIsOpen((previous) => !previous)}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label={icon ? "Change category icon" : "Choose category icon"}
        className="group flex max-w-full items-center gap-4 rounded-xl border border-white/10 bg-white/[0.025] p-3 text-left transition-all duration-200 hover:border-violet-400/30 hover:bg-violet-500/[0.06] focus:outline-none focus:ring-2 focus:ring-violet-400/40"
      >
        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-violet-300/20 bg-gradient-to-br from-violet-500/15 to-cyan-500/[0.06] text-violet-300 transition-colors group-hover:border-violet-300/40">
          {icon ? (
            <img
              src={icon}
              alt="Selected category icon"
              className="h-full w-full object-contain p-2"
            />
          ) : (
            <Image size={24} />
          )}
        </div>

        <div className="min-w-0">
          <p className="flex items-center gap-2 text-sm font-semibold text-slate-100">
            {icon ? "Change icon" : "Choose an icon"}
            <Sparkles
              size={14}
              className="shrink-0 text-violet-300 transition-transform group-hover:rotate-12"
            />
          </p>

          <p className="mt-1 text-xs text-slate-400">
            {icon ? "Select a different icon" : "Personalize your category"}
          </p>
        </div>
      </button>

      {isOpen && (
        <div
          className="relative z-30 w-full min-w-0 max-w-full sm:w-[min(350px,100%)]"
          role="dialog"
          aria-label="Choose an icon"
        >
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close icon picker"
            className="absolute -right-2 -top-2 z-40 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-[#17172B] text-slate-300 shadow-lg transition-colors hover:border-violet-400/40 hover:text-white focus:outline-none focus:ring-2 focus:ring-violet-400/50"
          >
            <X size={16} />
          </button>

          <div className="w-full min-w-0 overflow-hidden rounded-xl border border-white/10 shadow-2xl shadow-black/40">
            <Suspense
              fallback={
                <div className="flex h-[350px] items-center justify-center text-sm text-slate-400">
                  Loading emoji picker...
                </div>
              }
            >
              <EmojiPicker
                open={isOpen}
                onEmojiClick={handleEmojiClick}
                theme="dark"
                width="100%"
                height={350}
              />
            </Suspense>
          </div>
        </div>
      )}
    </div>
  );
};

EmojiPickerPopup.propTypes = {
  icon: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
};

export default EmojiPickerPopup;

import { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Trash, Upload, User } from "lucide-react";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (!image) {
      setPreviewUrl(null);
      return;
    }

    const preview = URL.createObjectURL(image);
    setPreviewUrl(preview);

    return () => {
      URL.revokeObjectURL(preview);
    };
  }, [image]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      if (!file.type.startsWith("image/")) {
        e.target.value = "";
        return;
      }

      setImage(file);
    }

    // Allow selecting the same file again.
    e.target.value = "";
  };

  const onChooseFile = () => {
    inputRef.current?.click();
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation();
    setImage(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="mb-2 flex justify-center">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
        aria-label="Choose profile photo"
      />

      <div className="relative">
        {/* Click the entire photo area to choose or change a photo */}
        <button
          type="button"
          onClick={onChooseFile}
          aria-label={image ? "Change profile photo" : "Upload profile photo"}
          className="group relative flex h-24 w-24 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-violet-400/40 bg-gradient-to-br from-violet-500/20 to-cyan-500/20 shadow-lg shadow-violet-950/20 transition duration-200 hover:border-cyan-400 hover:shadow-cyan-500/20 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-4 focus:ring-offset-[#101629] active:scale-95"
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Profile preview"
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <User
              size={38}
              strokeWidth={1.5}
              className="text-violet-300 transition-colors group-hover:text-cyan-300"
            />
          )}

          {/* Hover overlay */}
          <span className="absolute inset-0 flex items-center justify-center rounded-full bg-[#080B16]/0 transition-colors group-hover:bg-[#080B16]/45">
            <Upload
              size={23}
              className="text-white opacity-0 transition-opacity group-hover:opacity-100"
            />
          </span>
        </button>

        {/* Upload indicator */}
        <button
          type="button"
          onClick={onChooseFile}
          aria-label="Choose profile photo"
          className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#101629] bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg transition hover:from-violet-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          <Upload size={16} />
        </button>

        {/* Remove photo */}
        {image && (
          <button
            type="button"
            onClick={handleRemoveImage}
            aria-label="Remove profile photo"
            className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#101629] bg-red-500 text-white shadow-lg transition hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            <Trash size={14} />
          </button>
        )}
      </div>
    </div>
  );
};

ProfilePhotoSelector.propTypes = {
  image: PropTypes.instanceOf(File),
  setImage: PropTypes.func.isRequired,
};

export default ProfilePhotoSelector;

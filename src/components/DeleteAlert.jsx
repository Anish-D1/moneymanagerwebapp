import { useState } from "react";
import PropTypes from "prop-types";
import { LoaderCircle } from "lucide-react";

const DeleteAlert = ({ content, onDelete }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    if (loading) return;

    setLoading(true);
    setError("");

    try {
      await onDelete();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to delete. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-w-0">
      <p className="text-sm leading-6 text-slate-300">{content}</p>

      {error && (
        <p
          role="alert"
          className="mt-3 rounded-xl border border-rose-400/20 bg-rose-500/10 px-3 py-2 text-sm text-rose-300"
        >
          {error}
        </p>
      )}

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleDelete}
          disabled={loading}
          type="button"
          aria-busy={loading}
          className="add-btn add-btn-fill w-full justify-center sm:w-auto disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" />
              Deleting...
            </>
          ) : (
            "Delete"
          )}
        </button>
      </div>
    </div>
  );
};

DeleteAlert.propTypes = {
  content: PropTypes.node.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteAlert;

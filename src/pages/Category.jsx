
import Dashboard from "../components/Dashboard.jsx";
import { useUser } from "../hooks/useUser.jsx";
import { Plus } from "lucide-react";
import CategoryList from "../components/CategoryList.jsx";
import { useEffect, useState } from "react";
import axiosConfig from "../util/axiosConfig.jsx";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import toast from "react-hot-toast";
import Modal from "../components/Modal.jsx";
import AddCategoryForm from "../components/AddCategoryForm.jsx";

const Category = () => {
    useUser();

    const [loading, setLoading] = useState(false);
    const [categoryData, setCategoryData] = useState([]);
    const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
    const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const fetchCategoryDetails = async () => {
        if (loading) return;

        setLoading(true);

        try {
            const response = await axiosConfig.get(
                API_ENDPOINTS.GET_ALL_CATEGORIES
            );

            if (response.status === 200) {
                setCategoryData(response.data);
            }
        } catch (error) {
            console.error("Failed to load categories:", error);
            toast.error("Unable to load categories. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategoryDetails();
        // Initial fetch on page mount.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleAddCategory = async (category) => {
        const { name, type, icon } = category;

        if (!name?.trim()) {
            toast.error("Category Name is required");
            return;
        }

        const isDuplicate = categoryData.some(
            (existingCategory) =>
                existingCategory.name.toLowerCase() ===
                name.trim().toLowerCase()
        );

        if (isDuplicate) {
            toast.error("Category Name already exists");
            return;
        }

        try {
            const response = await axiosConfig.post(
                API_ENDPOINTS.ADD_CATEGORY,
                { name: name.trim(), type, icon }
            );

            if (response.status === 201) {
                toast.success("Category added successfully");
                setOpenAddCategoryModal(false);
                await fetchCategoryDetails();
            }
        } catch (error) {
            console.error("Error adding category:", error);
            toast.error(
                error.response?.data?.message ||
                    "Failed to add category."
            );
        }
    };

    const handleEditCategory = (categoryToEdit) => {
        setSelectedCategory(categoryToEdit);
        setOpenEditCategoryModal(true);
    };

    const handleUpdateCategory = async (updatedCategory) => {
        const { id, name, type, icon } = updatedCategory;

        if (!name?.trim()) {
            toast.error("Category Name is required");
            return;
        }

        if (!id) {
            toast.error("Category ID is missing for update");
            return;
        }

        try {
            await axiosConfig.put(
                API_ENDPOINTS.UPDATE_CATEGORY(id),
                { name: name.trim(), type, icon }
            );

            setOpenEditCategoryModal(false);
            setSelectedCategory(null);
            toast.success("Category updated successfully");
            await fetchCategoryDetails();
        } catch (error) {
            console.error("Error updating category:", error);
            toast.error(
                error.response?.data?.message ||
                    "Failed to update category."
            );
        }
    };

    return (
        <Dashboard activeMenu="Category">
            <div className="relative mx-auto my-6 w-full space-y-6">

                {/* Subtle Aurora lighting */}
                <div className="pointer-events-none fixed right-10 top-24 -z-0 h-48 w-48 rounded-full bg-violet-500/[0.07] blur-[90px]" />

                {/* Page heading */}
                <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-400">
                            Manage your finances
                        </p>

                        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                            Categories
                        </h2>

                        <p className="text-sm text-slate-400">
                            Organize your income and expenses in one place.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => setOpenAddCategoryModal(true)}
                        className="group inline-flex items-center justify-center gap-2 rounded-xl border border-violet-400/30 bg-gradient-to-r from-violet-600/90 to-purple-600/90 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-950/30 transition duration-200 hover:-translate-y-0.5 hover:border-violet-300/60 hover:from-violet-500 hover:to-purple-500 hover:shadow-violet-500/20 focus:outline-none focus:ring-2 focus:ring-violet-400/60 active:translate-y-0"
                    >
                        <Plus
                            size={18}
                            className="transition-transform duration-200 group-hover:rotate-90"
                        />
                        Add Category
                    </button>
                </div>

                {/* Glass category panel */}
                <section className="relative z-10 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0D1224]/70 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-xl sm:p-6">
                    <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-violet-300/30 to-transparent" />

                    {loading && categoryData.length === 0 ? (
                        <div className="flex min-h-40 items-center justify-center gap-3 text-sm text-slate-400">
                            <span className="h-5 w-5 animate-spin rounded-full border-2 border-violet-400/30 border-t-violet-400" />
                            Loading categories...
                        </div>
                    ) : (
                        <CategoryList
                            categories={categoryData}
                            onEditCategory={handleEditCategory}
                        />
                    )}
                </section>

                {/* Add category modal */}
                <Modal
                    isOpen={openAddCategoryModal}
                    onClose={() => setOpenAddCategoryModal(false)}
                    title="Add Category"
                >
                    <AddCategoryForm
                        onAddCategory={handleAddCategory}
                    />
                </Modal>

                {/* Edit category modal */}
                <Modal
                    isOpen={openEditCategoryModal}
                    onClose={() => {
                        setOpenEditCategoryModal(false);
                        setSelectedCategory(null);
                    }}
                    title="Update Category"
                >
                    <AddCategoryForm
                        initialCategoryData={selectedCategory}
                        onAddCategory={handleUpdateCategory}
                        isEditing={true}
                    />
                </Modal>
            </div>
        </Dashboard>
    );
};

export default Category;

import React, { useEffect, useState } from "react";
import { RefreshCw, Trash2, PlusCircle } from "lucide-react";
import SkeletonLoader from "../../components/UI/SkeletonLoader";
import DialogComponent from "../../components/UI/DialogModel";
import GradientButton from "../../components/UI/GradientButton";
import axios, {
  getcategoriesApi,
  DeleteCategoryApi,
  versionCache,
} from "../../utils/AxiosInstance";
import { showtoast } from "../../utils/Toast";
import { useNavigate } from "react-router-dom";
import SearchableSelect from "../../components/UI/SearchableSelect";
import ProductImageCell from "../../components/AdminComp/ProductImageCell";
import { encryptData, decryptData } from "../../utils/crypto";
import { Category } from "../../types";
import { setItem, getItem } from "../../utils/LocalDB";

const ManageCategories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [Delbtnloading, setDelbtnloading] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();

  // Fetch categories with IndexedDB caching
  const fetchCategories = async () => {
    setLoading(true);

    try {
      // Get count from backend
      const countRes = await axios.get(versionCache);
      const version = countRes.data?.version ?? null;

      const cachedCount = sessionStorage.getItem("version_For_admin");

      // If count matches, load encrypted data from IndexedDB
      if (cachedCount === version) {
        console.log("N--H--A");

        const encryptedDB = await getItem<string>("admincategories");

        if (encryptedDB) {
          const decrypted = decryptData(encryptedDB) as Category[];
          if (Array.isArray(decrypted)) {
            setCategories(decrypted);
            setLoading(false);
            return;
          }
        }
      }

      console.log("API call happened (categories)");

      // Fetch fresh from backend
      const res = await axios.get(getcategoriesApi);
      let fetched: Category[] = [];

      if (Array.isArray(res?.data?.categories)) {
        fetched = res.data.categories;
      } else if (Array.isArray(res?.data)) {
        fetched = res.data;
      }

      setCategories(fetched);

      // Save encrypted in IndexedDB
      const encrypted = encryptData(fetched);
      await setItem("admincategories", encrypted);

      // Save count in sessionStorage
      sessionStorage.setItem("version_For_admin", version.toString());

      showtoast("Success", "Categories fetched successfully.", "success");
    } catch (err) {
      showtoast("Error", "Failed to fetch categories.", "error");

      // Fallback to cached data if exists
      const fallback = await getItem<string>("admincategories");
      if (fallback) {
        const decrypted = decryptData(fallback) as Category[];
        setCategories(decrypted);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Filter + Sort
  const filteredCategories = (Array.isArray(categories) ? categories : [])
    .filter((c) => c?.name?.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === "az") return a.name.localeCompare(b.name);
      if (sort === "za") return b.name.localeCompare(a.name);
      return 0;
    });

  const sortOptions = [
    { label: "Sort By", value: "" },
    { label: "A-Z", value: "az" },
    { label: "Z-A", value: "za" },
  ];

  // Delete Category
  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    setDelbtnloading(true);

    try {
      await axios.delete(`${DeleteCategoryApi}/${deleteId}`);

      const updatedList = categories.filter((c) => c.id !== deleteId);
      setCategories(updatedList);
      const countRes = await axios.get(versionCache);
      const version = countRes.data?.version ?? null;
      // Update encrypted cache in IndexedDB
      await setItem("admincategories", encryptData(updatedList));

      // Update version
      sessionStorage.setItem("version_For_admin", version);

      showtoast("Success", "Category deleted successfully.", "success");
    } catch (err: unknown) {
      const axiosErr = err as any;
      const productCount = axiosErr.response?.data?.productCount;
      const message = axiosErr.response?.data?.message;
      const errorMessage =
        typeof err === "object" && err && "response" in err
          ? (err as any)?.response?.data?.message
          : null;

      const authTokenMissing =
        errorMessage === "Authorization token is required";

      if (productCount > 0) {
        showtoast(`Cannot delete This category`, message, "error");
      } else if (authTokenMissing) {
        showtoast(
          "Session Expired",
          "Your session has expired. Please log in again.",
          "error"
        );
        setTimeout(() => navigate("/admin/login"), 5000);
      } else {
        showtoast("Error", "Could not delete category.", "error");
      }
    }

    setDelbtnloading(false);
    setDeleteId(null);
    setOpenDialog(false);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Manage Categories</h2>
        <div className="flex space-x-6">
          <GradientButton
            variant="outline"
            size="sm"
            icon={RefreshCw}
            onClick={fetchCategories}
          >
            Refresh
          </GradientButton>
          <GradientButton
            variant="primary"
            size="sm"
            icon={PlusCircle}
            onClick={() => navigate("/admin/categories/add")}
          >
            Add New Category
          </GradientButton>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="search"
          placeholder="Search category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded-lg w-64"
        />

        <div className="w-48">
          <SearchableSelect
            options={sortOptions}
            placeholder="Sort By"
            onSelect={(option) => setSort(option.value.toString())}
          />
        </div>

        <span className="text-sm bg-secondary py-2 px-4 rounded-lg font-medium text-primary">
          Total Categories:
          <span className="font-semibold text-red-600 mx-1">
            {filteredCategories.length}
          </span>
        </span>
      </div>

      {/* Table */}
      {loading ? (
        <SkeletonLoader type="list" count={5} />
      ) : (
        <div className="overflow-x-auto shadow rounded-lg">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
              <tr>
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Photo</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Products Count</th>
                <th className="py-3 px-4">Created At</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {filteredCategories.length > 0 ? (
                filteredCategories.map((c, i) => (
                  <tr key={c.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{i + 1}</td>
                    <td className="py-3 px-4">
                      <ProductImageCell
                        src={c.photos?.[0]?.base64 || "/Images/fallback.png"}
                        alt={c.name}
                      />
                    </td>
                    <td className="py-3 px-4">{c.name}</td>
                    <td className="py-3 px-4">{c.productIds?.length ?? 0}</td>
                    <td className="py-3 px-4">
                      {c.createdAt?._seconds
                        ? new Date(
                            c.createdAt._seconds * 1000
                          ).toLocaleDateString()
                        : "Unknown"}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => {
                          setDeleteId(c.id);
                          setOpenDialog(true);
                        }}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="py-10 text-center text-gray-600 bg-gray-50"
                  >
                    No categories found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Dialog */}
      <DialogComponent
        open={openDialog}
        setOpen={setOpenDialog}
        heading="Delete Category"
        messageDescription="Are you sure you want to delete this category?"
        okText="Yes, Delete"
        cancelText="Cancel"
        loading={Delbtnloading}
        okButtonAction={handleDeleteConfirm}
        okButtonColor="bg-red-600 hover:bg-red-700"
      />
    </div>
  );
};

export default ManageCategories;

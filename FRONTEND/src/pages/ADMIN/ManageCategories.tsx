import React, { useEffect, useState } from "react";
import { RefreshCw, Trash2, PlusCircle } from "lucide-react";
import SkeletonLoader from "../../components/UI/SkeletonLoader";
import DialogComponent from "../../components/UI/DialogModel";
import GradientButton from "../../components/UI/GradientButton";
import axios, {
  getcategoriesApi,
  DeleteCategoryApi,
  categoriescount,
} from "../../utils/AxiosInstance";
import { showtoast } from "../../utils/Toast";
import { useNavigate } from "react-router-dom";
import SearchableSelect from "../../components/UI/SearchableSelect";
import ProductImageCell from "../../components/AdminComp/ProductImageCell";
import { encryptData, decryptData } from "../../utils/crypto";

type Category = {
  id: string;
  name: string;
  createdAt?: { _seconds: number; _nanoseconds: number };
  productIds?: string[];
  photos?: { base64: string }[];
};

const ManageCategories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [Delbtnloading, setDelbtnloading] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();

  // Fetch categories
  const fetchCategories = async () => {
    setLoading(true);

    try {
      // 1️⃣ Fetch count from backend
      const countRes = await axios.get(categoriescount);

      const serverCount = countRes.data?.totalCount ?? 0;

      // 2️⃣ Check session cache
      const encryptedCache = sessionStorage.getItem("categories_encrypted");
      const cachedCount = Number(sessionStorage.getItem("categories_count"));

      if (encryptedCache && cachedCount === serverCount) {
        // Cache valid → use it
        const cachedData = decryptData(encryptedCache);

        if (cachedData) {
          setCategories(cachedData);
          setLoading(false);
          return;
        }
      }
      console.log("api call happened (categories)");

      // 3️⃣ Cache missing OR mismatch → fetch from server
      const res = await axios.get(getcategoriesApi);

      let fetched: Category[] = [];
      if (Array.isArray(res?.data?.categories)) {
        fetched = res.data.categories;
      } else if (Array.isArray(res?.data)) {
        fetched = res.data;
      }

      setCategories(fetched);

      // 4️⃣ Save encrypted data + count in sessionStorage
      sessionStorage.setItem("categories_encrypted", encryptData(fetched));
      sessionStorage.setItem("categories_count", serverCount.toString());

      showtoast(
        "Data Retrieval Successful",
        "Categories fetched successfully.",
        "success"
      );
    } catch (err) {
      showtoast("Data Fetching Failed", "Failed to fetch categories.", "error");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Filter and sort categories safely
  const filteredCategories = (Array.isArray(categories) ? categories : [])
    .filter(
      (c) =>
        typeof c.name === "string" &&
        c.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "az") return (a.name ?? "").localeCompare(b.name ?? "");
      if (sort === "za") return (b.name ?? "").localeCompare(a.name ?? "");
      return 0;
    });

  const sortOptions = [
    { label: "Sort By", value: "" },
    { label: "A-Z", value: "az" },
    { label: "Z-A", value: "za" },
  ];

  // Delete category
  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    setDelbtnloading(true);

    try {
      await axios.delete(`${DeleteCategoryApi}/${deleteId}`);

      // Update UI
      const updatedList = categories.filter((c) => c.id !== deleteId);
      setCategories(updatedList);

      // Update encrypted cache
      sessionStorage.setItem("categories_encrypted", encryptData(updatedList));
      sessionStorage.setItem("categories_count", updatedList.length.toString());

      showtoast(
        "Deletion Successful",
        "Category deleted successfully.",
        "success"
      );
    } catch (err) {
      showtoast("Deletion Failed", "Could not delete category.", "error");
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

        {/* Sort */}
        <div className="w-48">
          <SearchableSelect
            options={sortOptions}
            placeholder="Sort By"
            onSelect={(option) => setSort(option.value.toString())}
          />
        </div>

        <span className="text-sm bg-secondary py-2 px-4 rounded-lg font-medium text-primary">
          {`Total Categories: `}
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
                <th className="py-3 px-4 text-left">#</th>
                <th className="py-3 px-4 text-left">Photo</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Products Count</th>
                <th className="py-3 px-4 text-left">Created At</th>
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
                        src={c?.photos?.[0]?.base64 || "/Images/fallback.png"}
                        alt={c.name ?? "Product Image"}
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
                    colSpan={5}
                    className="py-10 px-4 text-center text-gray-600 bg-gray-50 border-t border-b"
                  >
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <p className="text-base font-medium">
                        No categories found
                      </p>
                      <p className="text-sm text-gray-500">
                        Try adjusting the search or sort options.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <DialogComponent
        open={openDialog}
        setOpen={setOpenDialog}
        heading="Delete Category"
        messageDescription="Are you sure you want to delete this category? This action cannot be undone."
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

import React, { useEffect, useState } from "react";
import { RefreshCw, Trash2, PlusCircle } from "lucide-react";
import SkeletonLoader from "../../components/UI/SkeletonLoader";
import DialogComponent from "../../components/UI/DialogModel";
import GradientButton from "../../components/UI/GradientButton";
import axios, {
  getProductsApi,
  DeleteProductApi,
  versionCache,
} from "../../utils/AxiosInstance";
import { Product } from "../../types";
import { showtoast } from "../../utils/Toast";
import SearchableSelect from "../../components/UI/SearchableSelect";
import { useNavigate } from "react-router-dom";
import ProductImageCell from "../../components/AdminComp/ProductImageCell";
import { encryptData, decryptData } from "../../utils/crypto";
import { setItem, getItem } from "../../utils/LocalDB";

interface ExpandableTagsProps {
  items?: string[] | null;
  limit?: number;
}

const ExpandableTags: React.FC<ExpandableTagsProps> = ({
  items,
  limit = 2,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  if (!Array.isArray(items) || items.length === 0) {
    return <span className="text-gray-400 text-sm italic">Unknown</span>;
  }

  const visibleItems = isExpanded ? items : items.slice(0, limit);
  const hiddenCount = items.length - limit;

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {visibleItems.map((loc, i) => (
        <span
          key={i}
          className="inline-flex px-2 py-0.5 rounded text-xs font-medium bg-gray-50 border border-gray-200 text-gray-700 whitespace-nowrap"
        >
          {loc}
        </span>
      ))}

      {!isExpanded && hiddenCount > 0 && (
        <button
          type="button"
          onClick={() => setIsExpanded(true)}
          className="inline-flex px-1.5 py-0.5 rounded text-[10px] font-bold bg-secondary/10 text-primary border border-primary/20 hover:bg-primary/10 transition-colors cursor-pointer"
        >
          +{hiddenCount} more
        </button>
      )}

      {isExpanded && items.length > limit && (
        <button
          type="button"
          onClick={() => setIsExpanded(false)}
          className="inline-flex px-1.5 py-0.5 rounded text-[10px] font-semibold text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors cursor-pointer underline decoration-dotted underline-offset-2"
        >
          Show less
        </button>
      )}
    </div>
  );
};

const ManageProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [Delbtnloading, setDelbtnloading] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();

  // Fetch products with IndexedDB + encrypted caching
  const fetchProducts = async () => {
    setLoading(true);

    try {
      // Get count from backend
      const countRes = await axios.get(versionCache);
      const version = countRes.data?.version ?? null;

      const cachedVersion = sessionStorage.getItem("version_For_adminProducts");

      // If count matches, load encrypted data from IndexedDB
      if (cachedVersion === version) {
        const encryptedDB = await getItem<string>("adminproducts");

        if (encryptedDB) {
          const decrypted = decryptData(encryptedDB) as Product[];

          if (Array.isArray(decrypted)) {
            setProducts(decrypted);
            setLoading(false);
            return;
          }
        }
      }

      // console.log("API call happened (products)");

      // Fetch fresh from server
      const res = await axios.get(getProductsApi);
      const fetched: Product[] = res.data?.data ?? res.data;

      setProducts(fetched);

      // Save encrypted into IndexedDB
      const encrypted = encryptData(fetched);
      await setItem("adminproducts", encrypted);

      // Save count
      sessionStorage.setItem("version_For_adminProducts", version.toString());

      showtoast("Success", "Products fetched successfully.", "success");
    } catch (err: any) {
      if (err?.response?.data?.message === "No products found.") {
        showtoast("No Products Found", "You can add a new product.", "info");
        return;
      }

      showtoast("Error", "Failed to fetch products.", "error");

      // Fallback to cached DB
      const fallback = await getItem<string>("adminproducts");
      if (fallback) {
        const decrypted = decryptData(fallback) as Product[];
        setProducts(decrypted);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Unique categories
  const categories = Array.from(
    new Set(products.map((p) => p.category ?? "Uncategorized")),
  );

  const sortOptions = [
    { label: "Sort By", value: "" },
    { label: "A-Z", value: "az" },
    { label: "Z-A", value: "za" },
  ];

  const categoryOptions = [
    { label: "All Categories", value: "" },
    ...categories.map((cat) => ({ label: cat, value: cat })),
  ];

  // Filter + sort safely
  const filteredProducts = products
    .filter((p) => p.name?.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => (category ? p.category === category : true))
    .sort((a, b) => {
      if (sort === "az") return (a.name ?? "").localeCompare(b.name ?? "");
      if (sort === "za") return (b.name ?? "").localeCompare(a.name ?? "");
      return 0;
    });

  // Delete Product
  const handleDeleteConfirm = async () => {
    if (deleteId === null) return;
    setDelbtnloading(true);

    try {
      await axios.delete(`${DeleteProductApi}/${deleteId}`);

      const updatedList = products.filter((p) => p.id !== deleteId);
      setProducts(updatedList);

      // Update IndexedDB cache
      await setItem("adminproducts", encryptData(updatedList));

      // Update count
      sessionStorage.setItem(
        "version_For_adminProducts",
        updatedList.length.toString(),
      );
      sessionStorage.setItem("categories_count", "0");
      showtoast("Success", "Product deleted successfully.", "success");
    } catch (err) {
      const errorMessage =
        typeof err === "object" && err && "response" in err
          ? (err as any)?.response?.data?.message
          : null;

      const authTokenMissing =
        errorMessage === "Authorization token is required";

      if (authTokenMissing) {
        showtoast(
          "Session Expired",
          "Your session has expired. Please log in again.",
          "error",
        );
        setTimeout(() => navigate("/admin/login"), 5000);
      } else {
        showtoast("Error", "Could not delete product.", "error");
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
        <h2 className="text-2xl font-semibold">Manage Products</h2>
        <div className="flex space-x-6">
          <GradientButton
            variant="outline"
            size="sm"
            icon={RefreshCw}
            onClick={fetchProducts}
          >
            Refresh
          </GradientButton>
          <GradientButton
            variant="primary"
            size="sm"
            icon={PlusCircle}
            onClick={() => navigate("/admin/products/add")}
          >
            Add New Product
          </GradientButton>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="search"
          placeholder="Search product..."
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

        <div className="w-48">
          <SearchableSelect
            options={categoryOptions}
            placeholder="All Categories"
            onSelect={(option) => setCategory(option.value.toString())}
          />
        </div>

        <span className="text-sm bg-secondary py-2 px-4 rounded-lg font-medium text-primary">
          Total:
          <span className="font-semibold text-red-600 mx-1">
            {filteredProducts.length}
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
                <th className="py-3 px-4">Photo</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Origin</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((p) => (
                  <tr key={p.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <ProductImageCell
                        src={p.photos?.[0]?.base64 || "/Images/fallback.png"}
                        alt={p.name}
                      />
                    </td>

                    <td className="py-3 px-4">{p.name}</td>
                    <td className="py-3 px-4 align-middle">
                      <ExpandableTags items={p.origin} limit={2} />
                    </td>
                    <td className="py-3 px-4">{p.category}</td>

                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => {
                          setDeleteId(p.id);
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
                  <td colSpan={5} className="py-10 text-center text-gray-500">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Popup */}
      <DialogComponent
        open={openDialog}
        setOpen={setOpenDialog}
        heading="Delete Product"
        messageDescription="Are you sure you want to delete this product?"
        okText="Yes, Delete"
        cancelText="Cancel"
        loading={Delbtnloading}
        okButtonAction={handleDeleteConfirm}
        okButtonColor="bg-red-600 hover:bg-red-700"
      />
    </div>
  );
};

export default ManageProducts;

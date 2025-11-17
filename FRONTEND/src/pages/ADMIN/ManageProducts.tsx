import React, { useEffect, useState } from "react";
import { RefreshCw, Trash2, PlusCircle } from "lucide-react";
import SkeletonLoader from "../../components/UI/SkeletonLoader";
import DialogComponent from "../../components/UI/DialogModel";
import GradientButton from "../../components/UI/GradientButton";
import axios, {
  getProductsApi,
  DeleteProductApi,
  productcount,
} from "../../utils/AxiosInstance";
import { Product } from "../../types";
import { showtoast } from "../../utils/Toast";
import SearchableSelect from "../../components/UI/SearchableSelect";
import { useNavigate } from "react-router-dom";
import ProductImageCell from "../../components/AdminComp/ProductImageCell";
import { encryptData, decryptData } from "../../utils/crypto";

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

  // Fetch products from API
  const fetchProducts = async () => {
    const countRes = await axios.get(productcount);

    const serverCount = countRes.data?.totalCount ?? 0;

    // 2️⃣ Check session cache
    const encryptedCache = sessionStorage.getItem("products_encrypted(admin)");
    const cachedCount = Number(sessionStorage.getItem("productcount(admin)"));

    if (encryptedCache && cachedCount === serverCount) {
      // Cache valid → use it
      const cachedData = decryptData(encryptedCache);

      if (cachedData) {
        setProducts(cachedData);
        setLoading(false);
        return;
      }
    }
    console.log("api call happened (products)");

    setLoading(true);
    try {
      const res = await axios.get(getProductsApi);
      const fetched: Product[] = res.data.data ?? res.data;

      setProducts(fetched);
      // 4️⃣ Save encrypted data + count in sessionStorage
      sessionStorage.setItem("products_encrypted(admin)", encryptData(fetched));
      sessionStorage.setItem("productcount(admin)", serverCount.toString());
      showtoast(
        "Data Retrieval Successful",
        "The data has been successfully fetched from the server.",
        "success"
      );
    } catch (err: any) {
      console.log(err.response.data.message);
      if (err?.response?.data?.message === "No products found.") {
        showtoast(
          "No Products Found",
          "We couldn't find any products in the database. If you'd like, you can add a new product using the 'Add Product' button.",
          "info"
        );

        return;
      }
      showtoast(
        "Data Fetching Failed",
        "There was an issue while fetching the data from the server. Please try again later.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Unique categories
  const categories = Array.from(
    new Set(products.map((p) => p.category ?? "Uncategorized"))
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
    .filter(
      (p) =>
        typeof p.name === "string" &&
        p.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((p) => (category ? (p.category ?? "") === category : true))
    .sort((a, b) => {
      if (sort === "az") return (a.name ?? "").localeCompare(b.name ?? "");
      if (sort === "za") return (b.name ?? "").localeCompare(a.name ?? "");
      return 0;
    });

  const handleDeleteConfirm = async () => {
    if (deleteId === null) return;
    setDelbtnloading(true);

    try {
      await axios.delete(`${DeleteProductApi}/${deleteId}`);
      showtoast(
        "Deletion Successful",
        "The product has been successfully deleted.",
        "success"
      );
      setProducts((prev) => prev.filter((p) => p.id !== deleteId));
    } catch (err: any) {
      showtoast(
        "Deletion Failed",
        "The product could not be deleted. Please try again.",
        "error"
      );
    } finally {
      setDelbtnloading(false);
      setDeleteId(null);
      setOpenDialog(false);
    }
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

        {/* Sort Select */}
        <div className="w-48">
          <SearchableSelect
            options={sortOptions}
            placeholder="Sort By"
            onSelect={(option) => setSort(option.value.toString())}
          />
        </div>

        {/* Category Select */}
        <div className="w-48">
          <SearchableSelect
            options={categoryOptions}
            placeholder="All Categories"
            onSelect={(option) => setCategory(option.value.toString())}
          />
        </div>

        <span className="text-sm bg-secondary py-2 px-4 rounded-lg font-medium text-primary">
          {`Total Products: `}
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
                <th className="py-3 px-4 text-left">Photo</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Origin</th>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <ProductImageCell
                      src={p.photos?.[0]?.base64 || "/Images/fallback.png"}
                      alt={p.name ?? "Product Image"}
                    />
                  </td>
                  <td className="py-3 px-4">{p.name ?? "Unnamed Product"}</td>
                  <td className="py-3 px-4">
                    {Array.isArray(p.origin)
                      ? p.origin.join(", ").length > 30
                        ? p.origin.join(", ").slice(0, 30) + "..."
                        : p.origin.join(", ")
                      : "Unknown"}
                  </td>
                  <td className="py-3 px-4">{p.category ?? "Uncategorized"}</td>
                  <td className="py-3 px-4 text-center space-x-3">
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
              ))}

              {filteredProducts.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="py-10 px-4 text-center text-gray-600 bg-gray-50 border-t border-b"
                  >
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <p className="text-base font-medium">No products found</p>
                      <p className="text-sm text-gray-500">
                        Try adjusting the filters or search keyword.
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
        heading="Delete Product"
        messageDescription="Are you sure you want to delete this product? This action cannot be undone."
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

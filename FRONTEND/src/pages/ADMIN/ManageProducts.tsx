import React, { useEffect, useState } from "react";
import { RefreshCw, Edit, Trash2 } from "lucide-react";
import SkeletonLoader from "../../components/UI/SkeletonLoader";
import DialogComponent from "../../components/UI/DialogModel";
import GradientButton from "../../components/UI/GradientButton";
import axios, {
  getProductsApi,
  DeleteProductApi,
  // EditProductApi,
} from "../../utils/AxiosInstance";
import { Product } from "../../types";
import { showtoast } from "../../utils/Toast";

const ManageProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [Delbtnloading, setDelbtnloading] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  // Fetch products from API
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(getProductsApi);

      const fetched: Product[] = res.data.data ?? res.data;
      setProducts(fetched);
      showtoast(
        "Data Retrieval Successful",
        "The data has been successfully fetched from the server.",
        "success"
      );
    } catch (err: any) {
      console.error("Error fetching products:", err);
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
  const categories = Array.from(new Set(products.map((p) => p.category)));

  // Filter + sort
  const filteredProducts = products
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => (category ? p.category === category : true))
    .sort((a, b) => {
      if (sort === "az") return a.name.localeCompare(b.name);
      return 0;
    });

  const handleDeleteConfirm = async () => {
    setDelbtnloading(true);
    if (deleteId === null) return;

    try {
      await axios.delete(`${DeleteProductApi}/${deleteId}`);
      showtoast(
        "Deletion Successful",
        "The product has been successfully deleted.",
        "success"
      );

      setProducts((prev) => prev.filter((p) => p.id !== deleteId));
    } catch (err: any) {
      console.error("Error deleting product:", err);
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

  // const handleEdit = async (id: number) => {
  //   // You might want to navigate to an edit page or open a modal
  //   // For simple update, you might do:
  //   try {
  //     const productToEdit = products.find((p) => p.id === id);
  //     if (!productToEdit) {
  //       console.warn("Product to edit not found");
  //       return;
  //     }
  //     // Example: open edit modal, let user change, then call API
  //     const updatedData: Partial<Product> = {
  //       // example: name: "New Name"
  //     };
  //     const res = await axios.put(`${EditProductApi}/${id}`, updatedData);
  //     const updated: Product = res.data.data ?? res.data;

  //     // Update local state
  //     setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
  //   } catch (err: any) {
  //     console.error("Error editing product:", err);
  //   }
  // };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Manage Products</h2>
        <GradientButton
          variant="outline"
          size="sm"
          icon={RefreshCw}
          onClick={fetchProducts}
        >
          Refresh
        </GradientButton>
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

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border px-3 py-2 rounded-lg"
        >
          <option value="">Sort By</option>
          <option value="az">A-Z</option>
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-3 py-2 rounded-lg"
        >
          <option value="">All Categories</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>
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
                <th className="py-3 px-4 text-left">Availability</th>
                <th className="py-3 px-4 text-left">Origin</th>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {filteredProducts.map((p, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <img
                      src={p.photos[0] || "/Images/fallback.png"}
                      alt={p.name}
                      onError={(e) =>
                        ((e.target as HTMLImageElement).src =
                          "/Images/fallback.png")
                      }
                      className="h-14 w-14 object-cover rounded-md"
                    />
                  </td>
                  <td className="py-3 px-4">{p.name}</td>
                  <td className="py-3 px-4">{p.availability}</td>
                  <td className="py-3 px-4">
                    {p.origin.join(", ").length > 30
                      ? p.origin.join(", ").slice(0, 30) + "..."
                      : p.origin.join(", ")}
                  </td>
                  <td className="py-3 px-4">{p.category}</td>
                  <td className="py-3 px-4 text-center space-x-3">
                    {/* <button
                      onClick={() => handleEdit(p.id)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit />
                    </button> */}
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

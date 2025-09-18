import React, { useEffect, useState } from "react";
import { RefreshCw, Edit, Trash2 } from "lucide-react";

import SkeletonLoader from "../../components/UI/SkeletonLoader";

interface Product {
  id: string;
  name: string;
  price: string;
  availability: string;
  quality: string;
  certifications: string[];
  photos: string[];
  origin: string;
  season: string;
  category: string;
}

const mockData: Product[] = [
  {
    id: "7",
    name: "Wheat Grains",
    price: "$2.80",
    availability: "In Stock",
    quality: "Grade A",
    certifications: ["ISO", "FSSAI"],
    photos: [
      "https://images.pexels.com/photos/4110004/pexels-photo-4110004.jpeg",
    ],
    origin: "India",
    season: "Year-round",
    category: "exports",
  },
  {
    id: "8",
    name: "Basmati Rice",
    price: "$4.20",
    availability: "Out of Stock",
    quality: "Grade A",
    certifications: ["ISO"],
    photos: [
      "https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg",
    ],
    origin: "India",
    season: "Year-round",
    category: "exports",
  },
];

const ManageProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  // Simulate API fetch
  const fetchProducts = () => {
    setLoading(true);
    setTimeout(() => {
      setProducts(mockData);
      setLoading(false);
    }, 1500);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle search + filters
  const filteredProducts = products
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === "az") return a.name.localeCompare(b.name);
      if (sort === "priceHigh")
        return (
          parseFloat(b.price.replace("$", "")) -
          parseFloat(a.price.replace("$", ""))
        );
      if (sort === "priceLow")
        return (
          parseFloat(a.price.replace("$", "")) -
          parseFloat(b.price.replace("$", ""))
        );
      return 0;
    });

  const handleDelete = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Manage Products</h2>
        <button
          onClick={fetchProducts}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <RefreshCw /> Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
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
          <option value="priceHigh">Price: High → Low</option>
          <option value="priceLow">Price: Low → High</option>
        </select>
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
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Stock</th>
                <th className="py-3 px-4 text-left">Certifications</th>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {filteredProducts.map((p, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <img
                      src={p.photos[0]}
                      alt={p.name}
                      className="h-14 w-14 object-cover rounded-md"
                    />
                  </td>
                  <td className="py-3 px-4">{p.name}</td>
                  <td className="py-3 px-4">{p.price}</td>
                  <td className="py-3 px-4">{p.availability}</td>
                  <td className="py-3 px-4">{p.certifications.join(", ")}</td>
                  <td className="py-3 px-4">{p.category}</td>
                  <td className="py-3 px-4 text-center space-x-3">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Edit />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
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
                    colSpan={7}
                    className="py-6 text-center text-gray-500 italic"
                  >
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;

import { useEffect, useState } from "react";
import { Filter, ChevronDown, X, Search } from "lucide-react";
import CustomSelect from "./CustomSelect";

interface ProductFilterProps {
  filters: FilterOptions;
  products: Product[] | null | undefined;
  onFilterChange: (filters: FilterOptions) => void;
}

interface FilterOptions {
  category: string;
  origin: string;
  searchTerm: string;
  availability: string;
}

interface Product {
  category: string;
  origin: string[];
  season: string;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  filters,
  products,
  onFilterChange,
}) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [origins, setOrigins] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const uniqueCategories = Array.from(
      new Set(products?.map((product) => product.category))
    );
    const uniqueOrigins = Array.from(
      new Set(products?.flatMap((product) => product.origin))
    );

    setCategories(["All", ...uniqueCategories]);
    setOrigins(["All", ...uniqueOrigins]);
  }, [products]);

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFilterChange({
      category: "All",
      origin: "All",
      searchTerm: "",
      availability: "All",
    });
  };

  const hasActiveFilters =
    filters.searchTerm !== "" ||
    filters.category !== "All" ||
    filters.origin !== "All" ||
    filters.availability !== "All";

  return (
    <div
      className={`relative bg-white rounded-2xl shadow-lg border border-gray-100 mb-8 overflow-hidden transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {/* ===== Header Section ===== */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md px-4 sm:px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Left Side: Title */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Filter className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                Filter Products
              </h3>
              <p className="text-sm text-gray-600">
                {hasActiveFilters
                  ? "Active filters applied"
                  : "Refine your search below"}
              </p>
            </div>
          </div>

          {/* Middle Section (Selected Category Info) */}
          <div className="bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-sm sm:text-base flex flex-col sm:flex-row sm:items-center sm:justify-between shadow-sm flex-1 sm:flex-none">
            <div className="flex items-center justify-between sm:justify-start">
              <span className="font-semibold text-primary mr-2">Category:</span>
              <span className="font-medium text-gray-900 truncate">
                {filters.category}
              </span>
            </div>

            {!isExpanded && (
              <p className="text-sm text-gray-600 mt-2 sm:mt-0 sm:ml-3">
                Click{" "}
                <button
                  className="font-medium text-indigo-600 underline mx-1"
                  onClick={() => setIsExpanded(true)}
                >
                  Show Filters
                </button>
                to adjust filters.
              </p>
            )}
          </div>

          {/* Right Side: Buttons */}
          <div className="flex items-center justify-end gap-2 sm:gap-3">
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-600 hover:text-primary transition"
              >
                <X className="w-4 h-4" />
                Clear All
              </button>
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all duration-200 transform hover:scale-105 text-xs sm:text-sm"
            >
              <Filter className="w-4 h-4" />
              {isExpanded ? "Hide Filters" : "Show Filters"}
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Active Filter Tags */}
        {hasActiveFilters && (
          <div className="mt-5 pt-4 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {filters.searchTerm && (
                <FilterTag
                  label={`Search: "${filters.searchTerm}"`}
                  onClear={() => handleFilterChange("searchTerm", "")}
                />
              )}
              {filters.category !== "All" && (
                <FilterTag
                  label={`Category: ${filters.category}`}
                  onClear={() => handleFilterChange("category", "All")}
                />
              )}
              {filters.origin !== "All" && (
                <FilterTag
                  label={`Origin: ${filters.origin}`}
                  onClear={() => handleFilterChange("origin", "All")}
                />
              )}
              {filters.availability !== "All" && (
                <FilterTag
                  label={`Availability: ${filters.availability}`}
                  onClear={() => handleFilterChange("availability", "All")}
                />
              )}
            </div>
          </div>
        )}
      </div>

      {/* ===== Filter Inputs ===== */}
      <div
        className={`p-4 sm:p-6 ${
          isExpanded ? "block" : "hidden"
        } transition-all duration-200`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Search Bar */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Products
            </label>
            <div className="relative">
              <input
                type="text"
                value={filters.searchTerm}
                onChange={(e) =>
                  handleFilterChange("searchTerm", e.target.value)
                }
                placeholder="Search by name, description..."
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 pl-10 focus:ring-2 focus:ring-primary focus:border-primary transition duration-200 text-sm sm:text-base"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 sm:w-5 h-4 sm:h-5" />
              {filters.searchTerm && (
                <button
                  onClick={() => handleFilterChange("searchTerm", "")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Dropdowns */}
          <CustomSelect
            label="Category"
            value={filters.category}
            options={categories}
            onChange={(value) => handleFilterChange("category", value)}
            placeholder="All Categories"
          />

          <CustomSelect
            label="Origin"
            value={filters.origin}
            options={origins}
            onChange={(value) => handleFilterChange("origin", value)}
            placeholder="All Origins"
          />
        </div>
      </div>
    </div>
  );
};

/* ===== Reusable Filter Tag Component ===== */
const FilterTag = ({
  label,
  onClear,
}: {
  label: string;
  onClear: () => void;
}) => (
  <span className="inline-flex items-center gap-1 sm:gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs sm:text-sm">
    {label}
    <button
      onClick={onClear}
      className="hover:bg-primary/20 rounded-full p-0.5 transition"
    >
      <X className="w-3 h-3" />
    </button>
  </span>
);

export default ProductFilter;

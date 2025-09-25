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
    onFilterChange({
      ...filters,
      [key]: value,
    });
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

  const availabilityOptions = ["All", "In Stock", "Out of Stock"];

  return (
    <div
      className={`relative bg-white rounded-2xl shadow-xl border border-gray-100 mb-8 overflow-auto transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {/* Header Section */}
      <div className="sticky top-0  z-10 bg-white backdrop:blur-lg px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center mb-4 sm:mb-0">
            <div className="p-2 bg-primary rounded-lg mr-3">
              <Filter className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Filter Products
              </h3>
              <p className="text-sm text-gray-600">
                {hasActiveFilters
                  ? "Active filters applied"
                  : "Refine your search"}
              </p>
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-md shadow-sm max-w-sm mx-auto">
            <div className="flex items-center mb-2">
              <span className="font-bold text-primary mr-2">Category :</span>
              <span className="font-semibold text-gray-900">
                {filters.category}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              Click{" "}
              <span className="font-medium text-indigo-600 underline cursor-pointer">
                Show Filters
              </span>{" "}
              to adjust categories and more.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-primary transition-colors duration-200"
              >
                <X className="w-4 h-4" />
                Clear All
              </button>
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all duration-200 transform hover:scale-105"
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
        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="mt-6 pt-6 border-t border-gray-200 ">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-medium text-gray-700">
                Active Filters:
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.searchTerm && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  Search: "{filters.searchTerm}"
                  <button
                    onClick={() => handleFilterChange("searchTerm", "")}
                    className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filters.category !== "All" && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  Category: {filters.category}
                  <button
                    onClick={() => handleFilterChange("category", "All")}
                    className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filters.origin !== "All" && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  Origin: {filters.origin}
                  <button
                    onClick={() => handleFilterChange("origin", "All")}
                    className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filters.availability !== "All" && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  Availability: {filters.availability}
                  <button
                    onClick={() => handleFilterChange("availability", "All")}
                    className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Filter Content */}
      <div
        className={`p-6 ${
          isExpanded ? "block" : "hidden"
        } max-w-full transition-all duration-200`}
      >
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-4">
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
                className="w-full border border-gray-300 rounded-xl px-4 py-3 pl-12 focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 hover:border-gray-400"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              {filters.searchTerm && (
                <button
                  onClick={() => handleFilterChange("searchTerm", "")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

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

          <CustomSelect
            label="Availability"
            value={filters.availability}
            options={availabilityOptions}
            onChange={(value) => handleFilterChange("availability", value)}
            placeholder="All Availability"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;

import React from "react";
import { Filter } from "lucide-react";

interface FilterOptions {
  category: string;
  origin: string;
  season: string;
  certification: string;
  quality: string;
}

interface ProductFilterProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  filters,
  onFilterChange,
}) => {
  const origins = ["All", "Thailand", "Malaysia", "Vietnam", "India"];
  const seasons = [
    "All",
    "Year-round",
    "May-July",
    "June-August",
    "May-September",
  ];
  const certifications = ["All", "ISO", "FSSAI", "Organic"];
  const qualities = ["All", "Grade A", "Grade B"];

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    onFilterChange({
      ...filters,
      [key]: value,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex items-center mb-4">
        <Filter className="h-5 w-5 text-primary mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Filter Products</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Origin
          </label>
          <select
            value={filters.origin}
            onChange={(e) => handleFilterChange("origin", e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {origins.map((origin) => (
              <option key={origin} value={origin}>
                {origin}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Season
          </label>
          <select
            value={filters.season}
            onChange={(e) => handleFilterChange("season", e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {seasons.map((season) => (
              <option key={season} value={season}>
                {season}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Certification
          </label>
          <select
            value={filters.certification}
            onChange={(e) =>
              handleFilterChange("certification", e.target.value)
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {certifications.map((cert) => (
              <option key={cert} value={cert}>
                {cert}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quality
          </label>
          <select
            value={filters.quality}
            onChange={(e) => handleFilterChange("quality", e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {qualities.map((quality) => (
              <option key={quality} value={quality}>
                {quality}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;

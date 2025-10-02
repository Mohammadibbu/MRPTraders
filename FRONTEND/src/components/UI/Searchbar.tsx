import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";
import { showtoast } from "../../utils/Toast";
import { useApp } from "../../context/AppContext";

function SearchBar() {
  const suggestions: string[] = JSON.parse(
    localStorage.getItem("suggestions") || "[]"
  );

  const { searchTerm, setSearchTerm } = useApp();
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (suggestions.length > 0 && value) {
      const filtered = suggestions.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      showtoast(
        "Search Term Required",
        "Please enter a search term before proceeding.",
        "error"
      );
      return;
    }

    navigate("/products");
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
    navigate("/products");
  };

  return (
    <div className="hidden md:flex items-center flex-2 max-w-md mx-8">
      <div className="relative w-full group">
        <div className="absolute inset-0 bg-gradient-to-r from-secondarylight/20 to-secondary/20 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary h-5 w-5 transition-colors duration-300 " />

          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-2 border outline-none border-secondarylight/50 rounded-lg focus:ring-2 focus:ring-secondarylight focus:border-transparent transition-all duration-300 shadow-lg hover:shadow-xl"
            style={{ backgroundColor: "#F7F4F1", color: "#5F1A35" }}
            autoComplete="off"
          />

          {showSuggestions && filteredSuggestions.length > 0 && (
            <ul className="absolute z-10 mt-2 max-h-80 overflow-y-scroll w-full bg-white border border-secondarylight/50 rounded-lg shadow-lg">
              <li className="px-4 py-2 text-gray-400 text-md font-semibold">
                Suggestions
              </li>
              <hr className="border-t border-secondarylight/50" />
              {filteredSuggestions.map((suggestion, idx) => (
                <li
                  key={idx}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-4 py-2 rounded-lg hover:bg-secondarylight cursor-pointer"
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}

          <button
            className="absolute top-1 right-1 bg-primary rounded-lg shadow-sm p-1"
            type="button"
            onClick={handleSearch}
            aria-label="Search"
          >
            <ArrowRight className="text-secondarylight hover:translate-x-1 duration-200" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;

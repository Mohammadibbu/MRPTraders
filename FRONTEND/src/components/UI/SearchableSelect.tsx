import React, { useEffect, useRef, useState } from "react";
import { Search, X, ChevronDown } from "lucide-react";

export interface Option {
  label: string;
  value: string | number;
}

interface SearchableSelectProps {
  options: Option[];
  placeholder?: string;
  onSelect: (option: Option) => void;
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({
  options,
  placeholder = "Select an option...",
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // animation visibility
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Option | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);

  // Filter options safely
  const filteredOptions = options.filter(
    (opt) =>
      typeof opt.label === "string" &&
      opt.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (option: Option) => {
    setSelected(option);
    closeModal();
    onSelect(option);
  };

  const openModal = () => {
    setIsOpen(true);
    setTimeout(() => setIsVisible(true), 10); // small delay for animation
  };

  const closeModal = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsOpen(false);
      setSearch("");
    }, 250); // match transition time
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeModal();
      }
    };

    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative w-full">
      {/* Trigger Button */}
      <button
        onClick={openModal}
        className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md bg-secondarylight hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
      >
        <span>{selected?.label || placeholder}</span>

        {/* Animated Chevron */}
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* Overlay Modal */}
      {isOpen && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 transition-opacity duration-200 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            ref={modalRef}
            className={`bg-secondarylight rounded-lg shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-md max-h-[80vh] flex flex-col transform transition-all duration-300 ${
              isVisible
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 -translate-y-10"
            }`}
          >
            {/* Header */}
            <div className="flex items-center gap-2 p-3 border-b border-gray-200">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..."
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <button
                onClick={closeModal}
                className="p-2 text-primary hover:text-primary/70 rounded-md hover:bg-secondary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Options List */}
            <div className="overflow-y-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => handleSelect(option)}
                    className={`px-4 py-2 cursor-pointer transition-colors ${
                      selected?.value === option.value
                        ? "bg-primary/20 text-primary/90"
                        : "hover:bg-primary/10"
                    }`}
                  >
                    {option.label || "Unnamed option"}
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">
                  No results found
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchableSelect;

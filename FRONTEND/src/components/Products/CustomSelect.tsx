import { useState, useEffect, useRef } from "react";
import { ChevronDown, Search, Check } from "lucide-react";
import { createPortal } from "react-dom";

interface CustomSelectProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  placeholder?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  value,
  options,
  onChange,
  placeholder = "Select...",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //  Set dropdown position
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [isOpen]);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
    setSearchTerm("");
  };

  const displayValue = value === "All" ? placeholder : value;

  // Portal dropdown content
  const dropdownMenu = (
    <div
      ref={dropdownRef}
      className="z-20 mt-1 bg-white shadow-lg rounded-xl border border-gray-200 max-h-60 overflow-y-auto"
      style={{
        position: "absolute",
        top: dropdownPosition.top,
        left: dropdownPosition.left,
        width: dropdownPosition.width,
      }}
    >
      {options.length > 5 && (
        <div className="p-3 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-sm"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      {filteredOptions.map((option, index) => (
        <button
          key={option}
          onClick={() => handleSelect(option)}
          className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 flex items-center justify-between group ${
            index === 0 ? "rounded-t-xl" : ""
          } ${index === filteredOptions.length - 1 ? "rounded-b-xl" : ""}`}
        >
          <span className="text-gray-900 group-hover:text-primary transition-colors">
            {option}
          </span>
          {value === option && <Check className="w-4 h-4 text-primary" />}
        </button>
      ))}

      {filteredOptions.length === 0 && (
        <div className="px-4 py-3 text-gray-500 text-center">
          No options found
        </div>
      )}
    </div>
  );

  return (
    <div className="relative" ref={wrapperRef}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          ref={buttonRef}
          className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-left focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 hover:border-gray-400 flex items-center justify-between group"
        >
          <span
            className={`${
              value === "All" ? "text-gray-500" : "text-gray-900"
            } truncate`}
          >
            {displayValue}
          </span>
          <ChevronDown
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 group-hover:text-gray-600 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && createPortal(dropdownMenu, document.body)}
      </div>
    </div>
  );
};

export default CustomSelect;

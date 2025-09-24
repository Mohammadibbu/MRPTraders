import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "../types";

// import mockProducts from "../data/mock"; // Mock data for initial state

interface AppContextType {
  products: Product[] | null | undefined;
  setProducts: (products: Product[]) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Initialize state with mock data or empty array if mock data is unavailable
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <AppContext.Provider
      value={{ products, setProducts, searchTerm, setSearchTerm }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

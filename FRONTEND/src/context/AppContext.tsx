import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product, Category } from "../types";
import { useDataSync } from "../hooks/useDataSync";
// import { useDataSync } from "../hooks/useDataSync copy";

interface AppContextType {
  products: Product[] | null;
  setProducts: (products: Product[]) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  loading: boolean;
  categories: Category[] | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Use the separated logic hook
  // const { products, setProducts, categories, loading } = useDataSync();
  const { products, setProducts, categories, loading } = useDataSync();

  // UI state remains here
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <AppContext.Provider
      value={{
        products,
        setProducts,
        searchTerm,
        setSearchTerm,
        loading,
        categories,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

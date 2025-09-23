import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "../types";
// import { mockProducts, mockUsers } from '../data/mockData';
import mockProducts from "../data/mock";

interface AppContextType {
  // user: User | null;
  // setUser: (user: User | null) => void;
  products: Product[];
  setProducts: (products: Product[]) => void;
  // orders: Order[];
  // setOrders: (orders: Order[]) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>(mockProducts);
  // const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <AppContext.Provider
      value={{
        // user,
        // setUser,
        products,
        setProducts,
        // orders,
        // setOrders,
        searchTerm,
        setSearchTerm,
      }}
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

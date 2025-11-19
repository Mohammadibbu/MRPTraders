import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Product, Category } from "../types";
import { encryptData, decryptData } from "../utils/crypto";
import axios, {
  getProductsApi,
  productcount,
  categoriescount,
  getcategoriesApi,
} from "../utils/AxiosInstance";
import { setItem, getItem } from "../utils/LocalDB";
import { ArrowLeftSquare } from "lucide-react";

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
  const [products, setProducts] = useState<Product[] | null>(null);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  /** Fetch categories */
  const fetchCategories = async () => {
    try {
      // 1. Fetch category count from server
      const countRes = await axios.get(categoriescount);
      const serverCount = countRes?.data?.totalCount;

      const cachedCount = Number(localStorage.getItem("categories_count_CLI"));

      // 2. Validate serverCount
      if (serverCount == null || isNaN(serverCount)) {
        console.warn("Could not fetch category count");
        return;
      }

      // 3. If count matches → try to load from cache
      if (cachedCount === serverCount) {
        const encryptedData = await getItem<string>("categories");
        if (encryptedData) {
          const decryptedData = decryptData(encryptedData) as Category[];
          setCategories(decryptedData);
          return;
        }
      }

      // 4. Fetch fresh categories
      const res = await axios.get(getcategoriesApi);

      const fetched: Category[] = Array.isArray(res?.data?.categories)
        ? res.data.categories
        : Array.isArray(res?.data)
        ? res.data
        : [];

      setCategories(fetched);

      // 5. Cache categories + count
      try {
        const encrypted = encryptData(fetched);
        await setItem("categories", encrypted);
        localStorage.setItem("categories_count_CLI", serverCount.toString());
      } catch (e) {
        console.warn("Failed to save categories to IndexedDB:", e);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  /** Fetch products */
  const fetchProducts = async () => {
    try {
      // 1. Fetch server count
      const countRes = await axios.get(productcount);
      const serverCount = countRes?.data?.totalCount;
      const cachedCount = Number(localStorage.getItem("products_count_CLI"));

      // 2. Validate count
      if (serverCount == null || isNaN(serverCount)) {
        console.warn("Could not fetch product count");
        return;
      }

      // No products on server → stop
      if (serverCount === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }

      // 3. If cached count matches → use cache
      if (cachedCount === serverCount) {
        const encryptedData = await getItem<string>("products");
        if (encryptedData) {
          const decryptedData = decryptData(encryptedData) as Product[];
          setProducts(decryptedData);
          setLoading(false);
          return;
        }
      }

      // 4. Fetch fresh products
      const res = await axios.get(getProductsApi);
      const freshData: Product[] = Array.isArray(res?.data) ? res.data : [];

      setProducts(freshData);
      setLoading(false);

      // 5. Cache fresh data
      try {
        const encrypted = encryptData(freshData);
        await setItem("products", encrypted);
        localStorage.setItem("products_count_CLI", serverCount.toString());
      } catch (e) {
        console.warn("Failed to save products to IndexedDB:", e);
      }
    } catch (err) {
      console.error("Error fetching products:", err);

      // 6. Fallback to local cache
      const encryptedData = await getItem<string>("products");
      if (encryptedData) {
        const decryptedData = decryptData(encryptedData) as Product[];
        setProducts(decryptedData);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

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

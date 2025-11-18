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

interface AppContextType {
  products: Product[] | null;
  setProducts: (products: Product[]) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  loading: boolean;
  categories: Category[] | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface CachedData<T> {
  data: T;
  timestamp: number;
  totalCount: number;
}

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const fetchCategories = async () => {
    try {
      const countRes = await axios.get(categoriescount);
      const serverCount = countRes.data?.totalCount ?? 0;

      const encryptedCache = localStorage.getItem("categories_encrypted");
      const cachedCount = Number(localStorage.getItem("categories_count"));

      if (encryptedCache && cachedCount === serverCount) {
        const cachedData = decryptData(encryptedCache) as Category[] | null;
        if (cachedData) {
          setCategories(cachedData);
          return;
        }
      }

      // Fetch from server
      const res = await axios.get(getcategoriesApi);
      const fetched: Category[] = Array.isArray(res?.data?.categories)
        ? res.data.categories
        : Array.isArray(res?.data)
        ? res.data
        : [];

      setCategories(fetched);

      try {
        localStorage.setItem("categories_encrypted", encryptData(fetched));
        localStorage.setItem("categories_count", serverCount.toString());
      } catch (e) {
        console.warn("Failed to save categories to localStorage:", e);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const fetchProducts = async () => {
    const cacheKey = "productsCache";
    const now = Date.now();

    try {
      const countRes = await axios.get(productcount);
      const currentCount = countRes?.data?.totalCount;

      if (!currentCount) {
        console.warn("Could not fetch product count");
        return;
      }

      const cachedRaw = localStorage.getItem(cacheKey);
      const cached: CachedData<Product[]> | null = cachedRaw
        ? (decryptData(cachedRaw) as CachedData<Product[]>)
        : null;

      if (cached && cached.totalCount === currentCount) {
        setProducts(cached.data);
        // Refresh timestamp
        try {
          localStorage.setItem(
            cacheKey,
            encryptData({ ...cached, timestamp: now })
          );
        } catch {
          // ignore quota errors here
        }
        setLoading(false);
      } else {
        const res = await axios.get(getProductsApi);
        const freshData: Product[] = res.data;

        const newCache: CachedData<Product[]> = {
          data: freshData,
          timestamp: now,
          totalCount: currentCount,
        };

        try {
          localStorage.setItem(cacheKey, encryptData(newCache));
        } catch (e) {
          console.warn("Failed to save products to localStorage:", e);
        }

        setProducts(freshData);
        setLoading(false);
      }
    } catch (err) {
      console.error("Error fetching products:", err);

      // Fallback to cache
      const fallbackRaw = localStorage.getItem(cacheKey);
      const fallback: CachedData<Product[]> | null = fallbackRaw
        ? (decryptData(fallbackRaw) as CachedData<Product[]>)
        : null;

      if (fallback?.data) {
        setProducts(fallback.data);
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

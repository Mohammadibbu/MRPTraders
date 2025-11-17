import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Product, Category } from "../types";
import { encryptData, decryptData } from "../utils/crypto";
// import mockProducts from "../data/mock"; // Mock data for initial state
import axios, {
  getProductsApi,
  productcount,
  categoriescount,
  getcategoriesApi,
} from "../utils/AxiosInstance";

interface AppContextType {
  products: Product[] | null | undefined;
  setProducts: (products: Product[]) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  loading: Boolean;
  categories: Category[] | null | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Initialize state with mock data or empty array if mock data is unavailable
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setloading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const fetchCategories = async () => {
    try {
      // 1️⃣ Fetch count from backend
      const countRes = await axios.get(categoriescount);

      const serverCount = countRes.data?.totalCount ?? 0;

      // 2️⃣ Check session cache
      const encryptedCache = localStorage.getItem("categories_encrypted");
      const cachedCount = Number(localStorage.getItem("categories_count"));

      if (encryptedCache && cachedCount === serverCount) {
        // Cache valid → use it
        const cachedData = decryptData(encryptedCache);

        if (cachedData) {
          console.log(cachedCount);

          setCategories(cachedData);

          return;
        }
      }
      console.log("api call happened (categories)");

      // 3️⃣ Cache missing OR mismatch → fetch from server
      const res = await axios.get(getcategoriesApi);

      let fetched: Category[] = [];
      if (Array.isArray(res?.data?.categories)) {
        fetched = res.data.categories;
      } else if (Array.isArray(res?.data)) {
        fetched = res.data;
      }

      setCategories(fetched);

      // 4️⃣ Save encrypted data + count in localStorage
      localStorage.setItem("categories_encrypted", encryptData(fetched));
      localStorage.setItem("categories_count", serverCount.toString());
    } catch (err) {}
  };

  useEffect(() => {
    fetchCategories();
    const cacheKey = "productsCache";
    const fetchProducts = async () => {
      const now = Date.now();

      try {
        const countRes = await axios.get(productcount);
        const currentCount = countRes?.data?.totalCount;

        if (!currentCount) {
          console.warn("Could not fetch product count");

          return;
        }

        const cachedRaw = localStorage.getItem(cacheKey);
        const cached = cachedRaw ? decryptData(cachedRaw) : null;

        if (cached && cached.totalCount === currentCount) {
          // Cache is valid
          localStorage.setItem(
            cacheKey,
            encryptData({ ...cached, timestamp: now })
          );
          setProducts(cached.data);
          setloading(false);
        } else {
          // Cache missing or outdated
          console.log("API CALL HAPPENED");
          const res = await axios.get(getProductsApi);
          const freshData = res.data;

          const newCache = {
            data: freshData,
            timestamp: now,
            totalCount: currentCount,
          };

          localStorage.setItem(cacheKey, encryptData(newCache));
          setProducts(freshData);
          setloading(false);
        }
      } catch (err) {
        console.error("Error fetching products:", err);

        // Fallback to cache
        const fallbackRaw = localStorage.getItem(cacheKey);
        const fallback = fallbackRaw ? decryptData(fallbackRaw) : null;

        if (fallback?.data) {
          setloading(false);
          setProducts(fallback.data);
        }
      } finally {
      }
    };

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
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

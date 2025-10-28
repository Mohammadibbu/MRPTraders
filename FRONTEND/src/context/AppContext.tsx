import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Product } from "../types";

// import mockProducts from "../data/mock"; // Mock data for initial state
import axios, { getProductsApi, productcount } from "../utils/AxiosInstance";

interface AppContextType {
  products: Product[] | null | undefined;
  setProducts: (products: Product[]) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  loading: Boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Initialize state with mock data or empty array if mock data is unavailable
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setloading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Encode data to Base64 string
  // Encode data to Base64
  function encodeData(data: any): string {
    return btoa(unescape(encodeURIComponent(JSON.stringify(data))));
  }

  // Decode Base64 string to object
  function decodeData(encodedStr: string): any | null {
    try {
      return JSON.parse(decodeURIComponent(escape(atob(encodedStr))));
    } catch (e) {
      console.error("Failed to decode data:", e);
      return null;
    }
  }

  useEffect(() => {
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
        const cached = cachedRaw ? decodeData(cachedRaw) : null;

        if (cached && cached.totalCount === currentCount) {
          // Cache is valid
          localStorage.setItem(
            cacheKey,
            encodeData({ ...cached, timestamp: now })
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

          localStorage.setItem(cacheKey, encodeData(newCache));
          setProducts(freshData);
          setloading(false);
        }
      } catch (err) {
        console.error("Error fetching products:", err);

        // Fallback to cache
        const fallbackRaw = localStorage.getItem(cacheKey);
        const fallback = fallbackRaw ? decodeData(fallbackRaw) : null;

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
      value={{ products, setProducts, searchTerm, setSearchTerm, loading }}
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

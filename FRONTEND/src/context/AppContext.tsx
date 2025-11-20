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
  versionCache,
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

  let cachedVersion: string | null = null;

  /** Fetch version once */
  const fetchVersion = async () => {
    try {
      const res = await axios.get(versionCache);
      cachedVersion = res?.data?.version?.toString() || null;
    } catch (e) {
      console.warn("Could not fetch cache version:", e);
      cachedVersion = null;
    }
  };

  /** Fetch categories */
  const fetchCategories = async () => {
    if (!cachedVersion) await fetchVersion();

    const storedVersion = localStorage.getItem("VersionCache_CLI");
    if (cachedVersion && storedVersion === cachedVersion) {
      console.log("api call not happens");

      const encryptedData = await getItem<string>("categories");
      if (encryptedData) {
        setCategories(decryptData(encryptedData) as Category[]);
        return;
      }
    }

    console.log("api call happens");
    try {
      const res = await axios.get(getcategoriesApi);
      const categories: Category[] = Array.isArray(res?.data?.categories)
        ? res.data.categories
        : Array.isArray(res?.data)
        ? res.data
        : [];

      setCategories(categories);

      await setItem("categories", encryptData(categories));
      if (cachedVersion)
        localStorage.setItem("VersionCache_CLI", cachedVersion);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  /** Fetch products */
  const fetchProducts = async () => {
    if (!cachedVersion) await fetchVersion();

    const storedVersion = localStorage.getItem("VersionCache_CLI");
    if (cachedVersion && storedVersion === cachedVersion) {
      console.log("api call not happens");

      const encryptedData = await getItem<string>("products");
      if (encryptedData) {
        setProducts(decryptData(encryptedData) as Product[]);
        setLoading(false);
        return;
      }
    }

    console.log("api call happens");
    try {
      const res = await axios.get(getProductsApi);
      const products: Product[] = Array.isArray(res?.data) ? res.data : [];

      setProducts(products);
      setLoading(false);

      await setItem("products", encryptData(products));
      if (cachedVersion)
        localStorage.setItem("VersionCache_CLI", cachedVersion);
    } catch (err) {
      console.error("Error fetching products:", err);
      setLoading(false);
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

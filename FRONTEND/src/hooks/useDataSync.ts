import { useState, useEffect, useRef } from "react";
import { Product, Category } from "../types";
import { encryptData, decryptData } from "../utils/crypto";
import axios, {
  getProductsApi,
  versionCache,
  getcategoriesApi,
} from "../utils/AxiosInstance";
import { setItem, getItem } from "../utils/LocalDB";

export const useDataSync = () => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Ref to prevent double-firing in StrictMode
  const isSyncing = useRef(false);

  const syncData = async () => {
    if (isSyncing.current) return;
    isSyncing.current = true;

    // --- PHASE 1: Load Local Data Immediately (Instant UX) ---
    try {
      const [localCatsEncrypted, localProdsEncrypted] = await Promise.all([
        getItem<string>("categories"),
        getItem<string>("products"),
      ]);

      let hasLocalData = false;

      if (localCatsEncrypted) {
        setCategories(decryptData(localCatsEncrypted) as Category[]);
        hasLocalData = true;
      }
      if (localProdsEncrypted) {
        setProducts(decryptData(localProdsEncrypted) as Product[]);
        hasLocalData = true;
      }

      // If we found local data, stop the loading spinner immediately
      if (hasLocalData) setLoading(false);
    } catch (e) {
      console.warn("Error loading local cache:", e);
    }

    // --- PHASE 2: Background Version Check & Sync ---
    try {
      const localVersion = localStorage.getItem("VersionCache_CLI");

      // Fetch remote version
      const versionRes = await axios.get(versionCache);
      const remoteVersion = versionRes?.data?.version?.toString();

      // If versions match, we are done. No expensive API calls.
      if (localVersion === remoteVersion && remoteVersion) {
        console.log("✅ Data is up to date (Version match)");
        setLoading(false);
        return;
      }

      console.log("⚠️ Version mismatch or first load. Fetching fresh data...");

      // --- PHASE 3: Fetch Fresh Data (Parallel Execution) ---
      const [catRes, prodRes] = await Promise.all([
        axios.get(getcategoriesApi),
        axios.get(getProductsApi),
      ]);

      // Normalize Categories
      const newCategories: Category[] = Array.isArray(catRes?.data?.categories)
        ? catRes.data.categories
        : Array.isArray(catRes?.data)
        ? catRes.data
        : [];

      // Normalize Products
      const newProducts: Product[] = Array.isArray(prodRes?.data)
        ? prodRes.data
        : [];

      // Update State
      setCategories(newCategories);
      setProducts(newProducts);
      setLoading(false);

      // --- PHASE 4: Update Cache (Non-blocking) ---
      // We don't await this because the UI is already ready
      Promise.all([
        setItem("categories", encryptData(newCategories)),
        setItem("products", encryptData(newProducts)),
        remoteVersion
          ? localStorage.setItem("VersionCache_CLI", remoteVersion)
          : null,
      ]);
    } catch (err) {
      console.error("Sync failed:", err);
      // Ensure loading is false so the app doesn't hang,
      // allowing user to see whatever local data might exist
      setLoading(false);
    }
  };

  useEffect(() => {
    syncData();
  }, []);

  return { products, setProducts, categories, loading };
};

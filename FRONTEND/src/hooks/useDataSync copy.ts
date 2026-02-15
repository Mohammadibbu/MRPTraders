import { useState, useEffect, useRef } from "react";
import { Product, Category } from "../types";
import { encryptData, decryptData } from "../utils/crypto";
import { setItem, getItem } from "../utils/LocalDB";

import categoriesData from "../data/catagories.json";
import productsData from "../data/products.json";

// 🔥 IMPORTANT: Increase this whenever you update JSON
const DATA_VERSION = "1";

const VERSION_KEY = "VersionCache_CLI";

export const useDataSync = () => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const isSyncing = useRef(false);

  const syncData = async () => {
    if (isSyncing.current) return;
    isSyncing.current = true;

    // 1️⃣ Check version in localStorage
    const cachedVersion = localStorage.getItem(VERSION_KEY);

    if (cachedVersion === DATA_VERSION) {
      // If version matches, load from IndexedDB cache
      try {
        const [localCatsEncrypted, localProdsEncrypted] = await Promise.all([
          getItem<string>("categories"),
          getItem<string>("products"),
        ]);

        if (localCatsEncrypted) {
          setCategories(decryptData(localCatsEncrypted) as Category[]);
        }
        if (localProdsEncrypted) {
          setProducts(decryptData(localProdsEncrypted) as Product[]);
        }

        setLoading(false);
        return;
      } catch (e) {
        console.warn("Error loading cache:", e);
      }
    }

    // 2️⃣ If version not found or mismatch, load from local JSON
    try {
      const newCategories: Category[] = Array.isArray(categoriesData)
        ? categoriesData
        : [];

      const newProducts: Product[] = Array.isArray(productsData)
        ? productsData
        : [];

      setCategories(newCategories);
      setProducts(newProducts);
      setLoading(false);

      // Save to IndexedDB
      await Promise.all([
        setItem("categories", encryptData(newCategories)),
        setItem("products", encryptData(newProducts)),
      ]);

      // Save version to localStorage
      localStorage.setItem(VERSION_KEY, DATA_VERSION);
    } catch (err) {
      console.error("Sync failed:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    syncData();
  }, []);

  return { products, setProducts, categories, loading };
};

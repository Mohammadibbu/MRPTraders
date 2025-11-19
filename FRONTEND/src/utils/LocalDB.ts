// dbUtils.ts

interface CachedData<T> {
  key: string;
  value: T;
  expiry?: number; // timestamp in milliseconds
}

const DB_NAME = "LocalCacheDB";
const DB_VERSION = 1;
const STORE_NAME = "cacheStore";

/** Initialize IndexedDB */
function initDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "key" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/** Set an item in the DB with optional TTL */
export async function setItem<T>(
  key: string,
  value: T,
  ttl?: number
): Promise<void> {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);

  const item: CachedData<T> = {
    key,
    value,
    expiry: ttl ? Date.now() + ttl : undefined,
  };

  store.put(item);

  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

/** Get an item from the DB; returns null if not found or expired */
export async function getItem<T>(key: string): Promise<T | null> {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readonly");
  const store = tx.objectStore(STORE_NAME);

  return new Promise((resolve) => {
    const request = store.get(key);

    request.onsuccess = () => {
      const item: CachedData<T> = request.result;
      if (!item) return resolve(null);

      // Check TTL
      if (item.expiry && Date.now() > item.expiry) {
        // Data expired, remove it
        removeItem(key);
        return resolve(null);
      }

      resolve(item.value);
    };

    request.onerror = () => resolve(null);
  });
}

/** Remove an item from the DB */
export async function removeItem(key: string): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await initDB();

      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);

      const request = store.delete(key);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);

      tx.onabort = () => reject(tx.error);
    } catch (err) {
      console.error("IndexedDB removal failed:", err);
      reject(err);
    }
  });
}

/** Clear all items from the DB */
export async function clearDB(): Promise<void> {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);

  store.clear();

  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

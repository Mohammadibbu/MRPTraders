import db from "../FirebaseDB/DBConnection.js";

export const CacheVersionUpdate = async () => {
  try {
    // Generate a unique Hash
    const timestampHash = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substring(2, 8);
    const uniqueHash = `${timestampHash}ibbu${randomPart}`;

    // console.log("Generated New Hash:", uniqueHash);

    // Firestore Admin reference
    const trackerRef = db.collection("metadata").doc("cacheVersion");

    await trackerRef.set(
      {
        versionHash: uniqueHash,
        lastUpdated: new Date(),
      },
      { merge: true }
    );

    // console.log("✅ Version updated successfully in Firestore.");
    return uniqueHash;
  } catch (error) {
    // console.error("❌ Error updating version:", error);
    throw error;
  }
};

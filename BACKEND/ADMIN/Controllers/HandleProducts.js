import db, { admin } from "../../FirebaseDB/DBConnection.js";
import { CacheVersionUpdate } from "../../utils/CacheVersionUpdate.js";
// Function to get all products
const getProducts = async (req, res) => {
  try {
    const snapshot = await db.collection("products")?.get();
    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found." });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products: ", error);
    res
      .status(500)
      .json({ message: "Error fetching products.", error: error.message });
  }
};

// Function to add a single product
const addProduct = async (req, res) => {
  const productData = req.body;

  // Validate required fields
  if (
    !productData.name ||
    !productData.category ||
    !productData.health_benefits
  ) {
    return res.status(400).json({
      message: "Missing required fields: name, category, or health_benefits.",
      success: false,
    });
  }

  try {
    // Check if product already exists
    const existingProductSnapshot = await db
      .collection("products")
      .where("name", "==", productData.name.trim())
      .get();

    if (!existingProductSnapshot.empty) {
      return res.status(400).json({
        message: "Product already exists.",
        success: false,
      });
    }

    // Create product
    const productRef = db.collection("products").doc();
    const newProduct = {
      ...productData,
      id: productRef.id,
      createdAt: new Date(),
    };

    await productRef.set(newProduct);

    // Update category -> add product ID to category list
    const categoryId = productData.category.toLowerCase().trim();
    const categoryRef = db.collection("categories").doc(categoryId);

    await categoryRef.set(
      {
        productIds: admin.firestore.FieldValue.arrayUnion(productRef.id),
      },
      { merge: true }
    );

    //  Call this ONLY after everything succeeded
    await CacheVersionUpdate();

    // Success response
    return res.status(201).json({
      message: "Product added successfully",
      id: productRef.id,
      success: true,
    });
  } catch (error) {
    console.error("Error adding product: ", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
      success: false,
    });
  }
};

const addProductCategory = async (req, res) => {
  try {
    const { name, description, photos } = req.body;

    // Validate name
    if (!name || !name.trim()) {
      return res.status(400).json({
        message: "Category name required",
        success: false,
      });
    }

    // Convert comma-separated category names → array
    const categoriesToAdd = name
      .split(",")
      .map((cat) => cat.trim())
      .filter(Boolean);

    if (categoriesToAdd.length === 0) {
      return res.status(400).json({
        message: "No valid categories provided",
        success: false,
      });
    }

    const addedCategories = [];
    const skipped = [];

    for (const catName of categoriesToAdd) {
      const docId = catName.toLowerCase().trim();
      const categoryRef = db.collection("categories").doc(docId);

      const snapshot = await categoryRef.get();

      if (snapshot.exists) {
        skipped.push(catName);
        continue; // Skip existing categories
      }

      const newCategory = {
        id: docId,
        name: catName,
        description: description || "",
        photos: photos || [],
        productIds: [],
        createdAt: new Date(),
      };

      await categoryRef.set(newCategory);
      addedCategories.push(newCategory);
    }

    // If no category was added
    if (addedCategories.length === 0) {
      return res.status(400).json({
        message: "All categories already exist",
        skipped,
        success: false,
      });
    }

    // Update cache version after successful additions
    await CacheVersionUpdate();

    return res.status(201).json({
      message: "Categories added successfully",
      added: addedCategories,
      skipped,
      success: true,
    });
  } catch (error) {
    console.error("Error adding categories:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
      success: false,
    });
  }
};

/**
 * Get all categories from the 'categories' document
 */
const getAllCategories = async (req, res) => {
  try {
    const categoriesCollectionRef = db.collection("categories");
    const snapshot = await categoriesCollectionRef.get();

    const categories = [];

    snapshot.forEach((doc) => {
      categories.push(doc.data());
    });

    res.status(200).json({ success: true, categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

/**
 * Delete a category by its ID from the 'categories' document
 */
const deleteCategory = async (req, res) => {
  try {
    let { categoryid } = req.params;

    if (!categoryid || !categoryid.trim()) {
      return res.status(400).json({
        message: "Category ID is required",
        success: false,
      });
    }

    categoryid = categoryid.toLowerCase().trim();

    const categoryRef = db.collection("categories").doc(categoryid);
    const docSnapshot = await categoryRef.get();

    if (!docSnapshot.exists) {
      return res.status(404).json({
        message: "Category not found",
        success: false,
      });
    }

    const categoryData = docSnapshot.data();

    // OPTIONAL SAFETY CHECK: prevent deleting categories still being used
    if (categoryData.productIds && categoryData.productIds.length > 0) {
      return res.status(400).json({
        message: "Cannot delete category with assigned products.",
        productCount: categoryData.productIds.length,
        success: false,
      });
    }

    // Delete the category
    await categoryRef.delete();

    // Update Cache Version
    await CacheVersionUpdate();

    return res.status(200).json({
      message: "Category deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error deleting category:", error);

    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
      success: false,
    });
  }
};

const CategoriesCounts = async (req, res) => {
  try {
    const productsRef = db.collection("categories");

    const snapshot = await productsRef.count().get();

    const totalCount = snapshot.data().count;

    return res.status(200).json({ totalCount, success: true });
  } catch (error) {
    console.error("Error counting products:", error);
    return res
      .status(500)
      .json({ error: "Failed to count products", success: false });
  }
};
const addbulkproduct = async (req, res) => {
  const productsData = req.body;

  if (!Array.isArray(productsData) || productsData.length === 0) {
    return res.status(400).json({
      message: "Please provide an array of products.",
      success: false,
    });
  }

  try {
    const batch = db.batch();

    // To store category -> productIds mapping
    const categoryUpdates = {};

    for (const product of productsData) {
      // Skip completely invalid product
      if (!product.name || !product.category) continue;

      const docRef = db.collection("products").doc();

      const productData = {
        ...product,
        id: docRef.id,
        createdAt: new Date(),
      };

      batch.set(docRef, productData);

      // Prepare category updates
      const categoryKey = product.category.toLowerCase().trim();

      if (!categoryUpdates[categoryKey]) {
        categoryUpdates[categoryKey] = [];
      }

      categoryUpdates[categoryKey].push(docRef.id);
    }

    // If nothing valid to add
    if (Object.keys(categoryUpdates).length === 0) {
      return res.status(400).json({
        message: "No valid products to add. Missing name or category.",
        success: false,
      });
    }

    // Commit product batch write
    await batch.commit();

    // Update categories with product IDs
    const categoryPromises = Object.entries(categoryUpdates).map(
      async ([categoryId, productIds]) => {
        const categoryRef = db.collection("categories").doc(categoryId);

        await categoryRef.set(
          {
            id: categoryId,
            name: categoryId, // optional — only if name should match ID
            productIds: admin.firestore.FieldValue.arrayUnion(...productIds),
          },
          { merge: true }
        );
      }
    );

    await Promise.all(categoryPromises);

    // Update the cache version AFTER successful writes
    await CacheVersionUpdate();

    return res.status(201).json({
      message: `${productsData.length} products added successfully.`,
      success: true,
      length: productsData.length,
    });
  } catch (error) {
    console.error("Error adding bulk products:", error);

    return res.status(500).json({
      message: "Error adding bulk products.",
      error: error.message,
      success: false,
    });
  }
};

// Function to delete a product by ID
const DeleteProduct = async (req, res) => {
  try {
    let { productid } = req.params;

    if (!productid || !productid.trim()) {
      return res.status(400).json({
        message: "Product ID is required.",
        success: false,
      });
    }

    productid = productid.trim();

    const productRef = db.collection("products").doc(productid);
    const productDoc = await productRef.get();

    if (!productDoc.exists) {
      return res.status(404).json({
        message: "Product not found.",
        success: false,
      });
    }

    const productData = productDoc.data();
    const categoryName = productData?.category?.toLowerCase().trim();

    // Remove product ID from category if category exists
    if (categoryName) {
      const categoryRef = db.collection("categories").doc(categoryName);
      const categoryDoc = await categoryRef.get();

      if (categoryDoc.exists) {
        await categoryRef.update({
          productIds: admin.firestore.FieldValue.arrayRemove(productid),
        });
      }
    }

    // Delete product
    await productRef.delete();

    // Update cache version AFTER deletion
    await CacheVersionUpdate();

    return res.status(200).json({
      message: "Product deleted successfully.",
      success: true,
    });
  } catch (error) {
    console.error("Error deleting product:", error);

    return res.status(500).json({
      message: "Error deleting product.",
      error: error.message,
      success: false,
    });
  }
};

const ProductCounts = async (req, res) => {
  try {
    const productsRef = db.collection("products");

    const snapshot = await productsRef.count().get();

    const totalCount = snapshot.data().count;

    return res.status(200).json({ totalCount, success: true });
  } catch (error) {
    console.error("Error counting products:", error);
    return res
      .status(500)
      .json({ error: "Failed to count products", success: false });
  }
};

//cacheversion
const CacheVersion = async (req, res) => {
  try {
    const cacheRef = db.collection("metadata").doc("cacheVersion");
    const cacheDoc = await cacheRef.get();

    if (!cacheDoc.exists) {
      return res.status(404).json({
        message: "Cache version not found",
        success: false,
      });
    }

    const data = cacheDoc.data();

    return res.status(200).json({
      success: true,
      version: data?.versionHash,
    });
  } catch (error) {
    console.error("Error fetching cache version:", error);
    return res.status(500).json({
      message: "Failed to fetch cache version",
      error: error.message,
      success: false,
    });
  }
};

export {
  addProduct,
  addbulkproduct,
  getProducts,
  DeleteProduct,
  ProductCounts,
  //categories
  addProductCategory,
  getAllCategories,
  deleteCategory,
  CategoriesCounts,
  //cacheVersion
  CacheVersion,
};

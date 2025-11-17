import db, { admin } from "../../FirebaseDB/DBConnection.js";

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
      .where("name", "==", productData.name)
      .get();

    if (!existingProductSnapshot.empty) {
      return res.status(400).json({
        message: "Product already exists.",
        success: false,
      });
    }

    // Add product
    const productRef = db.collection("products").doc();
    const newProduct = {
      ...productData,
      id: productRef.id,
      createdAt: new Date(),
    };
    await productRef.set(newProduct);

    // Add product ID to the corresponding category
    const categoryRef = db
      .collection("categories")
      .doc(productData?.category?.toLowerCase().trim());

    await categoryRef.set(
      {
        products: admin.firestore.FieldValue.arrayUnion(productRef.id),
      },
      { merge: true } // Merge with existing data
    );

    res.status(201).json({
      message: "Product added successfully",
      id: productRef.id,
      success: true,
    });
  } catch (error) {
    console.error("Error adding product: ", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
      success: false,
    });
  }
};

const addProductCategory = async (req, res) => {
  try {
    const { name, description, photos } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        message: "Category name required",
        success: false,
      });
    }

    // Convert comma-separated names → array
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
        continue; // already exists → skip
      }

      const newCategory = {
        id: docId,
        name: catName,
        photos,
        description: description,
        createdAt: new Date(),
        productIds: [], // always initialize clean structure
      };

      await categoryRef.set(newCategory);
      addedCategories.push(newCategory);
    }

    if (addedCategories.length === 0) {
      return res.status(400).json({
        message: "All categories already exist",
        skipped,
        success: false,
      });
    }

    res.status(201).json({
      message: "Categories added successfully",
      added: addedCategories,
      skipped,
      success: true,
    });
  } catch (error) {
    console.error("Error adding categories:", error);
    res.status(500).json({
      message: "Internal Server Error",
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
    const { categoryid } = req.params;

    if (!categoryid) {
      return res
        .status(400)
        .json({ message: "Category ID is required", success: false });
    }

    const categoryRef = db.collection("categories").doc(categoryid);
    const docSnapshot = await categoryRef.get();

    if (!docSnapshot.exists) {
      return res
        .status(404)
        .json({ message: "Category not found", success: false });
    }

    // Delete the category document
    await categoryRef.delete();

    res
      .status(200)
      .json({ message: "Category deleted successfully", success: true });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
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
    return res
      .status(400)
      .json({ message: "Please provide an array of products." });
  }

  try {
    const batch = db.batch();

    productsData.forEach((product) => {
      const docRef = db.collection("products").doc();

      const productData = {
        ...product,
        id: docRef.id,
        created_at: new Date(),
      };

      batch.set(docRef, productData, { merge: true });
    });

    await batch.commit();

    res.status(201).json({
      message: `${productsData.length} products added/updated successfully.`,
      success: true,
      length: productsData.length,
    });
  } catch (error) {
    console.error("Error adding bulk products: ", error);
    res.status(500).json({
      message: "Error adding bulk products.",
      error: error.message,
    });
  }
};

// Function to delete a product by ID
const DeleteProduct = async (req, res) => {
  const { productid } = req.params;

  if (!productid) {
    return res
      .status(400)
      .json({ message: "Product ID is required.", success: false });
  }

  try {
    const productRef = db.collection("products").doc(productid);
    const productDoc = await productRef.get();

    if (!productDoc.exists) {
      return res
        .status(404)
        .json({ message: "Product not found.", success: false });
    }

    await productRef.delete();

    res
      .status(200)
      .json({ message: "Product deleted successfully.", success: true });
  } catch (error) {
    // console.error("Error deleting product:", error);
    res.status(500).json({
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
};

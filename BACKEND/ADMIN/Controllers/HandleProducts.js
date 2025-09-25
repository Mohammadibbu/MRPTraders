import db from "../../FirebaseDB/DBConnection.js";

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

  // Check if all required fields are provided and not null
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
    // Check if the product already exists based on the name
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

    // Add product with the 'id' field directly in one call
    const productRef = db.collection("products").doc();

    // Set the product data with the custom ID and createdAt field
    await productRef.set({
      ...productData, // Spread the existing product data
      id: productRef.id, // Assign the generated ID from Firestore
      createdAt: new Date(), // Add the createdAt timestamp
    });

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
  console.log(productid);

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
    console.error("Error deleting product:", error);
    res.status(500).json({
      message: "Error deleting product.",
      error: error.message,
      success: false,
    });
  }
};

export { addProduct, addbulkproduct, getProducts, DeleteProduct };

import React, { useState } from "react";
import { showtoast } from "../../utils/Toast";

const AddProduct: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    availability: "In Stock",
    quality: "",
    certifications: "",
    origin: "",
    season: "",
    category: "",
    photo: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      console.log("Submitted Product:", {
        ...formData,
        certifications: formData.certifications.split(",").map((c) => c.trim()),
        photos: [formData.photo],
      });
      setSubmitting(false);
      showtoast(
        "Product added successfully!",
        "Your new product is live and ready to go!",
        "success"
      );
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-8 shadow rounded-md">
      <h1 className="text-2xl font-bold mb-8">Add New Product</h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Product Name */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Product Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="border px-4 py-2 rounded"
          />
        </div>

        {/* Price */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Price (e.g., $5.00)</label>
          <input
            type="text"
            name="price"
            required
            value={formData.price}
            onChange={handleChange}
            className="border px-4 py-2 rounded"
          />
        </div>

        {/* Availability */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Availability</label>
          <select
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            className="border px-4 py-2 rounded"
          >
            <option value="In Stock">In Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>

        {/* Quality */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Quality</label>
          <input
            type="text"
            name="quality"
            value={formData.quality}
            onChange={handleChange}
            placeholder="e.g., Grade A"
            className="border px-4 py-2 rounded"
          />
        </div>

        {/* Certifications */}
        <div className="flex flex-col md:col-span-2">
          <label className="font-medium mb-1">
            Certifications (comma-separated)
          </label>
          <input
            type="text"
            name="certifications"
            value={formData.certifications}
            onChange={handleChange}
            placeholder="e.g., ISO, FSSAI"
            className="border px-4 py-2 rounded"
          />
        </div>

        {/* Origin */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Origin</label>
          <input
            type="text"
            name="origin"
            value={formData.origin}
            onChange={handleChange}
            placeholder="e.g., India"
            className="border px-4 py-2 rounded"
          />
        </div>

        {/* Season */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Season</label>
          <input
            type="text"
            name="season"
            value={formData.season}
            onChange={handleChange}
            placeholder="e.g., Year-round"
            className="border px-4 py-2 rounded"
          />
        </div>

        {/* Category */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="e.g., exports"
            className="border px-4 py-2 rounded"
          />
        </div>

        {/* Photo */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Photo URL</label>
          <input
            type="text"
            name="photo"
            value={formData.photo}
            onChange={handleChange}
            placeholder="https://example.com/photo.jpg"
            className="border px-4 py-2 rounded"
          />
        </div>

        {/* Submit Button (Full Width) */}
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-primary text-white py-3 rounded hover:bg-opacity-90 transition"
          >
            {submitting ? "Adding..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;

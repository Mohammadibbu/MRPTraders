import React, { useState } from "react";
import { showtoast } from "../../utils/Toast";
import { useNavigate } from "react-router-dom";
import axios, { AddProductApi } from "../../utils/AxiosInstance";

const AddProduct: React.FC = () => {
  const initialFormData = {
    name: "",
    alias: "",
    origin: "",
    health_benefits: "",
    category: "",
    photos: "",
    availability: "In Stock",
    quality: "",
    season: "",
    certifications: "",
    description: "",
    applications: "",
    why_choose_us: "",
    contact_info: "",
    price: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check for empty fields
    for (const key in formData) {
      if (!formData[key as keyof typeof formData].trim()) {
        showtoast(
          "Missing Field",
          `Please fill out the "${key}" field.`,
          "error"
        );
        return;
      }
    }

    setSubmitting(true);

    // Format the form data before sending
    const newProduct = {
      ...formData,
      origin: formData.origin.split(",").map((o) => o.trim()),
      health_benefits: formData.health_benefits.split(",").map((h) => h.trim()),
      photos: formData.photos.split(",").map((p) => p.trim()),
      certifications: formData.certifications.split(",").map((c) => c.trim()),
      applications: formData.applications.split(",").map((a) => a.trim()),
      why_choose_us: formData.why_choose_us.split(",").map((w) => w.trim()),
      price: parseFloat(formData.price),
    };

    try {
      // Send request to the API to add a product
      const response = await axios.post(AddProductApi, newProduct);

      if (response?.data?.success) {
        showtoast(
          "Product added successfully!",
          "Your new product is live and ready to go!",
          "success"
        );
        setFormData(initialFormData);
      } else {
        showtoast(
          "Error adding product",
          response?.data?.message || "An error occurred, please try again.",
          "error"
        );
      }
    } catch (e: any) {
      const error =
        e?.response?.message ||
        "An error occurred while adding the product. Please try again.";
      showtoast("Error adding product", error, "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-8 shadow rounded-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Add New Product</h1>
        <button
          onClick={() => navigate("/admin/products/bulkupload")}
          className="text-sm text-blue-600 underline hover:text-blue-800"
        >
          Bulk Upload?
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <Input
          label="Product Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <Input
          label="Alias"
          name="alias"
          value={formData.alias}
          onChange={handleChange}
        />
        <Input
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />
        <Input
          label="Price"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
        <div className="flex flex-col">
          <label className="font-medium mb-1">Availability</label>
          <select
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            className="border px-4 py-2 rounded"
            required
          >
            <option value="In Stock">In Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>
        <Input
          label="Quality"
          name="quality"
          value={formData.quality}
          onChange={handleChange}
        />
        <Input
          label="Season"
          name="season"
          value={formData.season}
          onChange={handleChange}
        />
        <Input
          label="Origin (comma-separated)"
          name="origin"
          value={formData.origin}
          onChange={handleChange}
        />
        <Input
          label="Certifications (comma-separated)"
          name="certifications"
          value={formData.certifications}
          onChange={handleChange}
        />
        <Input
          label="Photo URLs (comma-separated)"
          name="photos"
          value={formData.photos}
          onChange={handleChange}
        />
        <Textarea
          label="Health Benefits (comma-separated)"
          name="health_benefits"
          value={formData.health_benefits}
          onChange={handleChange}
        />
        <Textarea
          label="Applications (comma-separated)"
          name="applications"
          value={formData.applications}
          onChange={handleChange}
        />
        <Textarea
          label="Why Choose Us (comma-separated)"
          name="why_choose_us"
          value={formData.why_choose_us}
          onChange={handleChange}
        />
        <Textarea
          label="Product Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <Input
          label="Contact Info"
          name="contact_info"
          value={formData.contact_info}
          onChange={handleChange}
        />

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

// Reusable Input
const Input = ({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) => (
  <div className="flex flex-col">
    <label className="font-medium mb-1">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="border px-4 py-2 rounded"
      required
    />
  </div>
);

// Reusable Textarea
const Textarea = ({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}) => (
  <div className="flex flex-col md:col-span-2">
    <label className="font-medium mb-1">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={3}
      className="border px-4 py-2 rounded resize-none"
      required
    />
  </div>
);

export default AddProduct;

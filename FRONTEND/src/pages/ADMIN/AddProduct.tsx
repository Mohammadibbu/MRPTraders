import React, { useState } from "react";
import { showtoast } from "../../utils/Toast";
import { useNavigate } from "react-router-dom";
import axios, { AddProductApi } from "../../utils/AxiosInstance";
import imageCompression from "browser-image-compression";

const AddProduct: React.FC = () => {
  const initialFormData = {
    name: "",
    alias: "",
    origin: "",
    health_benefits: "",
    category: "",
    photos: [] as { base64: string; size: number }[],

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
  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files.length === 0) {
      showtoast("Upload Error", "Please select at least one image.", "error");
      return;
    }

    const currentImagesCount = formData.photos.length;

    if (files.length + currentImagesCount > 4) {
      showtoast(
        "Upload Limit Exceeded",
        `You can only upload up to 4 images. You already have ${currentImagesCount}.`,
        "error"
      );
      return;
    }

    const newCompressedImages: { base64: string; size: number }[] = [];

    for (const file of Array.from(files)) {
      try {
        // Check original file size
        if (file.size > 1 * 1024 * 1024) {
          showtoast(
            "File Too Large",
            `File ${file.name} exceeds 1MB. Please choose a smaller image.`,
            "error"
          );
          continue; // Skip this file
        }

        // Compress the image
        const options = {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        };

        const compressedFile = await imageCompression(file, options);

        // Check compressed size
        if (compressedFile.size > 500 * 1024) {
          showtoast(
            "Compression Failed",
            `File ${file.name} couldn't be compressed under 500KB.`,
            "error"
          );
          continue; // Skip this file
        }

        // Convert to base64
        const base64 = await convertToBase64(compressedFile);

        newCompressedImages.push({
          base64,
          size: compressedFile.size,
        });
      } catch (err) {
        // console.error("Image compression error:", err);
        showtoast(
          "Compression Error",
          `An error occurred while compressing ${file.name}.`,
          "error"
        );
      }
    }

    if (newCompressedImages.length === 0) return;

    // Merge new images with existing ones
    setFormData((prev) => ({
      ...prev,
      photos: [...prev.photos, ...newCompressedImages],
    }));
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check for empty fields (excluding photos which is an array)
    for (const key in formData) {
      const value = formData[key as keyof typeof formData];
      if (typeof value === "string" && !value.trim()) {
        showtoast(
          "Missing Field",
          `Please fill out the "${key}" field.`,
          "error"
        );
        return;
      }
    }

    if (formData.photos.length === 0) {
      showtoast(
        "Image Required",
        "Please upload at least one product image.",
        "error"
      );
      return;
    }

    setSubmitting(true);

    const newProduct = {
      ...formData,
      origin: formData.origin.split(",").map((o) => o.trim()),
      health_benefits: formData.health_benefits.split(",").map((h) => h.trim()),
      certifications: formData.certifications.split(",").map((c) => c.trim()),
      applications: formData.applications.split(",").map((a) => a.trim()),
      why_choose_us: formData.why_choose_us.split(",").map((w) => w.trim()),
      price: parseFloat(formData.price),
    };

    try {
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

        {/* Image Upload */}
        <div className="flex flex-col md:col-span-2">
          <label className="font-medium mb-1">
            Upload Product Images (1–4)
          </label>

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="block w-full border px-4 py-2 rounded text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
               file:rounded file:border-0 file:text-sm file:font-semibold
               file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />

          <p className="text-sm text-gray-500 mt-1">
            You can upload up to 4 images (each under{" "}
            <span className="text-red-600 font-medium">1MB</span>).
          </p>

          {formData.photos.length > 0 && (
            <div className="flex gap-4 flex-wrap mt-3">
              {formData.photos.map((img, idx) => {
                const isLarge = img.size > 1024 * 1024; // >1MB
                const sizeKB = (img.size / 1024).toFixed(0);

                return (
                  <div
                    key={idx}
                    className="relative w-24 h-32 flex flex-col items-center justify-between"
                  >
                    <img
                      src={img.base64}
                      alt={`Preview ${idx + 1}`}
                      className={`w-24 h-24 object-cover border rounded ${
                        isLarge ? "border-red-500" : ""
                      }`}
                    />
                    <span
                      className={`text-xs mt-1 ${
                        isLarge ? "text-red-600 font-semibold" : "text-gray-500"
                      }`}
                    >
                      {sizeKB} KB
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded-full hover:bg-red-700"
                      title="Remove Image"
                    >
                      ×
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

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

// Reusable Input Component
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

// Reusable Textarea Component
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

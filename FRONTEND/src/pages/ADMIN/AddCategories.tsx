import React, { useState } from "react";
import { showtoast } from "../../utils/Toast";
import { useNavigate } from "react-router-dom";
import axios, { AddcategoriesApi } from "../../utils/AxiosInstance";
import imageCompression from "browser-image-compression";
import { ArrowLeft } from "lucide-react";

const AddCategory: React.FC = () => {
  const initialFormData = {
    name: "",
    description: "",
    photos: [] as { base64: string; size: number }[],
  };

  const [formData, setFormData] = useState(initialFormData);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        if (file.size > 1 * 1024 * 1024) {
          showtoast(
            "File Too Large",
            `File ${file.name} exceeds 1MB. Please choose a smaller image.`,
            "error"
          );
          continue;
        }

        const options = {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(file, options);

        if (compressedFile.size > 500 * 1024) {
          showtoast(
            "Compression Failed",
            `File ${file.name} couldn't be compressed under 500KB.`,
            "error"
          );
          continue;
        }

        const base64 = await convertToBase64(compressedFile);
        newCompressedImages.push({ base64, size: compressedFile.size });
      } catch {
        showtoast(
          "Compression Error",
          `An error occurred while compressing ${file.name}.`,
          "error"
        );
      }
    }

    if (newCompressedImages.length === 0) return;

    setFormData((prev) => ({
      ...prev,
      photos: [...prev.photos, ...newCompressedImages],
    }));
  };

  const convertToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      showtoast(
        "Missing Field",
        "Please enter at least one category name.",
        "error"
      );
      return;
    }

    if (formData.photos.length === 0) {
      showtoast(
        "Image Required",
        "Please upload at least one category image.",
        "error"
      );
      return;
    }

    setSubmitting(true);

    // Split by commas to allow multiple categories
    const categories = formData.name
      .split(",")
      .map((cat) => cat.trim())
      .filter((cat) => cat.length > 0);

    if (categories.length === 0) {
      showtoast("Invalid Input", "Please enter valid category names.", "error");
      setSubmitting(false);
      return;
    }

    try {
      for (const categoryName of categories) {
        const newCategory = {
          name: categoryName,
          photos: formData.photos,
          description: formData.description,
        };

        const response = await axios.post(AddcategoriesApi, newCategory);

        if (!response?.data?.success) {
          showtoast(
            "Error adding category",
            response?.data?.message ||
              `Failed to add category "${categoryName}"`,
            "error"
          );
        }
      }

      showtoast(
        "Categories Added",
        `${categories.join(", ")} successfully added!`,
        "success"
      );

      setFormData(initialFormData);
    } catch (e: any) {
      showtoast(
        "Error",
        e?.response?.message || "An error occurred while adding categories.",
        "error"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 shadow rounded-md">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/admin/categories")}
            className="flex items-center gap-2 bg-secondarylight p-2 px-4 rounded-md text-primary hover:text-primary/70 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline font-medium">Back</span>
          </button>
        </div>
      </div>

      <div className="my-5 py-3">
        <h1 className="text-xl sm:text-2xl font-bold">Add New Category</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        <Input
          label="Category Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <Input
          label="Category description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        {/* Image Upload */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">
            Upload Category Images (1-2)
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
          {formData.photos.length > 0 && (
            <div className="flex gap-4 flex-wrap mt-3">
              {formData.photos.map((img, idx) => {
                const sizeKB = (img.size / 1024).toFixed(0);
                return (
                  <div
                    key={idx}
                    className="relative w-24 h-32 flex flex-col items-center justify-between"
                  >
                    <img
                      src={img.base64}
                      alt={`Preview ${idx + 1}`}
                      className="w-24 h-24 object-cover border rounded"
                    />
                    <span className="text-xs mt-1 text-gray-500">
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

        <div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-primary text-white py-3 rounded hover:bg-opacity-90 transition"
          >
            {submitting ? "Adding..." : "Add Category"}
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

export default AddCategory;

import React, { useState } from "react";
import { showtoast } from "../../utils/Toast";
import { useNavigate } from "react-router-dom";
import axios, { AddcategoriesApi } from "../../utils/AxiosInstance";
import imageCompression from "browser-image-compression";
import { ArrowLeft, X, Save, ImagePlus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import GradientButton from "../../components/UI/GradientButton";

const AddCategory: React.FC = () => {
  const initialFormData = {
    name: "",
    description: "",
    photos: [] as { base64: string; size: number }[],
  };

  const [formData, setFormData] = useState(initialFormData);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
    if (!files || files.length === 0) return;

    const currentImages = formData.photos.length;
    if (currentImages + files.length > 4) {
      showtoast(
        "Upload Limit Exceeded",
        "You can upload up to 4 images.",
        "error"
      );
      return;
    }

    const newCompressedImages: { base64: string; size: number }[] = [];

    for (const file of Array.from(files)) {
      try {
        if (file.size > 5 * 1024 * 1024) {
          showtoast("File Too Large", `${file.name} exceeds 5MB.`, "error");
          continue;
        }

        const options = {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        };

        const compressedFile = await imageCompression(file, options);
        const base64 = await convertToBase64(compressedFile);
        newCompressedImages.push({ base64, size: compressedFile.size });
      } catch (err) {
        console.error(err);
        showtoast("Error", `Failed to compress ${file.name}`, "error");
      }
    }

    setFormData((prev) => ({
      ...prev,
      photos: [...prev.photos, ...newCompressedImages],
    }));

    e.target.value = "";
  };

  const convertToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });

  // ---------------------------
  // 🔥 UPDATED SUBMIT HANDLER
  // ---------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      showtoast("Missing Field", "Please enter a category name.", "error");
      return;
    }

    if (formData.photos.length === 0) {
      showtoast("Image Required", "Please upload at least one image.", "error");
      return;
    }

    setSubmitting(true);

    try {
      const newCategory = {
        name: formData.name.trim(),
        description: formData.description,
        photos: formData.photos,
      };

      await axios.post(AddcategoriesApi, newCategory);

      showtoast("Success", `Category added successfully!`, "success");

      setFormData(initialFormData);
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message;

      if (errorMessage === "Authorization token is required") {
        showtoast(
          "Session Expired",
          "Your session has expired. Please log in again.",
          "error"
        );
        setTimeout(() => navigate("/admin/login"), 5000);
      } else {
        showtoast("Error", errorMessage || "Failed to add category.", "error");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Add Category
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Create a new product category.
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/categories")}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white border rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl border overflow-hidden"
        >
          <div className="p-6 sm:p-8">
            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Category Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Category Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Exotic Fruits"
                  className="w-full px-4 py-3 rounded-xl border bg-gray-50 focus:bg-white focus:ring-2 transition-all"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description <span className="text-gray-400">(Optional)</span>
                </label>
                <textarea
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Brief description..."
                  className="w-full px-4 py-3 rounded-xl border bg-gray-50 focus:bg-white focus:ring-2 transition-all resize-none"
                />
              </div>

              {/* Image Upload */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-semibold text-gray-700">
                    Category Images <span className="text-red-500">*</span>
                  </label>
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                    {formData.photos.length} / 4
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {/* Upload Button */}
                  {formData.photos.length < 4 && (
                    <label className="relative flex flex-col items-center justify-center h-32 rounded-xl border-2 border-dashed cursor-pointer group">
                      <div className="p-3 bg-gray-100 rounded-full mb-2 group-hover:bg-white transition-colors">
                        <ImagePlus className="w-6 h-6 text-gray-400 group-hover:text-primary" />
                      </div>
                      <span className="text-xs font-medium text-gray-500 group-hover:text-primary">
                        Add Image
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}

                  {/* Image Previews */}
                  <AnimatePresence>
                    {formData.photos.map((img, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="relative h-32 rounded-xl overflow-hidden border shadow-sm"
                      >
                        <img
                          src={img.base64}
                          alt="preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full text-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <span className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/50 text-[10px] text-white rounded">
                          {(img.size / 1024).toFixed(0)}KB
                        </span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-4 border-t flex justify-end">
                <GradientButton
                  type="submit"
                  size="lg"
                  icon={Save}
                  loading={submitting}
                  disabled={submitting}
                >
                  {submitting ? "Saving..." : "Save Category"}
                </GradientButton>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AddCategory;

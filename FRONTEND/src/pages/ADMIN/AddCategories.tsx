import React, { useState } from "react";
import { showtoast } from "../../utils/Toast";
import { useNavigate } from "react-router-dom";
import axios, { AddcategoriesApi } from "../../utils/AxiosInstance";
import imageCompression from "browser-image-compression";
import { ArrowLeft, Upload, X, Save, ImagePlus } from "lucide-react";
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

    const currentImagesCount = formData.photos.length;
    if (files.length + currentImagesCount > 4) {
      showtoast(
        "Upload Limit Exceeded",
        `You can only upload up to 4 images.`,
        "error"
      );
      return;
    }

    const newCompressedImages: { base64: string; size: number }[] = [];

    for (const file of Array.from(files)) {
      try {
        // Basic size check before compression (optional, depends on your needs)
        if (file.size > 5 * 1024 * 1024) {
          showtoast(
            "File Too Large",
            `${file.name} is too large (max 5MB)`,
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
        const base64 = await convertToBase64(compressedFile);
        newCompressedImages.push({ base64, size: compressedFile.size });
      } catch (err) {
        console.error(err);
        showtoast(
          "Compression Error",
          `Failed to process ${file.name}`,
          "error"
        );
      }
    }

    if (newCompressedImages.length > 0) {
      setFormData((prev) => ({
        ...prev,
        photos: [...prev.photos, ...newCompressedImages],
      }));
    }

    // Reset the input so the same file can be selected again if needed
    e.target.value = "";
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
      showtoast("Missing Field", "Please enter category name(s).", "error");
      return;
    }

    if (formData.photos.length === 0) {
      showtoast("Image Required", "Please upload at least one image.", "error");
      return;
    }

    setSubmitting(true);

    // Split by commas to allow multiple categories
    const categories = formData.name
      .split(",")
      .map((cat) => cat.trim())
      .filter((cat) => cat.length > 0);

    try {
      // Process additions sequentially or parallel. Parallel is faster.
      const promises = categories.map((categoryName) => {
        const newCategory = {
          name: categoryName,
          photos: formData.photos,
          description: formData.description,
        };
        return axios.post(AddcategoriesApi, newCategory);
      });

      await Promise.all(promises);

      showtoast(
        "Success",
        `${categories.length} categor${
          categories.length > 1 ? "ies" : "y"
        } added successfully!`,
        "success"
      );

      setFormData(initialFormData);
      // navigate("/admin/categories"); // Optional: redirect after success
    } catch (e: any) {
      showtoast(
        "Error",
        e?.response?.data?.message || "Failed to add categories.",
        "error"
      );
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
              Create new product categories for your catalog.
            </p>
          </div>
          <button
            onClick={() => navigate("/admin/categories")}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden"
        >
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name Input */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-700">
                  Category Name(s) <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  Separate multiple categories with a comma (e.g., "Fruits,
                  Vegetables")
                </p>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Exotic Fruits"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                />
              </div>

              {/* Description Input */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description{" "}
                  <span className="text-gray-400 font-normal">(Optional)</span>
                </label>
                <textarea
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Brief description of this category..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none"
                />
              </div>

              {/* Image Upload Section */}
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
                    <label className="relative flex flex-col items-center justify-center h-32 rounded-xl border-2 border-dashed border-gray-300 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer group">
                      <div className="p-3 bg-gray-100 rounded-full mb-2 group-hover:bg-white group-hover:text-primary transition-colors">
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
                        className="relative h-32 group rounded-xl overflow-hidden border border-gray-200 shadow-sm"
                      >
                        <img
                          src={img.base64}
                          alt={`Preview ${idx}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx)}
                            className="p-1.5 bg-white rounded-full text-red-500 hover:bg-red-50 transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/60 text-[10px] text-white rounded backdrop-blur-sm">
                          {(img.size / 1024).toFixed(0)}KB
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-gray-100 flex justify-end">
                <GradientButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  icon={Save}
                  loading={submitting}
                  disabled={submitting}
                  className="w-full sm:w-auto px-8"
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

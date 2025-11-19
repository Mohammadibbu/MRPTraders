import React, { useState, useEffect } from "react";
import { showtoast } from "../../utils/Toast";
import { useNavigate } from "react-router-dom";
import axios, {
  AddProductApi,
  getcategoriesApi,
  categoriescount,
} from "../../utils/AxiosInstance";
import imageCompression from "browser-image-compression";
import {
  ArrowLeft,
  Upload,
  X,
  Save,
  ImagePlus,
  Plus,
  AlertCircle,
} from "lucide-react";
import { encryptData, decryptData } from "../../utils/crypto";
import { Option } from "../../components/UI/SearchableSelect";
import SkeletonLoader from "../../components/UI/SkeletonLoader";
import GradientButton from "../../components/UI/GradientButton";
import { motion, AnimatePresence } from "framer-motion";

// --- Types ---
interface ProductForm {
  name: string;
  origin: string[]; // Changed to array
  health_benefits: string[]; // Changed to array
  category: string;
  photos: { base64: string; size: number }[];
  quality: string;
  certifications: string[]; // Changed to array
  description: string;
  applications: string[]; // Changed to array
  why_choose_us: string[]; // Changed to array
  contact_info: string;
  shelf_life: string;
  storage_conditions: string;
  best_shipment_modes: string;
}

const AddProduct: React.FC = () => {
  // --- State Management ---
  const initialFormData: ProductForm = {
    name: "",
    origin: [],
    health_benefits: [],
    category: "",
    photos: [],
    quality: "",
    certifications: [],
    description: "",
    applications: [],
    why_choose_us: [],
    contact_info: "",
    shelf_life: "",
    storage_conditions: "",
    best_shipment_modes: "",
  };

  const [formData, setFormData] = useState<ProductForm>(initialFormData);
  const [submitting, setSubmitting] = useState(false);
  const [categoryOption, setCategoryOption] = useState<Option[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const navigate = useNavigate();

  // --- Fetch Categories ---
  const fetchProducts = async () => {
    setLoadingCategories(true);
    try {
      const countRes = await axios.get(categoriescount);
      const serverCount = countRes.data?.totalCount ?? 0;

      const encryptedCache = sessionStorage.getItem("catoptions(admin)");
      const cachedCount = Number(
        sessionStorage.getItem("catoptionscount(admin)")
      );

      if (encryptedCache && cachedCount === serverCount) {
        const cachedData = decryptData(encryptedCache);
        if (cachedData) {
          setCategoryOption(cachedData);
          return;
        }
      }

      const res = await axios.get(getcategoriesApi);
      const options: Option[] = res?.data?.categories?.map((item: any) => ({
        label: item.name,
        value: item.name,
      }));
      setCategoryOption(options);
      sessionStorage.setItem("catoptions(admin)", encryptData(options));
      sessionStorage.setItem("catoptionscount(admin)", serverCount.toString());
    } catch (err) {
      console.log(err);
      showtoast("Error", "Failed to load categories.", "error");
    } finally {
      setLoadingCategories(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // --- Handlers ---

  // Handle standard text inputs
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Array/Tag inputs (Origin, Applications, etc.)
  const handleTagsChange = (name: keyof ProductForm, newTags: string[]) => {
    setFormData((prev) => ({ ...prev, [name]: newTags }));
  };

  // Handle Image Remove
  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };

  // Handle Image Upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const current = formData.photos.length;
    if (files.length + current > 4) {
      showtoast(
        "Upload Limit Exceeded",
        `Max 4 images allowed. You already have ${current}.`,
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
        showtoast("Error", `Error compressing ${file.name}`, "error");
      }
    }

    if (newCompressedImages.length > 0) {
      setFormData((prev) => ({
        ...prev,
        photos: [...prev.photos, ...newCompressedImages],
      }));
    }
    e.target.value = "";
  };

  const convertToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });

  // --- Submit Logic ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Basic Validations
    if (!formData.name || !formData.category) {
      showtoast("Missing Fields", "Please fill in required fields.", "error");
      return;
    }
    if (formData.photos.length === 0) {
      showtoast("Image Required", "Please upload at least one image.", "error");
      return;
    }

    // 2. Specific Array Validations (Min 3 items)
    const minItems = 3;
    if (formData.applications.length < minItems) {
      showtoast("Validation", `Please add at least 3 Applications.`, "error");
      return;
    }
    if (formData.health_benefits.length < minItems) {
      showtoast(
        "Validation",
        `Please add at least 3 Health Benefits.`,
        "error"
      );
      return;
    }
    if (formData.why_choose_us.length < minItems) {
      showtoast(
        "Validation",
        `Please add at least 3 'Why Choose Us' points.`,
        "error"
      );
      return;
    }

    setSubmitting(true);

    // 3. Prepare Payload (Arrays are already arrays, no need to split)
    const newProduct = {
      ...formData,
      // Filter out any empty strings just in case
      origin: formData.origin.filter(Boolean),
      health_benefits: formData.health_benefits.filter(Boolean),
      certifications: formData.certifications.filter(Boolean),
      applications: formData.applications.filter(Boolean),
      why_choose_us: formData.why_choose_us.filter(Boolean),
    };

    try {
      const response = await axios.post(AddProductApi, newProduct);

      if (response?.data?.success) {
        showtoast("Success!", "Product added successfully.", "success");
        setFormData(initialFormData);
        // navigate("/admin/products");
      } else {
        showtoast(
          "Error",
          response?.data?.message ?? "Something went wrong.",
          "error"
        );
      }
    } catch (err: any) {
      showtoast(
        "Error",
        err?.response?.data?.message || "Try again later.",
        "error"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Add Product
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Add a new item to your product catalog.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/admin/products")}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button
              onClick={() => navigate("/admin/products/bulkupload")}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-100 rounded-xl hover:bg-blue-100 transition-colors shadow-sm"
            >
              <Upload className="w-4 h-4" /> Bulk Upload
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden"
        >
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* --- Basic Information --- */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Product Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Premium Basmati Rice"
                    required
                  />

                  <div className="flex flex-col w-full">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Category <span className="text-red-500">*</span>
                    </label>
                    {loadingCategories ? (
                      <SkeletonLoader
                        type="text"
                        count={1}
                        className="h-11 w-full rounded-xl"
                      />
                    ) : (
                      <div className="relative">
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none appearance-none"
                          required
                        >
                          <option value="">Select Category</option>
                          {categoryOption.map((o) => (
                            <option key={o.value} value={o.value}>
                              {o.label}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg
                            className="w-4 h-4 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            ></path>
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <CharCountTextarea
                      label="Description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Detailed description of the product..."
                      rows={4}
                      maxLength={1000}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* --- Specifications --- */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">
                  Specifications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Quality Grade"
                    name="quality"
                    value={formData.quality}
                    onChange={handleChange}
                    placeholder="e.g. Grade A, Premium"
                  />
                  <Input
                    label="Shelf Life"
                    name="shelf_life"
                    value={formData.shelf_life}
                    onChange={handleChange}
                    placeholder="e.g. 12 Months"
                  />
                  <Input
                    label="Storage Conditions"
                    name="storage_conditions"
                    value={formData.storage_conditions}
                    onChange={handleChange}
                    placeholder="e.g. Cool, dry place"
                  />
                  <Input
                    label="Best Shipment Mode"
                    name="best_shipment_modes"
                    value={formData.best_shipment_modes}
                    onChange={handleChange}
                    placeholder="e.g. Air Freight, Reefer Container"
                  />
                </div>
              </div>

              {/* --- Detailed Attributes (Smart Tag Inputs) --- */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">
                  Detailed Attributes
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Origin (No Min Limit, just tags) */}
                  <TagInput
                    label="Origin"
                    placeholder="Type and press enter (e.g. India)"
                    tags={formData.origin}
                    setTags={(tags) => handleTagsChange("origin", tags)}
                  />

                  {/* Certifications */}
                  <TagInput
                    label="Certifications"
                    placeholder="e.g. ISO 22000, FSSAI"
                    tags={formData.certifications}
                    setTags={(tags) => handleTagsChange("certifications", tags)}
                  />

                  {/* Health Benefits (Min 3, Max 7) */}
                  <div className="md:col-span-2">
                    <TagInput
                      label="Health Benefits"
                      placeholder="Add benefit (e.g. Rich in Fiber)"
                      tags={formData.health_benefits}
                      setTags={(tags) =>
                        handleTagsChange("health_benefits", tags)
                      }
                      minItems={3}
                      maxItems={7}
                      helperText="Min 3, Max 7 items allowed."
                    />
                  </div>

                  {/* Applications (Min 3, Max 7) */}
                  <div className="md:col-span-2">
                    <TagInput
                      label="Applications / Uses"
                      placeholder="Add application (e.g. Cooking)"
                      tags={formData.applications}
                      setTags={(tags) => handleTagsChange("applications", tags)}
                      minItems={3}
                      maxItems={7}
                      helperText="Min 3, Max 7 items allowed."
                    />
                  </div>

                  {/* USP (Min 3, Max 7) */}
                  <div className="md:col-span-2">
                    <TagInput
                      label="Why Choose Us (USP)"
                      placeholder="Add point (e.g. Sustainably Sourced)"
                      tags={formData.why_choose_us}
                      setTags={(tags) =>
                        handleTagsChange("why_choose_us", tags)
                      }
                      minItems={3}
                      maxItems={7}
                      helperText="Min 3, Max 7 items allowed."
                    />
                  </div>
                </div>
              </div>

              {/* --- Contact Info --- */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">
                  Contact & Support
                </h3>
                <Input
                  label="Contact Info"
                  name="contact_info"
                  value={formData.contact_info}
                  onChange={handleChange}
                  placeholder="e.g. sales@mrpglobal.com"
                />
              </div>

              {/* --- Image Upload --- */}
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Product Images
                  </h3>
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                    {formData.photos.length} / 4
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {/* Upload Button */}
                  {formData.photos.length < 4 && (
                    <label className="relative flex flex-col items-center justify-center h-32 rounded-xl border-2 border-dashed border-gray-300 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer group bg-gray-50">
                      <div className="p-3 bg-white rounded-full mb-2 shadow-sm group-hover:shadow-md transition-all">
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
                            className="p-1.5 bg-white rounded-full text-red-500 hover:bg-red-50 transition-colors shadow-sm"
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
              <div className="pt-6 border-t border-gray-100 flex justify-end">
                <GradientButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  icon={Save}
                  loading={submitting}
                  disabled={submitting}
                  className="w-full sm:w-auto px-8"
                >
                  {submitting ? "Saving Product..." : "Save Product"}
                </GradientButton>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

/* --- Reusable Components --- */

// 1. Basic Input
const Input = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
}: any) => (
  <div className="flex flex-col w-full">
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none placeholder:text-gray-400"
      required={required}
    />
  </div>
);

// 2. Textarea with Char Limit
const CharCountTextarea = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows = 3,
  required = false,
  maxLength,
}: any) => (
  <div className="flex flex-col w-full">
    <div className="flex justify-between items-center mb-2">
      <label className="block text-sm font-semibold text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {maxLength && (
        <span
          className={`text-xs font-medium ${
            value.length >= maxLength ? "text-red-500" : "text-gray-400"
          }`}
        >
          {value.length} / {maxLength}
        </span>
      )}
    </div>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      maxLength={maxLength}
      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none placeholder:text-gray-400"
      required={required}
    />
  </div>
);

// 3. Tag Input (The Mini Button Add System)
interface TagInputProps {
  label: string;
  placeholder: string;
  tags: string[];
  setTags: (tags: string[]) => void;
  minItems?: number;
  maxItems?: number;
  helperText?: string;
}

const TagInput: React.FC<TagInputProps> = ({
  label,
  placeholder,
  tags,
  setTags,
  minItems,
  maxItems,
  helperText,
}) => {
  const [input, setInput] = useState("");

  const handleAddTag = () => {
    if (!input.trim()) return;
    if (maxItems && tags.length >= maxItems) {
      showtoast("Limit Reached", `Maximum ${maxItems} items allowed.`, "error");
      return;
    }
    setTags([...tags, input.trim()]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const isError = minItems && tags.length > 0 && tags.length < minItems;
  const isMaxReached = maxItems ? tags.length >= maxItems : false;

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-center mb-2">
        <label className="block text-sm font-semibold text-gray-700">
          {label}
        </label>
        {maxItems && (
          <span
            className={`text-xs ${
              isMaxReached ? "text-red-500 font-bold" : "text-gray-400"
            }`}
          >
            {tags.length} / {maxItems}
          </span>
        )}
      </div>

      <div className="relative flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isMaxReached ? "Limit reached" : placeholder}
          disabled={isMaxReached}
          className="w-full pl-4 pr-12 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none placeholder:text-gray-400 disabled:bg-gray-50 disabled:text-gray-400"
        />
        <button
          type="button"
          onClick={handleAddTag}
          disabled={!input.trim() || isMaxReached}
          className="absolute right-2 p-1.5 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Validation Message */}
      {helperText && (
        <div className="flex items-center gap-1 mt-1.5">
          {isError && <AlertCircle className="w-3 h-3 text-amber-500" />}
          <p
            className={`text-xs ${
              isError ? "text-amber-600 font-medium" : "text-gray-400"
            }`}
          >
            {helperText}
          </p>
        </div>
      )}

      {/* Tags Display */}
      <div className="flex flex-wrap gap-2 mt-3">
        <AnimatePresence>
          {tags.map((tag, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 border border-gray-200"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="p-0.5 hover:bg-gray-200 rounded-full transition-colors text-gray-400 hover:text-red-500"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AddProduct;

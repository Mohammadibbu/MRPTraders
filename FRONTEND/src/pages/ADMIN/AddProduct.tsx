import React, { useState, useEffect } from "react";
import { showtoast } from "../../utils/Toast";
import { useNavigate } from "react-router-dom";
import axios, {
  AddProductApi,
  getcategoriesApi,
  categoriescount,
} from "../../utils/AxiosInstance";
import imageCompression from "browser-image-compression";
import { ArrowLeft } from "lucide-react";
import { encryptData, decryptData } from "../../utils/crypto";
import { Option } from "../../components/UI/SearchableSelect";
import SkeletonLoader from "../../components/UI/SkeletonLoader";

const AddProduct: React.FC = () => {
  const initialFormData = {
    name: "",
    origin: "",
    health_benefits: "",
    category: "",
    photos: [] as { base64: string; size: number }[],
    quality: "",
    certifications: "",
    description: "",
    applications: "",
    why_choose_us: "",
    contact_info: "",
    shelf_life: "",
    storage_conditions: "",
    best_shipment_modes: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  const [categoryOption, setCategoryOption] = useState<Option[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  // Fetch categories with loading state
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
        if (file.size > 1 * 1024 * 1024) {
          showtoast("File Too Large", `${file.name} exceeds 1MB.`, "error");
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
            `${file.name} couldn't be compressed under 500KB.`,
            "error"
          );
          continue;
        }

        const base64 = await convertToBase64(compressedFile);
        newCompressedImages.push({ base64, size: compressedFile.size });
      } catch (err) {
        showtoast(
          "Compression Error",
          `Error compressing ${file.name}`,
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
      reader.onerror = reject;
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    for (const key in formData) {
      const value = formData[key as keyof typeof formData];
      if (typeof value === "string" && !value.trim()) {
        showtoast("Missing Field", `Please fill "${key}".`, "error");
        return;
      }
    }

    if (formData.photos.length === 0) {
      showtoast("Image Required", "Please upload at least one image.", "error");
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
    };

    try {
      const response = await axios.post(AddProductApi, newProduct);

      if (response?.data?.success) {
        showtoast("Success!", "Product added successfully.", "success");
        setFormData(initialFormData);
      } else {
        showtoast(
          "Error",
          response?.data?.message ?? "Something went wrong.",
          "error"
        );
      }
    } catch (err: any) {
      showtoast(
        "Error adding product",
        err?.response?.message || "Try again later.",
        "error"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl w-full mx-auto bg-white p-6 sm:p-8 shadow rounded-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <button
          onClick={() => navigate("/admin/products")}
          className="flex items-center gap-2 bg-secondarylight px-4 py-2 rounded-md text-primary hover:text-primary/70"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </button>

        <button
          onClick={() => navigate("/admin/products/bulkupload")}
          className="text-sm text-blue-600 underline hover:text-blue-800"
        >
          Bulk Upload?
        </button>
      </div>

      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Add New Product</h1>

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
        <div className="flex flex-col w-full">
          <label className="font-medium mb-1">Category</label>

          {loadingCategories ? (
            <SkeletonLoader type="text" count={1} />
          ) : categoryOption.length > 0 ? (
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border px-4 py-2 rounded w-full"
              required
            >
              <option value="">Select Category</option>
              {categoryOption.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          ) : (
            <Input
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
          )}
        </div>

        <Textarea
          label="Product Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <Input
          label="Quality"
          name="quality"
          value={formData.quality}
          onChange={handleChange}
        />
        <Input
          label="Origin (comma-separated)"
          name="origin"
          value={formData.origin}
          onChange={handleChange}
        />
        <Input
          label="Shelf Life"
          name="shelf_life"
          value={formData.shelf_life}
          onChange={handleChange}
        />
        <Input
          label="Storage Conditions"
          name="storage_conditions"
          value={formData.storage_conditions}
          onChange={handleChange}
        />
        <Input
          label="Best Shipment Modes (comma-separated)"
          name="best_shipment_modes"
          value={formData.best_shipment_modes}
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
            className="block w-full border px-4 py-2 rounded text-sm file:bg-blue-50 file:text-blue-700 file:px-4 file:py-2 file:rounded file:border-0 hover:file:bg-blue-100"
          />

          <p className="text-sm text-gray-500 mt-1">
            Max 4 images — each under{" "}
            <span className="text-red-600 font-medium">1MB</span>
          </p>

          {formData.photos.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
              {formData.photos.map((img, idx) => {
                const sizeKB = (img.size / 1024).toFixed(0);
                return (
                  <div
                    key={idx}
                    className="relative flex flex-col items-center"
                  >
                    <img
                      src={img.base64}
                      className="w-28 h-28 object-cover border rounded"
                    />
                    <span className="text-xs mt-1 text-gray-600">
                      {sizeKB} KB
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded-full"
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
            className="w-full bg-primary text-white py-3 rounded hover:bg-opacity-90"
          >
            {submitting ? "Adding..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

/* Reusable Components */

const Input = ({ label, name, value, onChange }: any) => (
  <div className="flex flex-col">
    {label && <label className="font-medium mb-1">{label}</label>}
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="border px-4 py-2 rounded w-full"
      required
    />
  </div>
);

const Textarea = ({ label, name, value, onChange }: any) => (
  <div className="flex flex-col md:col-span-2">
    <label className="font-medium mb-1">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={3}
      className="border px-4 py-2 rounded resize-none w-full"
      required
    />
  </div>
);

export default AddProduct;

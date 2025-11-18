import React, { useRef, useState } from "react";
import Papa from "papaparse";
import { showtoast } from "../../utils/Toast";
import DialogComponent from "../../components/UI/DialogModel";
import { Book, Upload, ImagePlus, X, Send } from "lucide-react";
import axios, { AddBulkProductApi } from "../../utils/AxiosInstance";
import { motion, AnimatePresence } from "framer-motion";
import GradientButton from "../../components/UI/GradientButton";
import { div } from "framer-motion/client";

const MAX_SIZE_MB = 2;

type Photo = { base64: string; size: number };

type Product = {
  name: string; // Made required for payload
  category: string; // Made required for payload
  origin?: string[] | string;
  photos?: Photo[];
  [key: string]: any;
};

const BulkUploadPage: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const fileImageInputRef = useRef<HTMLInputElement | null>(null);
  const [instructionOpen, setInstructionOpen] = useState(true);
  const [parsedProducts, setParsedProducts] = useState<Product[] | null>(null);
  const [adding, setAdding] = useState(false);
  const [productIndexToUpload, setProductIndexToUpload] = useState<
    number | null
  >(null);

  // Track which product origins are expanded for View More toggle
  const [expandedOrigins, setExpandedOrigins] = useState<Set<number>>(
    new Set()
  );

  const toggleOriginExpansion = (index: number) => {
    setExpandedOrigins((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > MAX_SIZE_MB) {
      showtoast(
        "File too large",
        `Max allowed size is ${MAX_SIZE_MB}MB.`,
        "error"
      );
      return;
    }

    const fileName = file.name.toLowerCase();
    const isJson = fileName.endsWith(".json");
    const isCsv = fileName.endsWith(".csv");

    if (!isJson && !isCsv) {
      showtoast(
        "Invalid file type",
        "Only .json and .csv files are allowed.",
        "error"
      );
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      try {
        let parsed: any[] = [];

        if (isJson) {
          const json = JSON.parse(reader.result as string);
          if (!Array.isArray(json)) {
            throw new Error("JSON must be an array of product objects.");
          }
          parsed = json;
        } else if (isCsv) {
          const result = Papa.parse(reader.result as string, {
            header: true,
            skipEmptyLines: true,
          });
          if (result.errors.length > 0) {
            throw new Error("Failed to parse CSV.");
          }
          parsed = result.data as any[];
        }

        if (parsed.length === 0) {
          throw new Error("Uploaded file contains no products.");
        }

        // Basic mandatory field check
        const mandatoryFields = ["name", "category"];
        for (const p of parsed) {
          for (const field of mandatoryFields) {
            if (!p[field] || String(p[field]).trim() === "") {
              throw new Error(
                `Mandatory field '${field}' is missing or empty in some products.`
              );
            }
          }
        }

        const productsWithPhotos = parsed.map((p) => ({
          ...p,
          photos: [], // Ensure photos array exists
        })) as Product[];

        showtoast(
          "Upload Success",
          `Parsed ${productsWithPhotos.length} product(s) successfully. Please review and upload images.`,
          "success"
        );

        setParsedProducts(productsWithPhotos);
        setExpandedOrigins(new Set()); // Reset expansion
      } catch (err: any) {
        showtoast(
          "Upload Failed",
          err.message || "Invalid file format",
          "error"
        );
        setParsedProducts(null);
      }
    };

    reader.readAsText(file);
    e.target.value = ""; // reset input
  };

  // Convert file to base64 helper
  const convertToBase64 = (file: File): Promise<Photo> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve({ base64: reader.result, size: file.size });
        } else {
          reject("Failed to convert file to base64");
        }
      };
      reader.onerror = (error) => reject(error);
    });

  const handleProductImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    const productIndex = productIndexToUpload;
    setProductIndexToUpload(null);

    if (
      !files ||
      files.length === 0 ||
      parsedProducts === null ||
      productIndex === null
    )
      return;

    const currentPhotos = parsedProducts[productIndex].photos || [];
    if (currentPhotos.length + files.length > 4) {
      showtoast(
        "Upload Error",
        "You can upload up to 4 images per product.",
        "error"
      );
      return;
    }

    try {
      const newPhotos: Photo[] = [];
      for (const file of Array.from(files)) {
        // Image size validation (Max 1MB per image recommended for efficiency)
        if (file.size > 1 * 1024 * 1024) {
          showtoast(
            "Image Too Large",
            `${file.name} exceeds 1MB. Please resize.`,
            "error"
          );
          continue;
        }

        const photo = await convertToBase64(file);
        newPhotos.push(photo);
      }

      setParsedProducts((prev) => {
        if (!prev) return prev;
        const updated = [...prev];
        updated[productIndex] = {
          ...updated[productIndex],
          photos: [...(updated[productIndex].photos || []), ...newPhotos],
        };
        return updated;
      });
    } catch (err) {
      showtoast("Upload Error", "Failed to upload images.", "error");
    }

    e.target.value = ""; // reset input
  };

  const handleRemoveImage = (productIndex: number, photoIndex: number) => {
    setParsedProducts((prev) => {
      if (!prev) return prev;
      const updated = [...prev];
      const productPhotos = [...(updated[productIndex].photos || [])];
      productPhotos.splice(photoIndex, 1);
      updated[productIndex] = {
        ...updated[productIndex],
        photos: productPhotos,
      };
      return updated;
    });
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const openImagePicker = (index: number) => {
    setProductIndexToUpload(index);
    fileImageInputRef.current?.click();
  };

  const handleAddProducts = async () => {
    if (!parsedProducts || parsedProducts.length === 0) return;

    // Final image validation
    for (const p of parsedProducts) {
      if (!p.photos || p.photos.length < 1) {
        showtoast(
          "Validation Error",
          `Please upload at least 1 image for product: ${p.name}.`,
          "error"
        );
        return;
      }
    }

    setAdding(true);

    try {
      // Clean up the data structure and separate comma-separated fields
      const payload = parsedProducts.map((p) => {
        const productData = { ...p };

        // Convert string fields to array based on the product interface structure
        const arrayFields = [
          "origin",
          "health_benefits",
          "certifications",
          "applications",
          "why_choose_us",
        ];

        for (const field of arrayFields) {
          if (typeof productData[field] === "string" && productData[field]) {
            productData[field] = (productData[field] as string)
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean);
          } else if (productData[field] === undefined) {
            productData[field] = [];
          }
        }

        return productData;
      });

      await axios.post(AddBulkProductApi, payload);

      showtoast(
        "Products Added",
        `${parsedProducts.length} products added successfully.`,
        "success"
      );

      setParsedProducts(null);
      setExpandedOrigins(new Set());
    } catch (e) {
      showtoast(
        "Bulk upload Failed",
        "There was an issue while uploading the data to server. Ensure all categories exist.",
        "error"
      );
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-6">
          Bulk Upload Products
        </h1>
        <p className="mb-6 text-gray-600">
          Simplify your catalog management by uploading multiple products using
          a standardized **JSON** or **CSV** file.
        </p>

        {/* --- Upload Controls --- */}
        <div className="bg-white p-6 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
          <div className="flex flex-col text-gray-700">
            <span className="font-semibold text-sm">
              Accepted Formats: .json / .csv
            </span>
            <span className="text-xs text-gray-500">
              Max file size: {MAX_SIZE_MB}MB
            </span>
          </div>

          <div className="flex gap-4">
            <GradientButton
              onClick={() => setInstructionOpen(true)}
              variant="secondary"
              size="md"
              icon={Book}
            >
              Instructions
            </GradientButton>

            <GradientButton
              onClick={openFilePicker}
              variant="primary"
              size="md"
              icon={Upload}
            >
              Select File
            </GradientButton>
          </div>

          <input
            type="file"
            accept=".json,.csv"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* Hidden Input for Image Selection */}
        <input
          type="file"
          accept="image/*"
          multiple
          ref={fileImageInputRef}
          onChange={handleProductImageUpload}
          className="hidden"
        />

        {/* --- Product Preview & Image Upload --- */}
        {parsedProducts && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-2xl shadow-xl shadow-primary/10 border border-gray-100"
          >
            <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
              <h2 className="text-xl font-bold text-gray-900">
                Preview & Image Upload ({parsedProducts.length} Products)
              </h2>
              <GradientButton
                onClick={handleAddProducts}
                loading={adding}
                disabled={adding}
                variant="primary"
                size="sm"
                icon={Send}
                className="shadow-primary/30"
              >
                {adding ? "Adding Products..." : "Add All Products"}
              </GradientButton>
            </div>

            <div className="overflow-x-auto max-h-[70vh] border border-gray-200 rounded-xl shadow-inner bg-white">
              <table className="min-w-full text-left text-sm text-gray-700 divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky z-10 top-0 shadow-sm text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3 font-bold">Images (Max 4)</th>
                    <th className="px-4 py-3 font-bold">Name</th>
                    <th className="px-4 py-3 font-bold">Category</th>
                    <th className="px-4 py-3 font-bold max-w-xs">Origin</th>
                    <th className="px-4 py-3 font-bold">Availability</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {parsedProducts.map((product, idx) => {
                    const originsArray = Array.isArray(product.origin)
                      ? product.origin
                      : product.origin
                      ? String(product.origin)
                          .split(",")
                          .map((o) => o.trim())
                          .filter(Boolean)
                      : [];

                    const isExpanded = expandedOrigins.has(idx);

                    // Highlight row if missing images
                    const needsImages = (product.photos?.length || 0) < 1;

                    return (
                      <tr
                        key={idx}
                        className={`${
                          needsImages
                            ? "bg-red-50/50 hover:bg-red-50"
                            : "bg-white hover:bg-gray-50"
                        } transition-colors duration-150`}
                      >
                        {/* --- Image Upload Cell --- */}
                        <td className="px-4 py-3 whitespace-nowrap min-w-[280px]">
                          <div className="flex items-center gap-3">
                            <AnimatePresence>
                              <div className="flex gap-1.5 flex-wrap w-fit">
                                {(product.photos || []).map(
                                  (photo, photoIdx) => (
                                    <motion.div
                                      key={photoIdx}
                                      initial={{ scale: 0.5, opacity: 0 }}
                                      animate={{ scale: 1, opacity: 1 }}
                                      exit={{ scale: 0.5, opacity: 0 }}
                                      className="relative w-14 h-14 rounded overflow-hidden shadow-sm border border-gray-200 shrink-0"
                                    >
                                      <img
                                        src={photo.base64}
                                        alt={`Img ${photoIdx}`}
                                        className="object-cover w-full h-full"
                                      />
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleRemoveImage(idx, photoIdx)
                                        }
                                        className="absolute top-0 right-0 bg-red-600 text-white rounded-bl-lg text-[10px] w-4 h-4 flex items-center justify-center hover:bg-red-700"
                                        title="Remove Image"
                                      >
                                        <X className="w-3 h-3" />
                                      </button>
                                    </motion.div>
                                  )
                                )}
                              </div>
                            </AnimatePresence>

                            {(product.photos?.length || 0) < 4 && (
                              <button
                                type="button"
                                onClick={() => openImagePicker(idx)}
                                className="w-14 h-14 flex flex-col items-center justify-center rounded-lg border border-primary/30 bg-primary/5 text-primary hover:bg-primary/10 transition-colors shrink-0"
                                title="Add Images"
                              >
                                <ImagePlus className="w-5 h-5" />
                                <span className="text-[9px] font-medium mt-0.5">
                                  Add {4 - (product.photos?.length || 0)}
                                </span>
                              </button>
                            )}

                            {needsImages && (
                              <span className="text-red-600 font-medium text-xs ml-2">
                                Image Required
                              </span>
                            )}
                          </div>
                        </td>

                        {/* --- Name --- */}
                        <td className="px-4 py-2 font-semibold whitespace-nowrap text-gray-900">
                          {product.name}
                        </td>

                        {/* --- Category --- */}
                        <td className="px-4 py-2 whitespace-nowrap">
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                            {product.category || "-"}
                          </span>
                        </td>

                        {/* --- Origin --- */}
                        <td className="px-4 py-2 max-w-xs text-gray-600">
                          {originsArray.length === 0 && "-"}
                          {originsArray.length > 0 && (
                            <div className="flex flex-wrap items-center">
                              <span className="line-clamp-2">
                                {isExpanded
                                  ? originsArray.join(", ")
                                  : originsArray.slice(0, 3).join(", ")}
                              </span>
                              {originsArray.length > 3 && (
                                <button
                                  onClick={() => toggleOriginExpansion(idx)}
                                  className="ml-2 text-primary underline text-xs font-medium"
                                  type="button"
                                >
                                  {isExpanded
                                    ? "Less"
                                    : `+${originsArray.length - 3} more`}
                                </button>
                              )}
                            </div>
                          )}
                        </td>

                        {/* --- Availability (Example of non-editable field) --- */}
                        <td className="px-4 py-2 whitespace-nowrap">
                          <span
                            className={`text-xs font-semibold px-2 py-1 rounded-full ${
                              product.availability === "In Stock"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {product.availability || "N/A"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* --- Instructions Dialog --- */}
        <DialogComponent
          open={instructionOpen}
          setOpen={setInstructionOpen}
          heading="Bulk Upload Instructions & Schema"
          variant="info"
          okText="Got It, Start Uploading"
          okButtonAction={() => setInstructionOpen(false)}
          cancelText="Close"
          messageDescription={
            <div className="text-sm space-y-4 text-gray-700">
              <p className="font-semibold text-base">Key Requirements:</p>
              <ul className="list-disc ml-5 space-y-1">
                <li>
                  Accepted formats: <strong>.json</strong> or{" "}
                  <strong>.csv</strong>.
                </li>
                <li>
                  File size must be under <strong>{MAX_SIZE_MB}MB</strong>.
                </li>
                <li>
                  Each product row/object requires **name** and **category**.
                </li>
                <li>
                  Images must be uploaded *after* parsing the file (in the
                  preview table).
                </li>
              </ul>

              <p className="font-semibold text-base pt-2">
                Field Formatting Guide:
              </p>
              <ul className="list-disc ml-5 space-y-1">
                <li>
                  Fields like `origin`, `health_benefits`, `certifications`,
                  etc., should be provided as **comma-separated strings** (e.g.,
                  `India, USA`). The system will automatically convert them to
                  arrays.
                </li>
                <li>
                  Fields like `photos` cannot be included in the file and must
                  be uploaded manually in the table preview.
                </li>
              </ul>

              <p className="font-semibold text-base pt-2">
                Required Fields Example (in CSV/JSON):
              </p>
              <pre className="bg-gray-100 text-xs p-3 rounded-xl border border-gray-200 overflow-auto max-h-64">
                name,category,origin,quality,shelf_life,storage_conditions
                Organic Turmeric Powder,Spices,"India, Kerala",Grade A,12
                Months,"Cool, Dry Place" Urad Dal,Pulses,"Thanjavur",Grade A,12
                Months,"Airtight Container"
              </pre>
            </div>
          }
        ></DialogComponent>
      </div>
    </div>
  );
};

export default BulkUploadPage;

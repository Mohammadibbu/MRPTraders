import React, { useRef, useState } from "react";
import Papa from "papaparse";
import { showtoast } from "../../utils/Toast";
import DialogComponent from "../../components/UI/DialogModel";
import { Book, Upload } from "lucide-react";
import axios, { AddBulkProductApi } from "../../utils/AxiosInstance";

const MAX_SIZE_MB = 2;

type Photo = { base64: string; size: number };

type Product = {
  name?: string;
  alias?: string;
  category?: string;
  origin?: string[] | string;
  availability?: string;
  photos?: Photo[];
  [key: string]: any;
};

const BulkUploadPage: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [instructionOpen, setInstructionOpen] = useState(true);
  const [parsedProducts, setParsedProducts] = useState<Product[] | null>(null);
  const [adding, setAdding] = useState(false);

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

        const productsWithPhotos = parsed.map((p) => ({
          ...p,
          photos: [],
        }));

        showtoast(
          "Upload Success",
          `Parsed ${productsWithPhotos.length} product(s) successfully.`,
          "success"
        );

        setParsedProducts(productsWithPhotos);
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
    e: React.ChangeEvent<HTMLInputElement>,
    productIndex: number
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const currentPhotos = parsedProducts?.[productIndex].photos || [];
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
        // You can add image size validation here if needed
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

  const handleAddProducts = async () => {
    if (!parsedProducts || parsedProducts.length === 0) return;

    for (const p of parsedProducts) {
      if (!p.photos || p.photos.length < 1) {
        showtoast(
          "Validation Error",
          "Please upload at least 1 image per product.",
          "error"
        );
        return;
      }
      if (p.photos.length > 4) {
        showtoast(
          "Validation Error",
          "You can upload up to 4 images per product only.",
          "error"
        );
        return;
      }
    }

    setAdding(true);

    try {
      const payload = parsedProducts.map(({ photos, ...rest }) => ({
        ...rest,
        photos: photos || [],
      }));

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
        "There was an issue while uploading the data to server. Please try again later.",
        "error"
      );
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="mx-auto p-6 bg-white shadow rounded mt-8">
      <h1 className="text-3xl font-bold text-primary mb-6">
        Bulk Upload Products
      </h1>

      <p className="mb-4 text-gray-600">
        Upload your product list using a <strong>.json</strong> or{" "}
        <strong>.csv</strong> file. Max file size: {MAX_SIZE_MB}MB.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <button
          onClick={() => setInstructionOpen(true)}
          className="bg-secondary inline-flex font-semibold text-primary px-4 py-2 rounded hover:bg-secondary/80 transition"
        >
          <Book className="mr-2" /> View Upload Instructions
        </button>

        <button
          onClick={openFilePicker}
          className="bg-primary inline-flex font-semibold text-white px-4 py-2 rounded hover:bg-primary/90 transition"
        >
          <Upload className="mr-2" /> Select File to Upload
        </button>

        <input
          type="file"
          accept=".json,.csv"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {parsedProducts && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b border-gray-300 pb-2">
            Preview Products
          </h2>

          <button
            onClick={handleAddProducts}
            disabled={adding}
            className={`my-6 px-7 py-3 rounded-md font-semibold text-white shadow-md transition-colors duration-200 ${
              adding
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary hover:bg-primary/90"
            }`}
          >
            {adding ? "Adding Products..." : "Add Bulk Products"}
          </button>

          <div className="overflow-auto max-h-[40rem] border border-gray-300 rounded-lg shadow-sm bg-white">
            <table className="min-w-full text-left text-sm text-gray-700">
              <thead className="bg-gray-100 sticky z-10 top-0 shadow-md">
                <tr>
                  {["Images", "Name", "Category", "Origin"].map((header) => (
                    <th
                      key={header}
                      className="px-4 py-3 border-b border-gray-300 font-semibold tracking-wide"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {parsedProducts.map((product, idx) => {
                  const originsArray = Array.isArray(product.origin)
                    ? product.origin
                    : product.origin
                    ? [product.origin]
                    : [];

                  const isExpanded = expandedOrigins.has(idx);

                  return (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="border-b border-gray-200 px-4 py-2">
                        <div className="flex flex-col gap-2">
                          <div className="flex gap-2 flex-wrap">
                            {(product.photos || []).map((photo, photoIdx) => (
                              <div
                                key={photoIdx}
                                className="relative w-20 h-20"
                              >
                                <img
                                  src={photo.base64}
                                  alt={`Product ${idx} Img ${photoIdx}`}
                                  className="object-cover w-20 h-20 rounded border"
                                />
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleRemoveImage(idx, photoIdx)
                                  }
                                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-700"
                                  title="Remove Image"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>

                          {(product.photos?.length || 0) < 4 && (
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={(e) => handleProductImageUpload(e, idx)}
                              className=" w-full border px-4 py-2 rounded text-sm text-gray-700 file:mr-4 file:py-1 file:px-2
               file:rounded file:border-0 file:text-sm file:font-semibold
               file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                              title="Upload up to 4 images"
                            />
                          )}

                          <p className="text-xs text-gray-500">
                            {product.photos?.length || 0} / 4 images uploaded
                          </p>
                        </div>
                      </td>
                      <td className="border-b border-gray-200 px-4 py-2 whitespace-nowrap">
                        {product.name || "-"}
                      </td>
                      <td className="border-b border-gray-200 px-4 py-2 whitespace-nowrap">
                        {product.category || "-"}
                      </td>
                      <td className="border-b border-gray-200 px-4 py-2 whitespace-wrap max-w-xs">
                        {originsArray.length === 0 && "-"}
                        {originsArray.length > 0 && (
                          <>
                            {isExpanded
                              ? originsArray.join(", ")
                              : originsArray.slice(0, 3).join(", ")}
                            {originsArray.length > 3 && (
                              <button
                                onClick={() => toggleOriginExpansion(idx)}
                                className="ml-2 text-primary underline text-xs"
                                type="button"
                              >
                                {isExpanded
                                  ? "View Less"
                                  : `+${originsArray.length - 3} more`}
                              </button>
                            )}
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <DialogComponent
        open={instructionOpen}
        setOpen={setInstructionOpen}
        heading="Bulk Upload Instructions"
        messageDescription={
          <div className="text-sm space-y-3 text-gray-800">
            <ul className="list-disc ml-5 space-y-1">
              <li>
                Accepted formats: <strong>.json</strong> or{" "}
                <strong>.csv</strong>
              </li>
              <li>
                Max file size: <strong>{MAX_SIZE_MB}MB</strong>
              </li>
              <li>JSON must be an array of objects</li>
              <li>
                Fields like <code>origin</code>, <code>health_benefits</code>,{" "}
                <code>photos</code> must be arrays
              </li>
              <li>
                <strong>Example JSON structure:</strong>
              </li>
            </ul>
            <pre className="bg-gray-100 text-xs p-3 rounded border overflow-auto max-h-64">
              {`[
  {
    "name": "Masoor Dal",
    "alias": "Red Lentil",
    "origin": ["Erode", "Salem"],
    "health_benefits": ["Protein", "Fiber"],
    "category": "Pulses",
    "photos": ["https://example.com/photo1.jpg"],
    "availability": "In Stock",
    "quality": "Grade A",
    "season": "Year-round",
    "certifications": ["ISO", "FSSAI"],
    "description": "Nutritious lentil rich in folate and fiber.",
    "applications": ["Curries", "Soups"],
    "why_choose_us": ["Reliable", "Affordable"],
    "contact_info": "Contact our team for pricing.",
    "price": 140
  }
]`}
            </pre>
          </div>
        }
        okText="Got It"
        cancelText="Close"
        okButtonAction={() => setInstructionOpen(false)}
        cancelButtonColor="hidden"
      />
    </div>
  );
};

export default BulkUploadPage;

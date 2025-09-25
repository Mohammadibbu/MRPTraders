import React, { useRef, useState } from "react";
import Papa from "papaparse";
import { showtoast } from "../../utils/Toast";
import DialogComponent from "../../components/UI/DialogModel";
import { Book, Upload } from "lucide-react";
import axios, { AddBulkProductApi } from "../../utils/AxiosInstance";

const MAX_SIZE_MB = 2;

const BulkUploadPage: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [instructionOpen, setInstructionOpen] = useState(true);
  const [parsedProducts, setParsedProducts] = useState<any[] | null>(null);
  const [adding, setAdding] = useState(false);

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

        showtoast(
          "Upload Success",
          `Parsed ${parsed.length} product(s) successfully.`,
          "success"
        );

        setParsedProducts(parsed);
      } catch (err: any) {
        // console.error(err);
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

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleAddProducts = async () => {
    if (!parsedProducts || parsedProducts.length === 0) return;

    setAdding(true);

    try {
      const bulkupload = await axios.post(AddBulkProductApi, parsedProducts);
      console.log(bulkupload);

      showtoast(
        "Products Added",
        `${parsedProducts.length} products added successfully.`,
        "success"
      );
    } catch (e) {
      showtoast(
        "Bulk upload Failed",
        "There was an issue while uploading the data to server. Please try again later.",
        "error"
      );
    } finally {
      setParsedProducts(null);
      setAdding(false);
    }
  };

  return (
    <div className=" mx-auto p-6 bg-white shadow rounded mt-8">
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
          className="bg-primary inline-flex  font-semibold text-white px-4 py-2 rounded hover:bg-primary/90 transition"
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

      {/* Preview Section */}
      {parsedProducts && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b border-gray-300 pb-2">
            Preview Products
          </h2>{" "}
          <button
            onClick={handleAddProducts}
            disabled={adding}
            className={`my-6 px-7  py-3 rounded-md font-semibold text-white shadow-md transition-colors duration-200 ${
              adding
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary hover:bg-primary/90"
            }`}
          >
            {adding ? "Adding Products..." : "Add Bulk Products"}
          </button>
          <div className="overflow-auto max-h-[24rem] border border-gray-300 rounded-lg shadow-sm bg-white">
            <table className="min-w-full text-left text-sm text-gray-700">
              <thead className="bg-gray-100 sticky top-0 shadow-md">
                <tr>
                  {["Name", "Alias", "Category", "Origin", "Availability"].map(
                    (header) => (
                      <th
                        key={header}
                        className="px-4 py-3 border-b border-gray-300 font-semibold tracking-wide"
                      >
                        {header}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {parsedProducts.map((product, idx) => (
                  <tr
                    key={idx}
                    className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="border-b border-gray-200 px-4 py-2 whitespace-nowrap">
                      {product.name || "-"}
                    </td>
                    <td className="border-b border-gray-200 px-4 py-2 whitespace-nowrap">
                      {product.alias || "-"}
                    </td>
                    <td className="border-b border-gray-200 px-4 py-2 whitespace-nowrap">
                      {product.category || "-"}
                    </td>
                    <td className="border-b border-gray-200 px-4 py-2 whitespace-nowrap">
                      {Array.isArray(product.origin)
                        ? product.origin.join(", ")
                        : product.origin || "-"}
                    </td>
                    <td className="border-b border-gray-200 px-4 py-2 whitespace-nowrap">
                      {product.availability || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Upload Instructions Dialog */}
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

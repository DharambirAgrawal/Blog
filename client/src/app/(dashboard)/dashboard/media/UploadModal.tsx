"use client";
import { useState, useRef } from "react";
import { Upload, X } from "lucide-react";
import { handleUploadImage } from "./actions";

// Define types for props
interface UploadModalProps {
  setShowUploadModal: (show: boolean) => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ setShowUploadModal }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );

    setSelectedFiles(files); // Store the selected files
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles(files); // Store the selected files
    }
  };

  const handleUpload = async () => {
    // await handleFiles(selectedFiles);
    // Prepare FormData to send to server
    setIsUploading(true);
    const formData = new FormData();

    selectedFiles.forEach((file, index) => {
      formData.append(`file_${index}`, file); // Append each file to FormData
    });

    await handleUploadImage(formData);
    setIsUploading(false);
    // TODO: toast for successful message
    setShowUploadModal(false);
    // revalidatePath("/dashboard/media");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Upload Images</h3>
          <button
            onClick={() => setShowUploadModal(false)}
            className="p-1 hover:bg-gray-100 rounded"
            type="button"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {isUploading ? (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg mb-4">
            <p className="text-blue-700">Uploading images...</p>
          </div>
        ) : (
          <>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
                ${
                  isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
                }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                disabled={isUploading}
                onChange={handleFileSelect}
                className="hidden"
                name="files"
              />
              <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600">
                {isDragging
                  ? "Drop the files here..."
                  : "Drag & drop images here, or click to select files"}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Supports: JPG, PNG, GIF (Max size: 5MB)
              </p>
            </div>

            {selectedFiles.length > 0 && (
              <div className="mt-4">
                <h4 className="text-lg font-medium mb-2">Files to Upload:</h4>
                <ul className="list-disc pl-5 text-sm text-gray-700">
                  {selectedFiles.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )}

            {selectedFiles.length > 0 && !isUploading && (
              <button
                type="button"
                onClick={handleUpload}
                className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                disabled={isUploading}
              >
                {isUploading
                  ? `Uploading... ${selectedFiles.length} Image(s)`
                  : `Upload ${selectedFiles.length} Image(s)`}
                {/* Upload {selectedFiles.length} Image(s) */}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UploadModal;

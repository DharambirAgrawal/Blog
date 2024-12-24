// app/dashboard/media/page.tsx
"use client";

import { useState } from "react";
import { Upload, Search, Settings } from "lucide-react";
import UploadModal from "./UploadModal";
import ImageGrid from "./ImageGrid";
import ImageDetails from "./ImageDetails";
import { ImageType } from "./types";

const MediaDashboard = () => {
  const [images, setImages] = useState<ImageType[]>([
    {
      id: 1,
      url: "/api/placeholder/300/200",
      alt: "Sample Image 1",
      title: "Product Showcase",
      description: "Main product display image for homepage",
      tags: ["product", "homepage"],
      uploadedAt: "2024-12-20",
    },
  ]);

  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showUploadModal, setShowUploadModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">
              Media Library
            </h1>
            <button
              onClick={() => setShowUploadModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          {/* Search and Filters */}
          <div className="p-4 border-b border-gray-200 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search images..."
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <Settings className="w-4 h-4 mr-2" />
                  Filters
                </button>
              </div>
            </div>
          </div>

          {/* Image Grid */}
          <ImageGrid
            // images={images}
            searchTerm={searchTerm}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            setShowUploadModal={setShowUploadModal}
          />
        </main>

        {/* Image Details Sidebar */}
        <ImageDetails
          selectedImage={selectedImage}
          setImages={setImages}
          setSelectedImage={setSelectedImage}
        />
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <UploadModal setShowUploadModal={setShowUploadModal} />
      )}
    </div>
  );
};

export default MediaDashboard;

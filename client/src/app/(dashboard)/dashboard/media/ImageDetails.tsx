"use client";
import { useState, useEffect } from "react";
import { X, Tag, Type, FileText, Save, Trash2 } from "lucide-react";
import { ImageType } from "./types";

interface ImageDetailsProps {
  selectedImage: ImageType | null;
  setSelectedImage: (image: ImageType | null) => void;
  setImages: (
    images: ImageType[] | ((prev: ImageType[]) => ImageType[])
  ) => void;
}

interface FormState {
  title: string;
  alt: string;
  description: string;
  currentTag: string;
}

const ImageDetails: React.FC<ImageDetailsProps> = ({
  selectedImage,
  setSelectedImage,
  setImages,
}) => {
  // Local form state to handle changes
  const [form, setForm] = useState<FormState>({
    title: "",
    alt: "",
    description: "",
    currentTag: "",
  });
  const [tags, setTags] = useState<string[]>([]);

  // Update local form state when selected image changes
  useEffect(() => {
    if (selectedImage) {
      setForm({
        title: selectedImage.title,
        alt: selectedImage.alt,
        description: selectedImage.description,
        currentTag: "",
      });
      setTags(selectedImage.tags);
      console.log(selectedImage);
      console.log(form);
    }
  }, [selectedImage]);

  const handleSave = () => {
    if (!selectedImage) return;

    setImages((prev: ImageType[]) =>
      prev.map((img) =>
        img.id === selectedImage.id
          ? {
              ...img,
              title: form.title,
              alt: form.alt,
              description: form.description,
            }
          : img
      )
    );
  };

  const deleteImage = (id: number) => {
    setImages((prev: ImageType[]) => prev.filter((img) => img.id !== id));
    setSelectedImage(null);
  };

  const handleAddTag = (tag: string) => {
    if (!tag.trim() || !selectedImage) return;
    setTags((prevTags) => {
      const newTags = [...new Set([...prevTags, tag.trim()])];
      return newTags;
    });
    setImages((prev: ImageType[]) =>
      prev.map((img) =>
        img.id === selectedImage.id
          ? {
              ...img,
              tags: [...new Set([...img.tags, tag.trim()])],
            }
          : img
      )
    );
    setForm((prev) => ({ ...prev, currentTag: "" }));
  };

  const removeTag = (indexToRemove: number) => {
    if (!selectedImage) return;
    setTags((prevTags) =>
      prevTags.filter((_, index) => index !== indexToRemove)
    );
    setImages((prev: ImageType[]) =>
      prev.map((img) =>
        img.id === selectedImage.id
          ? {
              ...img,
              tags: img.tags.filter((_, index) => index !== indexToRemove),
            }
          : img
      )
    );
  };

  if (!selectedImage) return null;

  return (
    <div className="border-l border-gray-200 w-96 p-6 space-y-6 bg-white shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Image Details</h3>
        <button
          onClick={() => setSelectedImage(null)}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <div className="relative group">
        <img
          src={selectedImage.url}
          alt={selectedImage.alt}
          className="w-full h-48 object-cover rounded-lg shadow-md transition-transform group-hover:scale-[1.02]"
        />
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
            {selectedImage.uploadedAt}
          </span>
        </div>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <Type className="w-4 h-4 mr-2" />
            Title
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, title: e.target.value }))
            }
            // onBlur={handleSave}
            placeholder="Enter image title"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <FileText className="w-4 h-4 mr-2" />
            Alt Text
          </label>
          <input
            type="text"
            value={form.alt}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, alt: e.target.value }))
            }
            // onBlur={handleSave}
            placeholder="Describe the image for accessibility"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <FileText className="w-4 h-4 mr-2" />
            Description
          </label>
          <textarea
            value={form.description}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, description: e.target.value }))
            }
            // onBlur={handleSave}
            placeholder="Add a detailed description"
            rows={4}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <Tag className="w-4 h-4 mr-2" />
            Tags
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={form.currentTag}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, currentTag: e.target.value }))
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddTag(form.currentTag);
                }
              }}
              placeholder="Add tags and press Enter"
              className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            />
            <button
              onClick={() => handleAddTag(form.currentTag)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors"
            >
              Add
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors"
              >
                {tag}
                <button
                  onClick={() => removeTag(index)}
                  className="ml-2 text-blue-500 hover:text-blue-700 focus:outline-none"
                >
                  <X className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
        </div>
        <div className="pt-4 border-t border-gray-200 space-x-2">
          <button
            onClick={handleSave}
            className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </button>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <button
            onClick={() => deleteImage(selectedImage.id)}
            className="w-full flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageDetails;

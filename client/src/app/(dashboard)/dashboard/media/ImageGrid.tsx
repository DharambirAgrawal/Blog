import { Upload, Image as ImageIcon } from "lucide-react";
import { ImageType } from "./types";
import { getAllImages } from "./actions";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
interface ImageGridProps {
  setShowUploadModal: (show: boolean) => void;
  // images: ImageType[];
  searchTerm: string;
  selectedImage: ImageType | null;
  setSelectedImage: (image: ImageType | null) => void;
}

const ImageGrid: React.FC<ImageGridProps> = ({
  setShowUploadModal,
  searchTerm,
  selectedImage,
  setSelectedImage,
}) => {
  const [images, setImages] = useState<ImageType[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Track loading state
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    const getImages = async () => {
      setLoading(true);
      const { images } = await getAllImages();
      console.log(images);
      setImages(images);
      setLoading(false);
    };
    getImages();
  }, []);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {loading ? (
        <div className="text-center py-12">
          <div className="spinner"></div>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            Loading images...
          </h3>
        </div>
      ) : images?.length === 0 ? (
        <div className="text-center py-12">
          <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No images</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by uploading your first image.
          </p>
          <div className="mt-6">
            <button
              onClick={() => setShowUploadModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Image
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {images?.map((image) => (
            <div
              key={image.publicId}
              onClick={() => {
                router.push(pathname + "?" + createQueryString("sort", "asc"));
                // setSelectedImage(image);
              }}
              className={`relative group cursor-pointer rounded-lg overflow-hidden ${
                selectedImage?.id === image.id ? "ring-2 ring-blue-500" : ""
              }`}
            >
              <img
                src={image.url}
                alt={image.altText}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity" />
              <div className="absolute inset-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="h-full flex flex-col justify-between">
                  <h3 className="text-white font-medium">{image.title}</h3>
                  <div className="flex flex-wrap gap-1">
                    {image.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-block px-2 py-1 text-xs bg-white bg-opacity-90 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGrid;

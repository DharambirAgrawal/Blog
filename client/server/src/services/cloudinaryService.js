import { v2 as cloudinary } from "cloudinary";

export async function uploadImage(image, name) {
  // Configuration
  cloudinary.config({
    cloud_name: "dwhpe0oqy",
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY, // Click 'View API Keys' above to copy your API secret
  });

  // Upload an image
  const uploadResult = await cloudinary.uploader
    .upload(
      "https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg",
      {
        public_id: `pathgurus/${name}`,
      }
    )
    .catch((error) => {
      console.log(error);
    });

  console.log(uploadResult);

  // Optimize delivery by resizing and applying auto-format and auto-quality
  const optimizeUrl = cloudinary.url("shoes", {
    fetch_format: "auto",
    quality: "auto",
  });

  console.log(optimizeUrl);

  console.log(autoCropUrl);
}

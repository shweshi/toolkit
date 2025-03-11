import CircleCropper from "@/components/images/CircleCropper";

export const metadata = {
  title: "Circle Crop Image Tool – Easily Crop Images into a Perfect Circle",
  description: "Crop your images into a perfect circle effortlessly! Upload, paste, or drag & drop an image, adjust the crop, and download it in PNG, JPG, or WEBP format. Fast, simple, and privacy-friendly – your images never leave your browser! ",
  openGraph: {
    title: "Circle Crop Image Tool – Easily Crop Images into a Perfect Circle",
    description: "Crop your images into a perfect circle effortlessly! Upload, paste, or drag & drop an image, adjust the crop, and download it in PNG, JPG, or WEBP format. Fast, simple, and privacy-friendly – your images never leave your browser! ",
    url: "https://shashi.dev/toolkit/circle-image-cropper",
  },
};

export default function CircleCropperPage() {
  return <CircleCropper />;
}
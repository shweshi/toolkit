"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Cropper from "react-easy-crop";
import { saveAs } from "file-saver";
import { Upload, Download, Image as ImageIcon } from "lucide-react";
import { useDropzone } from "react-dropzone";
import Back from "../ui/Back";
import Header from "../ui/Header";
import Button from "../ui/Button";

export default function CircleCropper() {
  const [image, setImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [format, setFormat] = useState("png");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      const items = event.clipboardData?.items;
      if (items) {
        for (const item of items) {
          if (item.type.startsWith("image/")) {
            const file = item.getAsFile();
            if (file) {
              const reader = new FileReader();
              reader.onload = () => setImage(reader.result as string);
              reader.readAsDataURL(file);
            }
          }
        }
      }
    };

    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, []);

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => handleFileUpload(acceptedFiles[0]),
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp"] },
    multiple: false,
  });

  const handleCropComplete = useCallback(
    async (_: any, croppedAreaPixels: any) => {
      if (!image) return;
      const cropped = await getCroppedImage(image, croppedAreaPixels, format);
      setCroppedImage(cropped);
    },
    [image, format]
  );

  const getCroppedImage = async (
    imageSrc: string,
    cropPixels: any,
    outputFormat: string
  ) => {
    return new Promise<string>((resolve) => {
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
        const size = Math.min(cropPixels.width, cropPixels.height);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = size;
        canvas.height = size;

        if (ctx) {
          // Make the background transparent
          ctx.clearRect(0, 0, size, size);

          // Create a circular clipping path
          ctx.beginPath();
          ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
          ctx.closePath();
          ctx.clip();

          // Draw the cropped image inside the circle
          ctx.drawImage(
            img,
            cropPixels.x,
            cropPixels.y,
            cropPixels.width,
            cropPixels.height,
            0,
            0,
            size,
            size
          );

          // Convert to data URL with transparency
          resolve(canvas.toDataURL(`image/${outputFormat}`));
        }
      };
    });
  };

  const downloadCroppedImage = () => {
    if (croppedImage) {
      saveAs(croppedImage, `cropped-image.${format}`);
    }
  };

  return (
    <div className="min-h-screen bg-custom-dark text-white">
      <main className="p-6 max-w-6xl mx-auto">
        <Back />
        <Header
          title="Circle Crop Image Tool"
          description="Circle Crop your images effortlessly—upload, adjust, and download in PNG, JPG, or WEBP—all privately in your browser!"
          icon={ImageIcon}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div
            {...getRootProps()}
            className="border-2 border-dashed border-gray-600 p-6 rounded-lg mt-4 max-w-lg text-center cursor-pointer bg-card-dark h-40"
          >
            <input {...getInputProps()} />
            <Upload size={40} className="text-gray-400 mx-auto" />
            <p className="mt-2 text-gray-300">
              {isDragActive
                ? "Drop the image here..."
                : "Drop images here or click to select"}
            </p>
            <p className="text-sm text-gray-500">
              Supported formats: PNG, JPG, JPEG, WebP
            </p>
          </div>

          <div className="flex flex-col">
            {image && (
              <>
                <div className="relative w-full h-[400px] mt-4 rounded-lg border border-gray-600">
                  <Cropper
                    image={image}
                    crop={crop}
                    zoom={zoom}
                    aspect={1} // Ensures square cropping
                    cropShape="round" // 🔥 This makes the crop area circular
                    showGrid={false} // Hide default grid
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={handleCropComplete}
                  />
                </div>
                <div className="mt-4 w-full max-w-md">
                  <label>Zoom</label>
                  <input
                    type="range"
                    min="1"
                    max="3"
                    step="0.1"
                    value={zoom}
                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                    className="w-full mt-2 accent-blue-500"
                  />
                </div>
                <div className="mt-4 flex flex-row justify-between">
                  <div>
                    <select
                      value={format}
                      onChange={(e) => setFormat(e.target.value)}
                      className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-white focus:border-blue-400 outline-none appearance-none"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 1rem center",
                        backgroundSize: "1.5em",
                        paddingRight: "2.5rem",
                      }}
                    >
                      <option value="png" className="bg-[#0A0F1C] text-white">
                        PNG
                      </option>
                      <option value="jpg" className="bg-[#0A0F1C] text-white">
                        JPG
                      </option>
                      <option value="webp" className="bg-[#0A0F1C] text-white">
                        WEBP
                      </option>
                      <option value="jpeg" className="bg-[#0A0F1C] text-white">
                        JPEG
                      </option>
                    </select>
                  </div>
                  <div>
                    {croppedImage && (
                      <Button
                        onClick={downloadCroppedImage}
                        className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all flex items-center gap-2"
                      >
                        <Download /> Download
                      </Button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

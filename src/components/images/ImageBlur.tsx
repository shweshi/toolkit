"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, Download, Image as ImageIcon } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { saveAs } from "file-saver";
import Back from "../ui/Back";
import Header from "../ui/Header";
import Button from "../ui/Button";

export default function ImageBlur() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [format, setFormat] = useState("png");
  const [isPainting, setIsPainting] = useState(false);
  const [blurRadius, setBlurRadius] = useState(8);
  const [brushSize, setBrushSize] = useState(60);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result as string);
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => handleFileUpload(acceptedFiles[0]),
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp"] },
    multiple: false,
  });

  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      const items = event.clipboardData?.items;
      if (items) {
        for (const item of items) {
          if (item.type.startsWith("image/")) {
            const file = item.getAsFile();
            if (file) {
              const reader = new FileReader();
              reader.onload = () => setImageSrc(reader.result as string);
              reader.readAsDataURL(file);
            }
          }
        }
      }
    };

    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, []);

  const onImageLoad = () => {
    const img = imageRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas) return;

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    }
  };

  const startPainting = () => setIsPainting(true);
  const stopPainting = () => setIsPainting(false);

  const paintBlur = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isPainting || !canvasRef.current || !imageRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = imageRef.current;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (ctx && img) {
      const scaleX = img.naturalWidth / rect.width;
      const scaleY = img.naturalHeight / rect.height;

      const realX = x * scaleX;
      const realY = y * scaleY;

      const radius = brushSize / 2;

      // Create circular clipping path
      ctx.save();
      ctx.beginPath();
      ctx.arc(realX, realY, radius, 0, 2 * Math.PI);
      ctx.clip();

      // Apply blur filter and redraw image portion
      ctx.filter = `blur(${blurRadius}px)`;
      ctx.drawImage(img, 0, 0);
      ctx.restore();
    }
  };

  const downloadImage = () => {
    if (!canvasRef.current) return;
    const dataURL = canvasRef.current.toDataURL(`image/${format}`);
    saveAs(dataURL, `blurred-image.${format}`);
  };

  return (
    <div className="min-h-screen bg-custom-dark text-white">
      <main className="p-6 max-w-6xl mx-auto">
        <Back />
        <Header
          title="Image Blur Tool"
          description="Draw over image regions to apply natural blur—perfect for privacy and focus. All processing is local in your browser."
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

          {imageSrc && (
            <div className="relative mt-4 border border-gray-600 rounded-lg overflow-hidden max-w-full">
              <img
                ref={imageRef}
                src={imageSrc}
                onLoad={onImageLoad}
                alt="To blur"
                className="w-full object-contain pointer-events-none"
              />
              <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full"
                onMouseDown={startPainting}
                onMouseUp={stopPainting}
                onMouseLeave={stopPainting}
                onMouseMove={paintBlur}
              />
            </div>
          )}
        </div>

        {imageSrc && (
          <div className="mt-6 max-w-md space-y-4">
            <div>
              <label className="block mb-1">Blur Radius</label>
              <input
                type="range"
                min="2"
                max="20"
                value={blurRadius}
                onChange={(e) => setBlurRadius(Number(e.target.value))}
                className="w-full accent-blue-500"
              />
            </div>

            <div>
              <label className="block mb-1">Brush Size</label>
              <input
                type="range"
                min="20"
                max="200"
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                className="w-full accent-purple-500"
              />
            </div>

            <div className="flex justify-between items-center">
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-white focus:border-blue-400 outline-none appearance-none"
              >
                <option value="png">PNG</option>
                <option value="jpg">JPG</option>
                <option value="jpeg">JPEG</option>
                <option value="webp">WEBP</option>
              </select>

              <Button
                onClick={downloadImage}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all flex items-center gap-2"
              >
                <Download /> Download
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

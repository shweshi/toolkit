import ImageBlur from "@/components/images/ImageBlur";

export const metadata = {
  title: "Image Blur Tool – Easily Blur Selected Parts of an Image",
  description: "Blur selected parts of an image easily. Draw to blur, then download your result! Fast, simple, and privacy-friendly – your images never leave your browser! ",
  openGraph: {
    title: "Image Blur Tool – Easily Blur Selected Parts of an Image",
    description: "Blur selected parts of an image easily. Draw to blur, then download your result! Fast, simple, and privacy-friendly – your images never leave your browser! ",
    url: "https://shashi.dev/toolkit/image-blur",
  },
};

export default function ImageBlurPage() {
  return <ImageBlur />;
}
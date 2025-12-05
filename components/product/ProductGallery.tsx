"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
interface ProductGalleryProps {
  images: string[];
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    // کلاس sticky باعث میشه عکس موقع اسکرول متن، ثابت بمونه
    <div className="flex flex-col-reverse lg:flex-row gap-4 lg:sticky lg:top-24">
      
      {/* لیست تامنیل‌ها (در دسکتاپ سمت چپ، در موبایل پایین) */}
      <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 w-full lg:w-20 no-scrollbar">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className={cn(
              "relative flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 overflow-hidden rounded-xl border-2 transition-all duration-300",
              selectedImage === image 
                ? "border-black ring-2 ring-black/10 scale-95" 
                : "border-transparent hover:border-gray-200"
            )}
          >
            <Image
              src={image}
              alt={`View ${index + 1}`}
              fill
              className="object-cover object-center"
            />
          </button>
        ))}
      </div>

      {/* عکس بزرگ اصلی */}
      <div className="relative aspect-square w-full flex-1 overflow-hidden rounded-3xl bg-gray-50 border border-gray-100 shadow-sm group">
        <Image
          src={selectedImage}
          alt="Product main image"
          fill
          className="object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-110"
          priority
        />
        {/* بج یا لیبل روی عکس */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold shadow-sm">
            جدید
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;
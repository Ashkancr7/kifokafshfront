"use client";

import Image from "next/image";
import Link from "next/link";
import { MouseEventHandler } from "react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { ShoppingCart, Expand } from "lucide-react";

interface ProductCardProps {
  data: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const imageSrc = data.image_url ? data.image_url : "/images/placeholder.jpg";

  // هندل کردن کلیک روی دکمه سبد خرید (که وارد صفحه محصول نشه)
  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault(); // جلوگیری از لینک
    e.stopPropagation(); // جلوگیری از بابلینگ
    console.log("Add to cart:", data.title);
    // اینجا فانکشن اد کردن به سبد خریدت رو صدا بزن
  };

  return (
    <Link 
      href={`/product/${data.id}`} 
      className="group block space-y-3 cursor-pointer" // کل کارت لینک باشه
    >
      {/* --- بخش تصویر --- */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-50 border border-gray-100">
        <Image
          src={imageSrc}
          alt={data.title}
          fill
          className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* بج (Badge) - مثلا برای تخفیف یا جدید بودن */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
             {/* اگر خواستی شرط بذار: data.isNew && ... */}
            <span className="bg-black/80 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm">
                جدید
            </span>
        </div>

        {/* دکمه افزودن سریع (شناور) */}
        <button 
          onClick={onAddToCart}
          className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-lg translate-y-12 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-black hover:text-white z-10"
          aria-label="Add to cart"
        >
          <ShoppingCart size={18} />
        </button>
      </div>

      {/* --- بخش اطلاعات --- */}
      <div className="space-y-1 px-1">
        {/* عنوان و قیمت در یک ردیف برای فشردگی */}
        <div className="flex justify-between items-start gap-2">
            <h3 className="text-sm font-medium text-gray-900 truncate flex-1" title={data.title}>
              {data.title}
            </h3>
            <div className="font-bold text-sm text-gray-900 whitespace-nowrap">
              {formatPrice(data.price)} <span className="text-[10px] font-normal text-gray-500">تومان</span>
            </div>
        </div>
        
        {/* دسته‌بندی با رنگ ملایم */}
        <p className="text-xs text-gray-500 truncate">{data.category}</p>
        
        {/* رنگ‌های موجود (اختیاری - برای زیبایی بیشتر) */}
        <div className="flex gap-1 pt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             <div className="w-3 h-3 rounded-full bg-black border border-gray-200"></div>
             <div className="w-3 h-3 rounded-full bg-stone-400 border border-gray-200"></div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
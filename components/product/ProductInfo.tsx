"use client";

import { useState } from "react";
import { ShoppingCart, Heart, Share2, Ruler, Truck, ShieldCheck, ChevronDown, Check } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/types";

// هوک ماک برای سبد خرید
const useCart = () => ({
  addItem: (data: any) => console.log("Added:", data),
});

const colors = [
  { name: "مشکی", class: "bg-gray-900", selectedClass: "ring-gray-900" },
  { name: "سفید", class: "bg-white border border-gray-200", selectedClass: "ring-gray-400" },
  { name: "عسلی", class: "bg-amber-700", selectedClass: "ring-amber-700" },
];
const sizes = ["38", "39", "40", "41", "42", "43"];

interface ProductInfoProps {
  product: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[2]);
  const [descriptionOpen, setDescriptionOpen] = useState(true); // وضعیت اکاردئون
  const cart = useCart();

  const onAddToCart = () => {
    cart.addItem({ ...product, selectedColor: selectedColor.name, selectedSize });
  };

  return (
    <div className="mt-10 lg:mt-0 flex flex-col gap-y-6">
      
      {/* هدر و قیمت */}
      <div className="space-y-2 border-b border-gray-100 pb-6">
        <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-gray-900">
          {product.title}
        </h1>
        <div className="flex items-end justify-between">
          <p className="text-2xl font-bold text-gray-900 flex items-baseline gap-1">
            {formatPrice(product.price)}
            <span className="text-sm font-medium text-gray-500">تومان</span>
          </p>
          <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs font-bold">
            <Check size={14} /> موجود در انبار
          </div>
        </div>
      </div>

      {/* انتخاب رنگ */}
      <div>
        <span className="text-sm font-medium text-gray-900">رنگ: <span className="text-gray-500">{selectedColor.name}</span></span>
        <div className="mt-3 flex gap-3">
          {colors.map((color) => (
            <button
              key={color.name}
              onClick={() => setSelectedColor(color)}
              className={`h-9 w-9 rounded-full flex items-center justify-center transition-all ${
                selectedColor.name === color.name ? `ring-2 ring-offset-2 ${color.selectedClass}` : "hover:scale-110"
              }`}
            >
              <span className={`h-7 w-7 rounded-full ${color.class} shadow-sm border border-black/5`} />
            </button>
          ))}
        </div>
      </div>

      {/* انتخاب سایز */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium text-gray-900">سایز: <span className="text-gray-500">{selectedSize}</span></span>
          <button className="text-xs text-gray-500 underline decoration-dotted flex items-center gap-1 hover:text-black">
            <Ruler size={14} /> راهنمای سایز
          </button>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`py-3 text-sm font-medium rounded-xl border transition-all ${
                selectedSize === size
                  ? "bg-black text-white border-black shadow-lg shadow-black/20"
                  : "bg-white text-gray-900 border-gray-200 hover:border-black"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* دکمه‌های خرید (دسکتاپ) */}
      <div className="hidden lg:flex gap-4 mt-4">
        <button
          onClick={onAddToCart}
          className="flex-1 bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition-all active:scale-95 shadow-xl shadow-black/10 flex items-center justify-center gap-2"
        >
          <ShoppingCart size={20} />
          افزودن به سبد خرید
        </button>
        <button className="p-4 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors">
          <Heart size={20} />
        </button>
      </div>

      {/* توضیحات اکاردئونی */}
      <div className="border-t border-gray-100 pt-6 mt-4 space-y-4">
        {/* آیتم 1: توضیحات */}
        <div className="border border-gray-200 rounded-2xl p-4 cursor-pointer hover:border-gray-300 transition-colors" onClick={() => setDescriptionOpen(!descriptionOpen)}>
            <div className="flex justify-between items-center">
                <span className="font-semibold text-sm">توضیحات محصول</span>
                <ChevronDown size={16} className={`transition-transform ${descriptionOpen ? "rotate-180" : ""}`} />
            </div>
            {descriptionOpen && (
                <p className="mt-3 text-sm text-gray-500 leading-7 text-justify animate-in fade-in slide-in-from-top-2 duration-300">
                    این کفش با طراحی ارگونومیک و کفی طبی، مناسب پیاده‌روی‌های طولانی است. رویه آن از چرم مصنوعی درجه یک تهیه شده که مقاومت بالایی در برابر سایش دارد. زیره تزریق مستقیم باعث می‌شود کفش در برابر جداشدگی مقاوم باشد.
                </p>
            )}
        </div>
        
        {/* آیتم 2: ارسال (استاتیک برای زیبایی) */}
        <div className="grid grid-cols-2 gap-4 text-xs text-gray-600 mt-4">
            <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl">
                <Truck size={18} className="text-black" />
                <span>ارسال رایگان بالای 2 میلیون</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl">
                <ShieldCheck size={18} className="text-black" />
                <span>7 روز ضمانت بازگشت</span>
            </div>
        </div>
      </div>

      {/* Mobile Sticky Bar (فقط در موبایل نمایش داده می‌شود) */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 lg:hidden z-50 safe-area-bottom shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="flex gap-3">
            <div className="flex flex-col justify-center">
                 <span className="text-xs text-gray-500">قیمت نهایی</span>
                 <span className="font-bold">{formatPrice(product.price)}</span>
            </div>
            <button 
                onClick={onAddToCart}
                className="flex-1 bg-black text-white rounded-xl font-bold py-3 active:scale-95 transition-transform"
            >
                افزودن به سبد
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
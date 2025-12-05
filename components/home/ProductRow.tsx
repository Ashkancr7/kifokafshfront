"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import Container from "@/components/ui/Container";
import { Product } from "@/types";

interface ProductRowProps {
  title: string;
  products: Product[];
  link: string; // لینک دکمه "مشاهده همه"
}

const ProductRow: React.FC<ProductRowProps> = ({ title, products, link }) => {
  // اگر محصولی توی این دسته نبود، کلاً این ردیف رو نشون نده
  if (products.length === 0) return null;

  return (
    <section className="py-8 border-b border-gray-50 last:border-0">
      <Container>
        {/* هدر بخش: عنوان + دکمه مشاهده همه */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 border-r-4 border-black pr-3">
            {title}
          </h2>
          <Link
            href={link}
            className="group flex items-center text-sm font-medium text-gray-500 hover:text-black transition"
          >
            مشاهده همه
            <ArrowLeft size={16} className="mr-1 transition-transform group-hover:-translate-x-1" />
          </Link>
        </div>

        {/* لیست همه محصولات با اسکرول افقی */}
        <div className="flex overflow-x-auto gap-6 pb-4 px-4 w-full">
          {products.map((product) => (
            // یک دیو دور کارت می‌ذاریم تا عرض ثابت داشته باشه و جمع نشه
            <div key={product.id} className="flex-shrink-0 w-72 sm:w-80">
              <ProductCard data={product} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ProductRow;
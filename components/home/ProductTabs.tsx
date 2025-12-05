"use client";

import { useState } from "react";
import ProductCard from "@/components/products/ProductCard";
import { Product } from "@/types"; // همون تایپی که قبلا ساختی
import Container from "@/components/ui/Container";

// اینجا پراپس رو تعریف می‌کنیم که بتونیم دیتاهای مختلف رو از صفحه اصلی پاس بدیم
interface ProductTabsProps {
    newArrivals: Product[];
    bestSellers: Product[];
    onSale: Product[];
}

const ProductTabs: React.FC<ProductTabsProps> = ({ newArrivals, bestSellers, onSale }) => {
    const [activeTab, setActiveTab] = useState<"new" | "best" | "sale">("new");

    return (
        <section className="py-16">
            <Container>
                {/* Tabs Header */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
                    <h2 className="text-3xl font-black text-gray-900">منتخب محصولات</h2>

                    <div className="flex p-1 bg-gray-100 rounded-full">
                        <button
                            onClick={() => setActiveTab("new")}
                            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                                activeTab === "new" ? "bg-white text-black shadow-sm" : "text-gray-500 hover:text-gray-900"
                            }`}
                        >
                            جدیدترین‌ها
                        </button>
                        <button
                            onClick={() => setActiveTab("best")}
                            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                                activeTab === "best" ? "bg-white text-black shadow-sm" : "text-gray-500 hover:text-gray-900"
                            }`}
                        >
                            پرفروش‌ترین
                        </button>
                        <button
                            onClick={() => setActiveTab("sale")}
                            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                                activeTab === "sale" ? "bg-white text-red-600 shadow-sm" : "text-gray-500 hover:text-red-500"
                            }`}
                        >
                            تخفیف‌دار
                        </button>
                    </div>
                </div>

                {/* Products Grid based on Active Tab */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 animate-in fade-in duration-500">
                    {activeTab === "new" && newArrivals.map((product) => (
                        <ProductCard key={product.id} data={product} />
                    ))}
                    {activeTab === "best" && bestSellers.map((product) => (
                        <ProductCard key={product.id} data={product} />
                    ))}
                    {activeTab === "sale" && onSale.map((product) => (
                        <ProductCard key={product.id} data={product} />
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default ProductTabs;